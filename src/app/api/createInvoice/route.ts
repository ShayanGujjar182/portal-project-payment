import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel"
import Invoice from "@/models/invoice"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
// import { sendEmail } from "@/helper/mailer";

connect()

export async function POST(request : NextRequest){
    //create dynamicUserId with firstName
    try {
        const req = await request.json()
        const {productPrice, date, time, exchangeRate, qty, imageUrl, id} = await req

        //check if user  already exists
        const user = await User.findById(id).select("email")

        if(!user){
            return NextResponse.json({message : "Account is not Created on this email", status : 500})
        }
        const createInvoice = await Invoice.findOne({email : user.email})
        console.log("reached here")
        if(!createInvoice){
            const createInvoice = new Invoice({
                email : user.email,
                Invoices : [
                    {
                        paymentStatus : false,
                        totalAmount : qty * exchangeRate,
                        date : date,
                        time : time,
                        imageUrl,
                        productPrice,
                        exchangeRate,
                        qty,
                    }
                ]
            })
            const savedInvoice = await createInvoice.save()
            return NextResponse.json({message : "Successfully added data", success : true, status : 200, savedInvoice})
        }
        createInvoice.Invoices.push({
            paymentStatus : false,
            totalAmount : qty * exchangeRate,
            date : date,
            time : time,
            imageUrl,
            productPrice,
            exchangeRate,
            qty,
        })
        const savedInvoice = await createInvoice.save()
        return NextResponse.json({message : "Successfully added data", success : true, status : 200, savedInvoice})
        // console.log(savedUser)
    } catch (error : any) {
        console.log("cannot created the username")
        return NextResponse.json({message : error.message}, {status : 500})
    }
}