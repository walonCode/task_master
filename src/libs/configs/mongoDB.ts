import mongoose from "mongoose";

export async function ConnectDB(){
    console.log('MongoDB connection with retry')
    try{
        await mongoose.connect(process.env.DATABASE_URI!,{

        })
        console.log('Connected to MongoDB')
    }catch(error){
        console.log('Database connection failed',error)
        setTimeout(()=>{
            ConnectDB()
        },5000)
    }
}