import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/mongodb"; // adjust path if needed

export async function GET() {
  try {
    await connectMongoDB();
    return NextResponse.json({ message: "MongoDB Connected!" });
  } catch (error) {
    return NextResponse.json({ message: error instanceof Error ? error: "Connection failed" }, { status: 500 });
  }
}