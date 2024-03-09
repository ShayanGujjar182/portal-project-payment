import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
// import { sendEmail } from "@/helper/mailer";

connect()

export async function POST(request : NextRequest){
    //create dynamicUserId with firstName
    try {
        const reqBody = await request.json()
        const {firstName, lastName, email, password, type} = reqBody
        console.log(reqBody, "this is req body")

        //check if user  already exists
        const user = await User.findOne({email : email})

        if(user){
            return NextResponse.json({message : "Email Already Exists", status : 500})
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password , salt)
        const fullName = firstName + " " + lastName
        const newUser = new User({
            email,
            fullName,
            password : hashedPassword, 
            isAdmin : type == "admin" ? true : false
        })

        const savedUser = await newUser.save()
        // console.log(savedUser)
        
        return NextResponse.json({message : "User Successfully Created", success : true, savedUser})
    } catch (error : any) {
        console.log("cannot created the username")
        return NextResponse.json({message : error.message}, {status : 500})
    }
}