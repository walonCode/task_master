import mongoose from "mongoose";

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type:String,
        unique:[true, 'Please provide a unique username'],
        required:[true,'Please provide a username'],
        minlength: [5,'Username show be more that five characters'],
    },
    fullname: {
        type:String,
        required:[true, 'Please provide your fullname'],
    },
    email: {
        type:String,
        required:[true,'Please provide an email'],
        match:[
            /^[\w-\.]+@([\w-]+.)+[\w-]{2,4}$/,
            'Please enter a valid email'
        ]
    },
    password: {
        type:String,
        required:[true, 'Please enter a password'],
        minlength: [8, 'please enter a password with more than 5 character'],
    },
    tasks:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Task',
    }]
})

const User = mongoose.models.users || mongoose.model("users",userSchema)

export default User