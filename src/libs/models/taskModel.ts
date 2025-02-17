import mongoose from "mongoose";

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type:String,
        required:[true,'Please provide a task name'],
    },
    taskDescription: {
        type:String,
        required:[true,'Please provide a task description'],
        minlength: [20, 'Task description should be more than 20 character'],
    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    priority: {
        type:String,
        enum: ['low','medium','high'],
        default:'meduim',
    },
    dueDate: {
        type:String,
        required:true,
    },
    taskType: {
        type:String,
        enum: ['daily','weekly','monthly','one-time'],
        required:true,
    },
    status: {
        type:String,
        enum: ['pending','completed'],
        default:"pending",
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    projectId: {
        type:String,
    },
})

taskSchema.index({dueDate: 1});

const Task = mongoose.models.tasks || mongoose.model('tasks',taskSchema);

export default Task