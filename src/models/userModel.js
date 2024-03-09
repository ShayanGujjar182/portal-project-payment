import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true, "Please Provide a unique email"],
        unique : true
    },
    fullName : {
        type : String,
        required : [true, "Must Requires a Name"],
    },
    isAdmin : {
        type : String
    },
    exchangeRate : {
        type : String
    },
    password: {
        type : String,
        required : [true, "Please Provide a Password"]
    },
})

const User = mongoose.models.users || mongoose.model("users", userSchema)
//if the model is already create give us that otherwise create the new model
//everything in the mongodb is saved as lowercased and pluralized so no worry of writing
export default User