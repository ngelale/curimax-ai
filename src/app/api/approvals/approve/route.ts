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
        { success: false, message: "Response message is required" },
        { status: 400 }
      );
    }

    // In a real app:
    // 1. Fetch approval request from database
    // 2. Verify current user is the approver
    // 3. Update approval request status to "approved"
    // 4. Send email notification to requester
    // 5. Trigger report generation (if applicable)
    // 6. Record activity log entry

    return NextResponse.json(
      {
        success: true,
        message: "Approval request approved successfully",
        data: {
          approvalRequestId,
          status: "approved",
          approvedAt: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error approving request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
