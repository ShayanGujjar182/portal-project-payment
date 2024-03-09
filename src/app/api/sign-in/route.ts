import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"

connect()


export async function POST(request : NextRequest){
    try {
        const reqBody = request.json()
        const {email, password} = await reqBody
        console.log('this is email and password', email, password)
        const user = await User.findOne({email})
        console.log('this is req body', user)
        if(!user){
            return NextResponse.json({message : "Sorry This user does not exits"}, {status : 500})
        }

        const validPassword = await bcryptjs.compare(password, user.password)
        console.log(validPassword)
        if(!validPassword){
            return NextResponse.json({message : "Password Does Not match"}, {status : 500})
        }
        const response = NextResponse.json({
            message : "Login Successful",
            success : true,
            user
        })
        // study about the NextResponse
        // response.cookies.set("token", token, {httpOnly : true})
        // it is Next Request as we set in the Parameter so its feature of next resquest that we can manipulate cookies
        return response

        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}