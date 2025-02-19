"use client"
import { createContext,useState,useEffect } from "react";
import axios from "axios";

interface Task {
    _id: string;
    taskName: string;
    taskDescription: string;
    userId: string;
    priority: 'low' | 'medium' | 'high';
    dueDate: string; 
    taskType: 'daily' | 'weekly' | 'monthly' | 'one-time';
    status: 'pending' | 'completed';
    createdAt: string;
    projectId?: string; 
}

interface TaskProp {
    createTask: (taskName:string, taskDescription:string, priority:string, dueDate:string, taskType:string) => Promise<void>
    task: Task[] | [];
    totalTask:number | undefined;
    completedTask: number | undefined,
    pendingTask: number | undefined
}


const TaskContext = createContext<TaskProp | undefined>(undefined);

export const TaskProvider = ({children}:{children:React.ReactNode}) => {
    const [task, setTask] = useState<Task[]>([])
    const [totalTask, setTotalTask]= useState<number>()
    const [completedTask, setCompletedTask] = useState<number>()
    const [pendingTask, setPendingTask] = useState<number>()
    

    const createTask = async(taskName:string, taskDescription:string, priority:string, dueDate:string, taskType:string) => {
        try{
            const newTask = {
                taskName, 
                taskDescription, 
                priority, 
                dueDate, 
                taskType,
            }
            const res = await axios.post('/api/tasks',newTask);
            setTask(task.concat(res.data.newTask))
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        async function getTask(){
            try{
                const res = await axios.get('/api/tasks/user')
                console.log(res.data.task)
                setTask(task.concat(res.data.task))
            }catch(error){
                console.error(error)
            }
        }
        async function getTaskTotal(){
            const res = await axios.get('/api/tasks/user/summary')
            console.log(res.data)
            setTotalTask(res.data.totalTasks)
            setCompletedTask(res.data.completedTasks)
            setPendingTask(res.data.pendingTasks)
        }
        getTaskTotal()
        getTask()
    },[])

    return(
        <TaskContext.Provider value={{
            createTask,
            task,
            totalTask,
            completedTask,
            pendingTask
        }}>
            {children}
        </TaskContext.Provider>
    )
};

export default TaskContext;