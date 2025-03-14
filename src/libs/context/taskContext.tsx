"use client"
import { createContext,useState,useEffect } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

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
    const { isAuthenticated } = useKindeBrowserClient()
    console.log(isAuthenticated)
    
    

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
            window.location.reload()
        }catch(error){
            console.error(error)
        }
    }

    useEffect(() => {
        if(isAuthenticated){
            const getProjectSummary = async() => {
                try{
                    const [taskRes,totalTask] = await Promise.all([
                        axios.get('/api/tasks/user'),
                        axios.get('/api/tasks/user/summary')
                    ])
                    setTask(task.concat(taskRes.data.task))
                    setTotalTask(totalTask.data.totalTasks)
                    setCompletedTask(totalTask.data.completedTasks)
                    setPendingTask(totalTask.data.pendingTasks)
                }catch(error){
                    console.error(error)
                }
            }
            getProjectSummary()
        }
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