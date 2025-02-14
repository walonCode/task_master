import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
    try {
        const token = req.cookies.get("user")?.value;
        if (!token) return NextResponse.json({ isAuthenticated: false }, { status: 401 });

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
        return NextResponse.json({ isAuthenticated: true, user: decoded },{status:200});
    } catch (error) {
        console.error(error)
        return NextResponse.json({ isAuthenticated: false }, { status: 401 });
    }
}
