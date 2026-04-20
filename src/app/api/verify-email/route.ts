import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "Missing token" },
      { status: 400 },
    );
  }

  if (token === "validtoken" || token === "demo-token") {
    return NextResponse.json({ success: true });
  }

  return NextResponse.json(
    { error: "Invalid or expired verification link" },
    { status: 400 },
  );
}
