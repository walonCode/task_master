"use client"

import { useState } from "react";
import { ListChecks, FilePlus, Loader2 } from "lucide-react";

interface Project {
  title: string;
  description: string;
  deadline: string;
}

interface Task {
  id: number;
  name: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  dueDate: string;
  taskType: "Bug" | "Feature" | "Improvement";
}

export default function ProjectDetailsPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [task, setTask] = useState<Omit<Task, "id">>({
    name: "",
    description: "",
    priority: "Medium",
    dueDate: "",
    taskType: "Feature",
  });
  const [loading, setLoading] = useState<boolean>(false);
  
  const project: Project = {
    title: "Project Alpha",
    description: "A modern task management system.",
    deadline: "2025-03-01",
  };

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!task.name || !task.dueDate) return;
    setLoading(true);
    setTimeout(() => {
      setTasks([...tasks, { id: tasks.length + 1, ...task }]);
      setTask({ name: "", description: "", priority: "Medium", dueDate: "", taskType: "Feature" });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="flex min-h-screen p-6 bg-gray-100 flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-gray-800">{project.title}</h2>
        <p className="text-gray-600 mt-2">{project.description}</p>
        <p className="text-gray-500 mt-1">Deadline: {project.deadline}</p>
        
        {/* Task Creation Form */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <FilePlus size={24} className="text-blue-500" /> Add a Task
          </h3>
          <form onSubmit={handleAddTask} className="mt-4 space-y-2">
            <input 
              type="text" 
              value={task.name} 
              onChange={(e) => setTask({...task, name: e.target.value})} 
              placeholder="Task name..." 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <textarea
              value={task.description}
              onChange={(e) => setTask({...task, description: e.target.value})}
              placeholder="Task description..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input 
              type="date" 
              value={task.dueDate} 
              onChange={(e) => setTask({...task, dueDate: e.target.value})} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <select 
              value={task.priority} 
              onChange={(e) => setTask({...task, priority: e.target.value as Task["priority"]})} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
            <select 
              value={task.taskType} 
              onChange={(e) => setTask({...task, taskType: e.target.value as Task["taskType"]})} 
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Improvement">Improvement</option>
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

        {/* Task List */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <ListChecks size={24} className="text-green-500" /> Tasks
          </h3>
          <ul className="mt-4 grid grid-cols-1 gap-4">
            {tasks.length > 0 ? (
              tasks.map((t) => (
                <li key={t.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-300">
                  <h4 className="text-lg font-bold">{t.name}</h4>
                  <p className="text-gray-600">{t.description}</p>
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <span>Priority: {t.priority}</span>
                    <span>Due: {t.dueDate}</span>
                    <span>Type: {t.taskType}</span>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500">No tasks added yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
