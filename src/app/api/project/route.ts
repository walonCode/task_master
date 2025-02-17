import { NextResponse,NextRequest } from "next/server";
import Project from "@/libs/models/projectModel";
import { ConnectDB } from "@/libs/configs/mongoDB";
import User from "@/libs/models/userModel";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";


export async function POST(req:NextRequest){
    try{
        // connecting to the database
        await ConnectDB()

        //getting the user
        const { getUser } = getKindeServerSession()
        const kindeUser = await getUser()

        if(!kindeUser){
            return NextResponse.json(
                {message:"User is not authenticated"},
                {status: 401}
            )
        }

        const user = await User.findOne({kindeUserId:kindeUser.id})
        if(!user){
            return NextResponse.json(
                {message:"User not found"},
                {status: 404}
            )
        }

        //getting data from the user
        const reqBody = await req.json()
        const { projectName,projectDescription,dueDate} = reqBody;

        //validating the data
        if(!projectName || !projectDescription || !dueDate ){
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
            owner:user._id
        })

        //add projects to the user
        user.projects.push(newProject._id)
        await user.save()
        
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