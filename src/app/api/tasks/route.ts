import Task from "@/libs/models/taskModel";
import { NextRequest,NextResponse } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import User from "@/libs/models/userModel";


export async function POST(req:NextRequest){
    try{
        //starting the database
        await ConnectDB()

        //getting a user
        const {getUser} = getKindeServerSession()
        const kindeUser = await getUser()

        if(!kindeUser){
            return NextResponse.json(
                {message:"User not authenticated"},
                {status: 401}
            )
        }

        //get data for the user
        const reqBody = await req.json()
        const { taskName, taskDescription,  priority, dueDate, taskType} = reqBody

        //checking if the fields have values
        if(!taskName || !taskDescription || !priority || !dueDate || !taskType){
            return NextResponse.json(
                {message:'All fields required'},
                {status:400}
            )
        }

        //checking to see it a user already exist if not crreate a new user in the data base
        const user = await User.findOne({kindeUserId:kindeUser.id})
        if(!user){
            const newUser = new User({
                username:kindeUser.username,
                fullanme: `${kindeUser.given_name} ${kindeUser.family_name}`,
                email: kindeUser.email,
                kindUserId:kindeUser.id
            })
            await newUser.save()
            
            //checking if the task already exist with that taskname
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
                userId:newUser._id,
                priority,
                dueDate,
                taskType
            })
            //pushing newTask id in to the task array in the user model
            newUser.tasks.push(newTask._id)
            await newUser.save()
            
            await newTask.save()

            //sending the response and created task to the user
            return NextResponse.json(
                {message:"Task created",newTask},
                {status:201}
            )
        } 
    }catch(error){
        console.error(error)
        return NextResponse.json(
            {message:'Server error'},
            {status:500}
        )
    }
}