import { ConnectDB } from "@/libs/configs/mongoDB";
import Project from "@/libs/models/projectModel";
import { NextResponse, NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{projectId:string}> }
) {
  try {
    //connecting to the database
    await ConnectDB();

    //getting the projectId from the url
    const projectId = (await params).projectId;

    //getting the task using this params and checking weather it exist or not
    const project = await Project.findOne({ _id: projectId });
    if (!project) {
      return NextResponse.json({ message: "Invalid Id" }, { status: 400 });
    };

    // sending the task to the user
    return NextResponse.json(
      {
        message: "Project found",
        success: true,
        project,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error(error)
    return NextResponse.json(
      { message: "Server error"},
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{projectId:string}>}
) {
  try {
    //connecting to the database
    ConnectDB();

    //getting params from the url
    const projectId  = (await params).projectId;

    //getting the tasks and deleting it from the database
    const task = await Project.findByIdAndDelete({ _id: projectId });
    if (!task) {
      return NextResponse.json({ message: "Invalid projectId" }, { status: 401 });
    }

    //sending response to the user
    return NextResponse.json(
      { message: "Project deleted successfully" },
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
  { params }: { params: Promise<{ projectId: string }> }
) {
  try {
    await ConnectDB();

    const projectId = (await params).projectId
    const task = await Project.findByIdAndUpdate(
      projectId,
      { status: "completed" },
      { new: true, runValidators: true }
    );

    if (!task) {
      return NextResponse.json({ message: "Project not found" }, { status: 404 });
    }

    return NextResponse.json(task);
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error updating project"},
      { status: 500 }
    );
  }
}
