import Task from "@/libs/models/taskModel";
import { NextRequest,NextResponse } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";
import User from "@/libs/models/userModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Project from "@/libs/models/projectModel";


export async function POST(req:NextRequest, {params}:{params:{projectId:string}}){
    try{
        //starting the database
        await ConnectDB()

        //getting the userId
        const { getUser } = getKindeServerSession()
        const kindeUser = await getUser()

        const user = await User.findOne({userId:kindeUser.id})
        if(!user){
            return NextResponse.json(
                {message:"User not authenticated"},
                {status: 401}
            )
        }

        //get the params
        const { projectId } = params

        //finding the project in the database
        const project = await Project.findOne({projectId})
        if(!project){
            return NextResponse.json(
                {message:"Invalid projectId"},
                {status: 400}
            )
        }

        //get data for the user
        const reqBody = await req.json()
        const { taskName, taskDescription,  priority, dueDate, taskType} = reqBody

        //checking if the fields have values
        if(!taskName || !taskDescription  || !priority || !dueDate || !taskType){
            return NextResponse.json(
                {message:'All fields required'},
                {status: 400}
            )
        }

        //checking if the task already exist
        const task = await Task.findOne({taskName})
        if(task){
            return NextResponse.json(
                {message:'Task already exist'},
                {status:409}
            )
        }
        
        // adding a new task to the database
        const newTask = new Task({
            taskName,
            taskDescription,
            userId:user._id,
            priority,
            dueDate,
            taskType,
            projectId
        })

        //add task to the user
        user.tasks.push(newTask._id)
        await user.save()

        //adding  task to the project
        project.tasks.push(newTask._id)
        await project.save()
        
        await newTask.save()

        //sending the response and created task to the user
        return NextResponse.json(
            {message:"Task created",newTask},
            {status:201}
        )
    }catch(error:unknown){
        console.error(error)
        return NextResponse.json(
            {message:'Server error'},
            {status:500}
        )
    }
}