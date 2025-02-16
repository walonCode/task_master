import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema({
    projectName: {
        type:String,
        required:[true,'Please provide a project name'],
    },
    projectDescription: {
        type:String,
        required:[true,'Please provide a project description'],
        minlength: [20, 'Task description should be more than 20 character'],
    },
    owner: {
        type:String,
        required:true
    },
    dueDate: {
        type:Date,
        required:true,
    },
    status: {
        type:String,
        enum: ['active','completed'],
        default:"pending",
    },
    createdAt : {
        type:Date,
        default:Date.now
    },
    updateAt: {
        type:Date,
        default:Date.now
    },
})

projectSchema.index({dueDate: 1});

const Project = mongoose.models.projects || mongoose.model('projects',projectSchema);

export default Project