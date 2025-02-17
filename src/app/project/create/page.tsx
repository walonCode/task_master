"use client"

import { useState,useContext } from "react";
import { FilePlus, Loader2 } from "lucide-react";
import ProjectContext from "@/libs/context/projectContext";
import { ToastContainer,toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CreateProjectPage() {
  const [projectName, setProjectName] = useState<string>("")
  const [projectDescription, setProjectDescription] = useState<string>("")
  const [dueDate, setDueDate] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false);
  const { createProject } = useContext(ProjectContext) || {};
  const router = useRouter()


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      setLoading(true)
      await createProject!(projectName,projectDescription,dueDate)
      toast('project created')
      router.push('/project')
    }catch(error){
      console.error(error)
      toast('project creation failed')
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-100 flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FilePlus size={28} className="text-blue-500" /> Create a New Project
        </h2>
        <p className="text-gray-500 mt-2">Organize and manage your projects efficiently.</p>
        
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Project Title</label>
            <input 
              type="text" 
              name="title" 
              value={projectName} 
              onChange={(e) => setProjectName(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title" 
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea 
              name="description" 
              value={projectDescription} 
              onChange={(e) => setProjectDescription(e.target.value)} 
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project description" 
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Deadline</label>
            <input 
              type="date" 
              name="deadline" 
              value={dueDate} 
              onChange={ (e) => setDueDate(e.target.value)} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition duration-300"
            disabled={loading}
          >
            {loading ? <Loader2 size={20} className="animate-spin" /> : "Create Project"}
          </button>
        </form>
        <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        position="top-right"
        />
      </div>
    </div>
  );
}