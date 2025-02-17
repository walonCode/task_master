import Project from "@/libs/models/projectModel";
import {  NextResponse } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";
import User from "@/libs/models/userModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function GET() {
  try {
    //connecting to the database
    await ConnectDB();


    //getting the user
    const { getUser } = getKindeServerSession()
    const kindeUser = await getUser()

    if(!kindeUser){
      return NextResponse.json(
        {message: "User is not Authenticated"},
        {status: 401}
      )
    }

    const user = await User.findOne({kindeUserId:kindeUser.id})

    if(!user){
      return NextResponse.json(
        {message:'User not found'},
        {status: 404}
      )
    }

  
    const totalProjects = await Project.countDocuments({ owner:user._id });
    const completedProjects = await Project.countDocuments({ owner:user._id, status: "completed" });
    const activeProjects = await Project.countDocuments({ owner:user._id, status: { $ne: "completed" } });

    return NextResponse.json(
      { totalProjects, completedProjects, activeProjects },
      { status: 200 }
    );
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: "Server Error"}, { status: 500 });
  }
}
