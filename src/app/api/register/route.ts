import { NextResponse } from "next/server";

const ALLOWED_TYPES = new Set([
  "university",
  "corporate",
  "government",
  "consultant",
  "edtech",
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isStrongPassword(pw: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(pw);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({} as any));
    const {
      email,
      password,
      name,
      organizationName,
      organizationType,
      role,
      terms,
    } = body || {};

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email" },
        { status: 400 },
      );
    }

    // Simulate existing email
    if (String(email).toLowerCase() === "used@example.com") {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 },
      );
    }

    if (!password || !isStrongPassword(password)) {
      return NextResponse.json(
        {
          error:
            "Password must be 8+ characters with uppercase, lowercase, number, special character",
        },
        { status: 400 },
      );
    }

    if (!name || typeof name !== "string" || name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: "Name must be 2-100 characters" },
        { status: 400 },
      );
    }

    if (!organizationName || typeof organizationName !== "string") {
      return NextResponse.json(
        { error: "Organization name is required" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(String(organizationType))) {
      return NextResponse.json(
        { error: "Organization type is required" },
        { status: 400 },
      );
    }

    if (!terms) {
      return NextResponse.json(
        { error: "You must accept the Terms & Privacy" },
        { status: 400 },
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
