import Task from "@/libs/models/taskModel";
import { NextResponse,NextRequest } from "next/server";
import { ConnectDB } from "@/libs/configs/mongoDB";

export async function GET(req:NextRequest,{params}:{params:{userId:string}}){
    try{
        //connecting to the database
        await ConnectDB()

        //params from the url
        const { userId } = params

        //getting all the user created task from the database
        const task = await Task.find({userId:userId})

        //checking if the task is valid or not
        if(!task){
            return NextResponse.json(
                {message:"Invalid Task"},
                {status:400}
            )
        }

        //sending tasks to user
        return NextResponse.json(
            {message:"Task sents",task},
            {status:200}
        )

    }catch(error:unknown){
        return NextResponse.json(
            {message:"Server Error",error},
            {status:500}
        )
    }
}