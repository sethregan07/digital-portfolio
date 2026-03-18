import { NextResponse } from "next/server";

const API_URL = `${process.env.EMAIL_API_BASE}api/public/subscription`;

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }
  try {
    const listUuids = (process.env.EMAIL_LIST_UUIDS || "")
      .split(",")
      .map((v) => v.trim())
      .filter(Boolean);

    if (!listUuids.length) {
      return NextResponse.json({ error: "EMAIL_LIST_UUIDS is not set" }, { status: 500 });
    }

    const auth = process.env.EMAIL_API_KEY || "";
    const authHeader = auth.startsWith("token ") || auth.startsWith("Basic ") ? auth : auth ? `Bearer ${auth}` : "";

    const res = await fetch(API_URL, {
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
