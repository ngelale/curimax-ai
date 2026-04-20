import { NextResponse } from "next/server";
import { newProjectSchema } from "../../../(dashboard)/projects/new/types";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = newProjectSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input", issues: validation.error.issues }, { status: 400 });
    }

    // Simulate DB operation
    await new Promise(resolve => setTimeout(resolve, 1000));

    const newProjectId = `proj_${Date.now()}`;

    return NextResponse.json({ success: true, projectId: newProjectId });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
