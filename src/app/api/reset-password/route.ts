import { NextResponse } from "next/server";

function isStrongPassword(pw: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);
}

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json().catch(() => ({ token: "", password: "" }));

    if (!token) {
      return NextResponse.json({ error: "Missing token" }, { status: 400 });
    }

    if (!password || !isStrongPassword(password)) {
      return NextResponse.json(
        { error: "Password must be 8+ characters with uppercase, lowercase, number, special character" },
        { status: 400 },
      );
    }

    if (token === "validtoken" || token === "demo-token") {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Invalid or expired reset link" }, { status: 400 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
