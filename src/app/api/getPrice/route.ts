import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
// import jwt from "jsonwebtoken"

connect()


export async function POST(request : NextRequest){
    try {
        const reqBody = request.json()
        console.log("Reach here3")
        const {id} = await reqBody
        console.log("Reach here")
        const user = await User.findById(id)
        console.log("Reach here2")
        console.log('this is req body', user)
        if(!user){
            return NextResponse.json({message : "Sorry, Unable to get the Price"}, {status : 500})
        }
        // study about the NextResponse
        // response.cookies.set("token", token, {httpOnly : true})
        // it is Next Request as we set in the Parameter so its feature of next resquest that we can manipulate cookies
        user.save()
        const response = NextResponse.json({message : "Price Updated succesfully", status : 200, success : true, exchangeRate : user.exchangeRate})
        return response

        
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}