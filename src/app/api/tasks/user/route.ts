import Task from "@/libs/models/taskModel";
import { NextResponse} from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/libs/models/userModel";

export async function GET(){
    try{
        //connecting to the database
        await ConnectDB()

        //getting the userId
        const { getUser } = getKindeServerSession()
        const kindeUser = await getUser()
        const user = await User.findOne({kindeUserId:kindeUser.id})

        if(!user){
            return NextResponse.json(
                {message:"User not authenticated"},
                {status: 401}
            )
        }
        
        //getting all the user created task from the database
        const task = await Task.find({userId:user._id})

        //checking if the task is valid or not
        if(task.length == 0){
            return NextResponse.json(
                {message:"Task is empty",task:[]},
                {status: 200}
            )
        }

        //sending tasks to user
        return NextResponse.json(
            {message:"Task sents",task},
            {status:200}
        )

    }catch(error:unknown){
        console.error(error)
        return NextResponse.json(
            {message:"Server Error"},
            {status:500}
        )
    }
}