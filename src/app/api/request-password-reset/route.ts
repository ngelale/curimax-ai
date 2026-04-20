import { NextResponse } from "next/server";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json().catch(() => ({ email: "" }));
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 },
      );
    }

    // Mock: pretend we sent a reset email (do not leak user existence)
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
