import { NextResponse } from "next/server";

const DEFAULT_MAILERLITE_BASE = "https://connect.mailerlite.com/api/";
const DEFAULT_LISTMONK_BASE = "http://localhost:9000/";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    const provider = (process.env.NEWSLETTER_PROVIDER || "listmonk").toLowerCase();

    if (provider === "mailerlite") {
      const apiBase = process.env.EMAIL_API_BASE || DEFAULT_MAILERLITE_BASE;
      const groups = (process.env.EMAIL_LIST_UUIDS || "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

      if (!process.env.EMAIL_API_KEY) {
        return NextResponse.json({ error: "EMAIL_API_KEY is not set" }, { status: 500 });
      }

      const res = await fetch(`${apiBase}subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.EMAIL_API_KEY}`,
        },
        body: JSON.stringify({
          email,
          fields: {
            name: email.split("@")[0],
          },
          ...(groups.length ? { groups } : {}),
        }),
      });

      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return NextResponse.json({ ok: "ok" }, { status: 200 });
    }

    // Default: Listmonk public subscription endpoint
    const listUuids = (process.env.EMAIL_LIST_UUIDS || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    if (!listUuids.length) {
      return NextResponse.json({ error: "EMAIL_LIST_UUIDS is not set" }, { status: 500 });
    }

    const apiBase = process.env.EMAIL_API_BASE || DEFAULT_LISTMONK_BASE;
    const auth = process.env.EMAIL_API_KEY || "";
    const authHeader = auth.startsWith("token ") || auth.startsWith("Basic ") ? auth : auth ? `Bearer ${auth}` : "";

    const res = await fetch(`${apiBase}api/public/subscription`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify({
        email,
        name: email.split("@")[0],
        list_uuids: listUuids,
      }),
    });

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return NextResponse.json({ ok: "ok" }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message || error.toString() }, { status: 500 });
  }
}
