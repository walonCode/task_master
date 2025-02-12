import { ConnectDB } from "@/libs/configs/mongoDB";
import Task from "@/libs/models/taskModel";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    //connecting to the database
    await ConnectDB();

    //getting the taskId from the url
    const { taskId } = params;

    //getting the task using this params and checking weather it exist or not
    const task = await Task.findOne({ _id: taskId });
    if (!task) {
      return NextResponse.json({ message: "Invalid Id" }, { status: 400 });
    };

    // sending the task to the user
    return NextResponse.json(
      {
        message: "Task found",
        success: true,
        task,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    //connecting to the database
    ConnectDB();

    //getting params from the url
    const { taskId } = params;

    //getting the tasks and deleting it from the database
    const task = await Task.findByIdAndDelete({ _id: taskId });
    if (!task) {
      return NextResponse.json({ message: "Invalid taskId" }, { status: 401 });
    }

    //sending response to the user
    return NextResponse.json(
      { message: "Task deleted successfully" },
      { status: 202 }
    );
  } catch (error: unknown) {
    return NextResponse.json(
      { message: "Server error", error },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { taskId: string } }
) {
  try {
    await ConnectDB();

    const taskId = params.taskId;
    const task = await Task.findByIdAndUpdate(
      taskId,
      { status: "completed" },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating task", error },
      { status: 500 }
    );
  }
}
