import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
// import { sendEmail } from "@/helper/mailer";

connect()

export async function GET(request : NextRequest){
    //create dynamicUserId with firstName
    try {

        //check if user  already exists
        const user = await User.find({isAdmin : false}).select(["email", "_id"])

        if(!user){
            return NextResponse.json({message : "Their is not investor to fetch", status : 500})
        }
        // console.log(savedUser)
        
        return NextResponse.json({message : "User Successfully Created", success : true, investor : user})
    } catch (error : any) {
        console.log("cannot created the username")
        return NextResponse.json({message : error.message}, {status : 500})
    }
}