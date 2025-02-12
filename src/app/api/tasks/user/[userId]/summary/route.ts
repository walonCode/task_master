import Task from "@/libs/models/taskModel";
import { NextResponse, NextRequest } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await ConnectDB();

    const { userId } = params;
    const totalTasks = await Task.countDocuments({ userId });
    const completedTasks = await Task.countDocuments({ userId, status: "completed" });
    const pendingTasks = await Task.countDocuments({ userId, status: { $ne: "completed" } });

    return NextResponse.json(
      { totalTasks, completedTasks, pendingTasks },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Server Error", error }, { status: 500 });
  }
}
