import { NextResponse,NextRequest } from "next/server";
import Project from "@/libs/models/projectModel";
import { ConnectDB } from "@/libs/configs/mongoDB";


export async function POST(req:NextRequest){
    try{
        // connecting to the database
        await ConnectDB()

        //getting data from the user
        const reqBody = await req.json()
        const { projectName,projectDescription,dueDate,owner} = reqBody;

        //validating the data
        if(!projectName || !projectDescription || !dueDate || !owner){
            return NextResponse.json(
                {message:"All fields required"},
                {status: 400}
            )
        };

        //checking if the project name already exist
        const project = await Project.findOne({ projectName})
        if(project){
            return NextResponse.json(
                {message:"Project already exist"},
                {status: 401}
            )
        }

        //creating new project in the database
        const newProject = new Project({
            projectName,
            projectDescription,
            dueDate,
            owner
        })

        await newProject.save();

        //returning created project to the user
        return NextResponse.json(
            {message:"Project created successfully",newProject},
            {status: 201}
        )

    }catch(error){
        console.error(error)
        return NextResponse.json(
            {message:"Server error"},
            {status: 500}
        )
    }
}