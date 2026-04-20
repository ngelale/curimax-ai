import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { approverId, projectId, message, sections, reportType } = body;

    if (!approverId || !projectId) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!sections || sections.filter((s: any) => s.isIncluded).length === 0) {
      return NextResponse.json(
        { success: false, message: "At least one section must be selected" },
        { status: 400 }
      );
    }

    // In a real app:
    // 1. Validate approver has approval permissions
    // 2. Create approval request record in database
    // 3. Send email notification to approver
    // 4. Record activity log entry
    // 5. Return approval request ID

    const approvalRequestId = `approval-${Date.now()}`;

    return NextResponse.json(
      {
        success: true,
        message: "Approval request sent successfully",
        data: {
          approvalRequestId,
          projectId,
          approverId,
          status: "pending",
          createdAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating approval request:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
