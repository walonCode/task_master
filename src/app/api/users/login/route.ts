import User from "@/libs/models/userModel";
import { ConnectDB } from "@/libs/configs/mongoDB";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest,NextResponse } from "next/server";

interface TokenData {
    id:string,
    username:string,
    email:string
}

export async function POST(req:NextRequest){
    try {
        const reqBody = await req.json()
        const {username, password} = reqBody

        // Connection to the database
        await ConnectDB()

        // Check if user exists
        const user = await User.findOne({username})
        if(!user) {
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        // Check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword) {
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        // Create token data
        const tokenData:TokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // Create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const userResponse = user.toObject()
        delete userResponse.password
        
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
            userResponse
        },{status:200})

        // Set cookie
        response.cookies.set("user", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 86400 // 1 day in seconds
        })

        return response

    } catch (error: unknown) {
        return NextResponse.json({message:'Login failed',error}, {status: 500})
    }

}