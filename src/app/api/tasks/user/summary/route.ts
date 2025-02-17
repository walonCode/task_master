import Task from "@/libs/models/taskModel";
import { NextResponse } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";
import User from "@/libs/models/userModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    await ConnectDB();

    const { getUser } = getKindeServerSession()
    const kindeUser = await getUser()
    const user = await User.findOne({kindeUserId:kindeUser.id})

    if(!user){
      return NextResponse.json(
        {message:"User not authenticated"},
        {status: 401}
      )
    }
    
    const totalTasks = await Task.countDocuments({ userId: user._id });
    const completedTasks = await Task.countDocuments({ userId:user._id, status: "completed" });
    const pendingTasks = await Task.countDocuments({ userId:user._id, status: { $ne: "completed" } });

    return NextResponse.json(
      { totalTasks, completedTasks, pendingTasks },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Server Error"}, { status: 500 });
  }
}
