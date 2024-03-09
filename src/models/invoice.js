import mongoose from "mongoose"
const invoiceSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Please Provide a unique email"],
        unique : true
    },
    Invoices : [
        {
            uniqueId : {type : String},
            paymentStatus : { type : Boolean, default : false},
            totalAmount : {type : Number, default : 0},
            date : {type : String},
            time : {type : String},
            imageUrl : {type : String},
            productPrice : {type : String},
            qty : {type : Number},    
            exchangeRate : {type : Number} 
        }

    ]
})

const Invoice = mongoose.models.invoice || mongoose.model("invoice", invoiceSchema)
//if the model is already create give us that otherwise create the new model
//everything in the mongodb is saved as lowercased and pluralized so no worry of writing
export default Invoice