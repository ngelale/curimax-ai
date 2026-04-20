import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { approvalRequestId, responseMessage } = body;

    if (!approvalRequestId) {
      return NextResponse.json(
        { success: false, message: "Approval request ID is required" },
        { status: 400 }
      );
    }

    if (!responseMessage || responseMessage.trim() === "") {
      return NextResponse.json(
        { success: false, message: "Rejection reason is required" },
        { status: 400 }
      );
    }

    // In a real app:
    // 1. Fetch approval request from database
    // 2. Verify current user is the approver
    // 3. Update approval request status to "rejected"
    // 4. Send email notification to requester with reason
    // 5. Record activity log entry
    // 6. Allow requester to resubmit with changes

    return NextResponse.json(
      {
        success: true,
        message: "Approval request rejected successfully",
        data: {
          approvalRequestId,
          status: "rejected",
          rejectedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error rejecting request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
