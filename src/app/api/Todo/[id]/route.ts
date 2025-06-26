import connectDB from "@/lib/database";
import ToDo from "@/models/Todo";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Use the correct context type
export async function GET(
  req: NextRequest,
  { params }: { params: any }
) {
  const { id } = params;
  console.log("Here we get the ID:", id);

  await connectDB();
  const todo = await ToDo.findById(id);

  if (!todo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 });
  }

  return NextResponse.json({ todo });
}
