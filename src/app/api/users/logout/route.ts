import { NextResponse } from "next/server";

export async function GET(){
    try{
        const response = NextResponse.json({message:"Logout successfull"},{status:200})
        response.cookies.set("user","",{
            httpOnly:true,
            expires: new Date(0),
        })
        return response
    }catch(error:unknown){
        return NextResponse.json({error},{status:500});
    }
}