"use client"
import { FilePlus, Loader2, X } from "lucide-react";
import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ProjectTaskCreation({projectId,handleOpen}:{projectId:string | string[] | undefined,handleOpen:()=>void }){
    const [loading, setLoading] = useState<boolean>(false);
    const [taskName, setTaskName] = useState<string>("")
    const [taskDescription, setTaskDescription] = useState<string>("")  
    const [priority, setPriority] = useState<string>("") 
    const [dueDate, setDueDate] = useState<string>("") 
    const [projectTaskType, setProjectTaskType] = useState<string>("")
    const router = useRouter()


    const handleAddTask =  async(e:React.FormEvent<HTMLFormElement>) => {
        try{
            e.preventDefault()
            setLoading(true)
            const newTask = {
                taskName,
                taskDescription,
                projectTaskType,
                priority,
                dueDate
            }
            const res = await axios.post(`/api/tasks/project/${projectId}`,newTask)
            router.push(`/project/${projectId}`)
            window.location.reload()
            console.log(res.data)
            setDueDate("")
            setPriority("")
            setProjectTaskType("")
            setTaskDescription("")
            setTaskName("")
        }catch(error){
            console.error(error)
            setLoading(false)
        }finally{
            setLoading(false)
            setDueDate("")
            setPriority("")
            setProjectTaskType("")
            setTaskDescription("")
            setTaskName("")
        }
    }

    return(
        <div className="mt-6">
          <h3 className="text-xl font-semibold flex items-center justify-between gap-2">
            <div className="flex items-center gap-1"><FilePlus size={24} className="text-blue-500" /> Add a Task </div>
            <button onClick={handleOpen} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
                <X size={24} className="text-red-600"/>
            </button>
          </h3>
          <form onSubmit={handleAddTask} className="mt-4 space-y-2">
            <input 
              type="text" 
              value={taskName} 
              onChange={(e) => setTaskName(e.target.value)} 
              placeholder="Task name..." 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              value={taskDescription}
              onChange={(e) => setTaskDescription( e.target.value)}
              placeholder="Task description..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="date" 
              value={dueDate} 
              onChange={(e) => setDueDate(e.target.value)} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <select 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option>Default</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <select 
              value={projectTaskType} 
              onChange={(e) => setProjectTaskType( e.target.value)} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option >Default</option>
              <option value="bugs">Bugs</option>
              <option value="features">Features</option>
              <option value="improvement">Improvements</option>
            </select>
            <button 
              type="submit" 
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex justify-center items-center gap-2 hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? <Loader2 size={20} className="animate-spin" /> : "Add Task"}
            </button>
          </form>
        </div>
    )
}