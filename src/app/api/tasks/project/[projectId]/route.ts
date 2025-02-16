import Task from "@/libs/models/taskModel";
import { NextRequest,NextResponse } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";


export async function POST(req:NextRequest, {params}:{params:{projectId:string}}){
    try{
        //starting the database
        await ConnectDB()

        //get the params
        const { projectId } = params

        //get data for the user
        const reqBody = await req.json()
        const { taskName, taskDescription, userId, priority, dueDate, taskType} = reqBody

        //checking if the fields have values
        if(!taskName || !taskDescription || !userId || !priority || !dueDate || !taskType){
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
            userId,
            priority,
            dueDate,
            taskType,
            projectId
        })
        
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