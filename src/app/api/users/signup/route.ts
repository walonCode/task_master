import User from "@/libs/models/userModel";
import { ConnectDB } from "@/libs/configs/mongoDB";
import { NextResponse,NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'


export async function POST(req:NextRequest){
    try {
        // connection to the database
        await ConnectDB()

        
        const reqBody = await req.json()
        const {username, email, password, fullname} = reqBody

        if(!username || !email || !password || !fullname){
            return NextResponse.json(
                {message:"All field are required"},
                {status:400}
            )
        }

        // Check if user already exists
        const existingUser = await User.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        })

        if(existingUser) {
            return NextResponse.json(
                {error: "User with this email or username already exists"},
                {status: 400}
            )
        }

        //hashing the password
        const passwordHashed = await bcryptjs.hash(password,10)

        // Create new user
        const newUser = await new User({
            username,
            email,
            password:passwordHashed,
            fullname
        })

        await newUser.save()

        const userResponse = newUser.toObject()
        delete userResponse.password

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            user: userResponse
        })

    } catch (error: unknown) {
        return NextResponse.json(
            { error },
            { status: 500 }
        )
    }
}