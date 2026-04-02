import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const expected = process.env.COURSE_ACCESS_TOKEN;

  if (!expected || !token || token !== expected) {
    return NextResponse.redirect(new URL("/projects/deprogramming?access=invalid", request.url));
  }

  const response = NextResponse.redirect(new URL("/projects/deprogramming/full", request.url));
  response.cookies.set({
    name: "course_access",
    value: "1",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
