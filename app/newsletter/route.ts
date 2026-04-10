import { NextResponse } from "next/server";

const DEFAULT_MAILERLITE_BASE = "https://connect.mailerlite.com/api/";
const DEFAULT_LISTMONK_BASE = "http://localhost:9000/";

type SubscribePayload = {
  email?: string;
  provider?: "mailerlite" | "listmonk";
  group?: string;
  groups?: string[];
  includeDefaultGroups?: boolean;
  source?: string;
};

function splitCsv(value?: string | null) {
  return (value || "")
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}

function parseGroupMap(value?: string | null) {
  return splitCsv(value).reduce(
    (acc, entry) => {
      const [alias, ...rest] = entry.split(":");
      const target = rest.join(":").trim();

      if (!alias?.trim() || !target) {
        return acc;
      }

      acc[alias.trim().toLowerCase()] = target;
      return acc;
    },
    {} as Record<string, string>
  );
}

function getProviderEnv(provider: "mailerlite" | "listmonk") {
  if (provider === "mailerlite") {
    return {
      apiBase: process.env.MAILERLITE_API_BASE || process.env.EMAIL_API_BASE || DEFAULT_MAILERLITE_BASE,
      apiKey: process.env.MAILERLITE_API_KEY || process.env.EMAIL_API_KEY || "",
      listIds: process.env.MAILERLITE_GROUP_IDS || process.env.EMAIL_LIST_UUIDS,
      groupMap: process.env.MAILERLITE_GROUP_MAP || process.env.EMAIL_GROUP_MAP,
    };
  }

  return {
    apiBase: process.env.LISTMONK_API_BASE || process.env.EMAIL_API_BASE || DEFAULT_LISTMONK_BASE,
    apiKey: process.env.LISTMONK_API_KEY || process.env.EMAIL_API_KEY || "",
    listIds: process.env.LISTMONK_LIST_UUIDS || process.env.EMAIL_LIST_UUIDS,
    groupMap: process.env.LISTMONK_GROUP_MAP || process.env.EMAIL_GROUP_MAP,
  };
}

function resolveListIds(provider: "mailerlite" | "listmonk", requestedGroups: string[], includeDefaultGroups = true) {
  const env = getProviderEnv(provider);
  const configuredDefaults = includeDefaultGroups ? splitCsv(env.listIds) : [];
  const groupMap = parseGroupMap(env.groupMap);
  const mappedGroups = requestedGroups.flatMap((group) => splitCsv(groupMap[group.toLowerCase()] || group));

  return [...new Set([...configuredDefaults, ...mappedGroups])];
}

async function getErrorMessage(response: Response) {
  const fallback = response.statusText || `Request failed with status ${response.status}`;

  try {
    const data = await response.json();

    if (typeof data?.message === "string" && data.message.trim()) {
      return data.message;
    }

    if (typeof data?.error === "string" && data.error.trim()) {
      return data.error;
    }
  } catch {
    // Ignore JSON parsing failures and fall back to plain text.
  }

  try {
    const text = await response.text();
    return text.trim() || fallback;
  } catch {
    return fallback;
  }
}

export async function POST(request: Request) {
  const {
    email,
    provider: requestedProvider,
    group,
    groups = [],
    includeDefaultGroups = true,
  } = (await request.json()) as SubscribePayload;

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    const provider = (requestedProvider || process.env.NEWSLETTER_PROVIDER || "listmonk").toLowerCase() as
      | "mailerlite"
      | "listmonk";
    const requestedGroups = [group, ...groups].filter((value): value is string => Boolean(value?.trim()));
    const env = getProviderEnv(provider);
    const listIds = resolveListIds(provider, requestedGroups, includeDefaultGroups);

    if (provider === "mailerlite") {
      if (!env.apiKey) {
        return NextResponse.json({ error: "EMAIL_API_KEY is not set" }, { status: 500 });
      }

      const res = await fetch(`${env.apiBase}subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${env.apiKey}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            name: email.split("@")[0],
          },
          ...(listIds.length ? { groups: listIds } : {}),
        }),
      });

      if (!res.ok) {
        throw new Error(await getErrorMessage(res));
      }

      return NextResponse.json({ ok: "ok" }, { status: 200 });
    }

    // Default: Listmonk public subscription endpoint
    if (!listIds.length) {
      return NextResponse.json({ error: "EMAIL_LIST_UUIDS is not set" }, { status: 500 });
    }

    const auth = env.apiKey || "";
    const authHeader = auth.startsWith("token ") || auth.startsWith("Basic ") ? auth : auth ? `Bearer ${auth}` : "";

    const res = await fetch(`${env.apiBase}api/public/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({
        email,
        name: email.split("@")[0],
        list_uuids: listIds,
      }),
    });

    if (!res.ok) {
      throw new Error(await getErrorMessage(res));
    }
    return NextResponse.json({ ok: "ok" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || error.toString() }, { status: 500 });
  }
}
