import { NextRequest, NextResponse } from "next/server";

// Mock database of invitation tokens
const invitationTokens: Record<string, { accepted: boolean; declined: boolean }> = {};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token is required" },
        { status: 400 }
      );
    }

    // Initialize token tracking if needed
    if (!invitationTokens[token]) {
      invitationTokens[token] = { accepted: false, declined: false };
    }

    // Check if already accepted or declined
    if (invitationTokens[token].accepted) {
      return NextResponse.json(
        { success: false, message: "This invitation has already been accepted" },
        { status: 400 }
      );
    }

    if (invitationTokens[token].declined) {
      return NextResponse.json(
        { success: false, message: "This invitation has already been declined" },
        { status: 400 }
      );
    }

    // Mark as declined
    invitationTokens[token].declined = true;

    // In real app:
    // 1. Query database to get invitation details
    // 2. Update invitation status to declined
    // 3. Send email notification to project owner about the decline
    // 4. Record activity log entry
    // 5. Optionally send notification to invitee confirming decline

    return NextResponse.json(
      {
        success: true,
        message: "Invitation declined successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error declining invitation:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
