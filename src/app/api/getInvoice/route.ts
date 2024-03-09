import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import Invoice from "@/models/invoice";
// import { sendEmail } from "@/helper/mailer";

connect()

export async function POST(request : NextRequest){
    //create dynamicUserId with firstName
    try {
        console.log("enetered")
        const req = await request.json()
        console.log(req)
        const {userId} = req
        //check if user  already exists
        console.log("reach here")
        const user = await User.findById(userId).select(["email", "_id"])
        console.log(user)
        if(!user){
            return NextResponse.json({message : "No Data to Load", status : 500, success : false})
        }
        // console.log(savedUser)
        const getInvoice = await Invoice.find({email : user.email})
        return NextResponse.json({message : "User Successfully Created", success : true, investor : getInvoice})
    } catch (error : any) {
        console.log("cannot created the username")
        return NextResponse.json({message : error.message, status : 500, success : false})
    }
}