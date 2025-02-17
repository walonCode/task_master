"use client"

import { createContext,useState } from "react";
import axios from "axios";
import getUserId from "@/app/(Actions)/getUserId";


interface Task {
    _id: string;
    taskName: string;
    taskDescription: string;
    userId: string;
    priorty: 'low' | 'medium' | 'high';
    dueDate: Date; 
    taskType: 'daily' | 'weekly' | 'monthly' | 'one-time';
    status: 'pending' | 'completed';
    createdAt: Date;
    projectId?: string; 
}

interface TaskProp {
    createTask: (taskName:string, taskDescription:string, priority:string, dueDate:string, taskType:string) => Promise<void>
    task: Task[]
}


const TaskContext = createContext<TaskProp | undefined>(undefined);

export const TaskProvider = ({children}:{children:React.ReactNode}) => {
    const [task, setTask] = useState<Task[]>([])
    const user = getUserId()

    const createTask = async(taskName:string, taskDescription:string, priority:string, dueDate:string, taskType:string) => {
        try{
            const newTask = {
                taskName, 
                taskDescription, 
                priority, 
                dueDate, 
                taskType,
                userId:(await user).id
            }
            const res = await axios.post('/api/task',newTask);
            setTask(task.concat(res.data.newTask))
        }catch(error){
            console.error(error)
        }
    }

    return(
        <TaskContext.Provider value={{
            createTask,
            task
        }}>
            {children}
        </TaskContext.Provider>
    )
};

export default TaskContext;