import connectDB from "@/lib/database";
import Todo from "@/models/Todo";
import { NextRequest, NextResponse } from "next/server";

// Create Todo
export async function POST(request: NextRequest) {
  await connectDB();

  const { title, description } = await request.json();

  const todo = await Todo.create({ title, description });

  return NextResponse.json({
    message: "Todo created successfully",
    todo,
  });
}

// Read all Todos
export async function GET() {
    await connectDB();
    const todos = await Todo.find();
    return NextResponse.json({
        todos: todos
    });
}
// Update Todo
export async function PUT(request: NextRequest) {
    const { id, title, description } = await request.json();
    await connectDB();
    const todo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
    return NextResponse.json({
        message: "Todo updated successfully",
        todo
    });
}


// Delete Todo
export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id");
    await connectDB();
    await Todo.findByIdAndDelete(id);
    return NextResponse.json({
        message: "Todo deleted successfully"
    });
}