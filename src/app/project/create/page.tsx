"use client"

import { useState } from "react";
import { FilePlus, Loader2 } from "lucide-react";

export default function CreateProjectPage() {
  const [project, setProject] = useState<{ title: string; description: string; deadline: string }>({ title: "", description: "", deadline: "" });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Project Created Successfully!");
      setProject({ title: "", description: "", deadline: "" });
    }, 2000);
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
              value={project.title} 
              onChange={handleChange} 
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter project title" 
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Description</label>
            <textarea 
              name="description" 
              value={project.description} 
              onChange={handleChange} 
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
              value={project.deadline} 
              onChange={handleChange} 
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
      </div>
    </div>
  );
}