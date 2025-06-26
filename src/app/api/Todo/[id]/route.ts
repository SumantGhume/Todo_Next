import connectDB from "@/lib/database";
import Todo from "@/models/Todo";
import { NextResponse } from "next/server";

export async function GET({ params }:any) {
    const {id} = await params
    console.log(id)
    await connectDB()
    const todo = await Todo.findById(id)
    console.log(todo)
    return NextResponse.json({
        todo: todo
    })
}