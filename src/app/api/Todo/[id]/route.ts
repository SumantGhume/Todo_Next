import connectDB from "@/lib/database";
import ToDo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  console.log("Here we get the ID:", id);

  await connectDB();
  const todo = await ToDo.findById(id);

  return NextResponse.json({ todo });
}
