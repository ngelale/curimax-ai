import { NextResponse } from "next/server";
import { mockProjects } from "../../(dashboard)/projects/mock-data";

export async function GET() {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return NextResponse.json(mockProjects);
}
