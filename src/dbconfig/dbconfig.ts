import mongoose from "mongoose";

export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!) //search this
        //console.log('THIS is MONGOOSE ', mongoose)
        const connection = mongoose.connection
        // console.log('THIS is MONGOOSE CONNECTION', connection)

        connection.on('connected', ()=>{
            console.log('mongodb connected succesfully')
       })
        connection.on('error', (err)=>{
            console.log('mongo db not connected to the database successfully something went wrong ', err.message)
            process.exit()
       })
       //this will understand when we will run this
    }
    catch(error) {
        console.log('something went wrong')
        //console.log(error)
    }
}