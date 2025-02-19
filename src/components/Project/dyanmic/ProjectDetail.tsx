"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { ListChecks, Calendar, ClipboardList, Hourglass } from "lucide-react";
import ProjectTaskCreation from "@/components/Project/dyanmic/ProjectTaskCreation";
import { FaBug, FaRocket, FaTools } from "react-icons/fa";

interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  owner: string;
  dueDate: string;
  status: "active" | "completed";
  createdAt?: string;
  updatedAt?: string;
  task?: Task[];
}

interface Task {
  _id: string;
  taskName: string;
  taskDescription: string;
  userId: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
  taskType: "daily" | "weekly" | "monthly" | "one-time";
  status: "pending" | "completed";
  createdAt: string;
  projectId?: string;
  projectTaskType: 'bugs' | 'features' | 'improvement'
}

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params?.projectId as string;

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setIsCreateTaskOpen(!isCreateTaskOpen);
  }
  // Fetch Project and Tasks
  useEffect(() => {
    if (!projectId) return;

    const fetchProjectDetails = async () => {
      try {
        const [projectRes, taskRes] = await Promise.all([
          axios.get(`/api/project/${projectId}`),
          axios.get(`/api/tasks/project/${projectId}`),
        ]);
        setProject(projectRes.data.project);
        setTasks(taskRes.data.taskProject);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (loading) return <p className="text-center text-gray-500">Loading project details...</p>;
  if (!project) return <p className="text-center text-red-500">Project not found.</p>;

  return (
    <div className="flex min-h-screen p-6 bg-gray-100 flex-col items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl">
        {/* Project Header */}
        <div className="border-b pb-4 mb-4">
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <ClipboardList size={28} className="text-blue-500" />
            {project.projectName}
          </h2>
          <p className="text-gray-600 mt-2">{project.projectDescription}</p>
          <div className="mt-2 flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-gray-400" />
              Due: {new Date(project.dueDate).toLocaleDateString()}
            </div>
            <div className="flex items-center gap-2">
              <Hourglass size={18} className="text-gray-400" />
              Status:{" "}
              <span className={`font-semibold ${project.status === "completed" ? "text-green-500" : "text-yellow-500"}`}>
                {project?.status}
              </span>
            </div>
          </div>
        </div>

        {/* Task Creation Component */}
        <div className={isCreateTaskOpen ?"hidden":"flex items-center justify-center" }>
          <button className="font-bold text-xl border-2 border-blue-500 py-1 px-6 rounded-md bg-blue-500  text-white" onClick={handleOpen}>Create Tasks</button>
        </div>
        
        <div>
          {isCreateTaskOpen && (
            <ProjectTaskCreation projectId={projectId} handleOpen={handleOpen} />
          )}
        </div>

        {/* Task List */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <ListChecks size={24} className="text-green-500" />
            Project Tasks
          </h3>

          <ul className="mt-4 grid gap-4">
            {tasks?.length > 0 ? (
              tasks.map((task) => (
                <li
                  key={task._id}
                  className="bg-white p-4 rounded-lg shadow-md border border-gray-300 flex flex-col sm:flex-row sm:justify-between sm:items-center"
                >
                  <div>
                    <h4 className="text-lg font-bold text-gray-800">{task.taskName}</h4>
                    <p className="text-gray-600">{task.taskDescription}</p>
                    <div className="mt-2 flex items-center flex-wrap gap-3 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${
                        task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                      }`}>
                        {task.priority}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={16} className="text-gray-400" />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <ClipboardList size={16} className="text-gray-400" />
                        {task.taskType}
                      </span>
                      <span className={`font-semibold ${
                        task.status === "completed" ? "text-green-500" : "text-orange-500"
                      }`}>
                        {task.status}
                      </span>
                      <h1 className={`font-bold flex items-center gap-1 ${task.projectTaskType === 'bugs' ? "text-red-500" : task.projectTaskType === 'features' ? 'text-green-500' : "text-blue-500"}`}>
                        {task.projectTaskType} {task.projectTaskType === 'bugs' ? <FaBug style={{ color: "red"}}/> : task.projectTaskType === 'features' ? <FaRocket style={{color: "green"}}/> : <FaTools style={{color : "blue"}}/>}
                      </h1>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center mt-4">No tasks added yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
