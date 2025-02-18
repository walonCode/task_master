import Task from "@/libs/models/taskModel";
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/libs/models/userModel";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await ConnectDB();

    // Get user from session
    const { getUser } = getKindeServerSession();
    const kindeUser = await getUser();

    if (!kindeUser) {
      return NextResponse.json(
        { message: "User not authenticated" },
        { status: 401 }
      );
    }

    // Parse request body
    const reqBody = await req.json();
    const { taskName, taskDescription, priority, dueDate, taskType } = reqBody;

    if (!taskName || !taskDescription || !priority || !dueDate || !taskType) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    // Check if user exists
    let user = await User.findOne({ kindeUserId: kindeUser.id });

    if (!user) {
      user = new User({
        username: kindeUser.username,
        fullname: `${kindeUser.given_name} ${kindeUser.family_name}`,
        email: kindeUser.email,
        kindeUserId: kindeUser.id,
      });
      await user.save();
    }

    // Check if the task already exists for this user
    const existingTask = await Task.findOne({
      taskName,
      userId: user._id,
    });

    if (existingTask) {
      return NextResponse.json(
        { message: "Task already exists" },
        { status: 409 }
      );
    }

    // Create new task
    const newTask = new Task({
      taskName,
      taskDescription,
      userId: user._id,
      priority,
      dueDate,
      taskType,
    });

    // Save task and update user
    await newTask.save();
    user.tasks.push(newTask._id);
    await user.save();
    
    //reloading the task page to get the new task
    revalidatePath('/task')

    return NextResponse.json(
      { message: "Task created", newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
