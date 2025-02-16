import Project from "@/libs/models/taskModel";
import { NextResponse, NextRequest } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";

export async function GET(req: NextRequest, { params }: { params: { userId: string } }) {
  try {
    await ConnectDB();

    const { userId } = params;
    const totalProjects = await Project.countDocuments({ userId });
    const completedProjects = await Project.countDocuments({ userId, status: "completed" });
    const activeProjects = await Project.countDocuments({ userId, status: { $ne: "completed" } });

    return NextResponse.json(
      { totalProjects, completedProjects, activeProjects },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Server Error"}, { status: 500 });
  }
}
