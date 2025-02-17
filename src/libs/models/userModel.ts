import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        unique:[true, 'Please provide a unique username'],
        required:[true,'Please provide a username'],
    },
    fullname: {
        type:String,
        required:[true, 'Please provide your fullname'],
    },
    email: {
        type:String,
        required:[true,'Please provide an email'],
    },
    kindeUserId: {
        type:String,
        required:true
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
    }],
    projects: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }]
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User