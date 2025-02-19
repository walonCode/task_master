"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import { FiCheckSquare, FiClock, FiStar, FiPlus, FiFolder } from "react-icons/fi";
import TaskContext from "@/libs/context/taskContext";
import ProjectContext from "@/libs/context/projectContext";


// Task and Project Interfaces
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
}

interface Project {
  _id: string;
  projectName: string;
  projectDescription: string;
  owner: string;
  dueDate: string;
  status: "active" | "completed";
  createdAt?: string;
  updatedAt?: string;
  tasks?: Task[];
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"tasks" | "projects">("tasks");
  const { task = [], totalTask = 0, completedTask = 0 } = useContext(TaskContext) || {};
  const { project = [], totalProject = 0, completedProject = 0 } = useContext(ProjectContext) || {};

  const taskFilter = task.filter(task => task.projectId == null)
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:ml-[250px]">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard icon={<FiCheckSquare />} title="Total Tasks" value={totalTask} />
          <StatsCard icon={<FiClock />} title="Completed Tasks" value={completedTask} />
          <StatsCard icon={<FiFolder />} title="Total Projects" value={totalProject} />
          <StatsCard icon={<FiStar />} title="Completed Projects" value={completedProject} />
        </div>

        {/* Tabs for Tasks and Projects */}
        <div className="flex gap-4 mb-6 border-b overflow-x-auto pb-1">
          {["tasks", "projects"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as "tasks" | "projects")}
              className={`pb-2 px-2 capitalize whitespace-nowrap ${
                activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === "tasks" ? (
          <Section title="Tasks" link="/task/create">
            {task.length > 0 ? (
              taskFilter.map((taskItem) => <TaskCard key={taskItem._id} task={taskItem} />)
            ) : (
              <p className="text-gray-500">No tasks available.</p>
            )}
          </Section>
        ) : (
          <Section title="Projects" link="/project/create">
            {project.length > 0 ? (
              project.map((projectItem) => <ProjectCard key={projectItem._id} project={projectItem} />)
            ) : (
              <p className="text-gray-500">No projects available.</p>
            )}
          </Section>
        )}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: number }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl md:text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

// Section Component
const Section = ({ title, link, children }: { title: string; link: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link
        href={link}
        className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        <FiPlus /> Add {title.slice(0, -1)}
      </Link>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

// Task Card Component
const TaskCard = ({ task }: { task: Task }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
    <h3 className="font-medium">{task.taskName}</h3>
    <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
    <p className={`text-sm font-semibold mt-1 ${getPriorityColor(task.priority)}`}>{task.priority.toUpperCase()}</p>
  </div>
);

// Project Card Component
const ProjectCard = ({ project }: { project: Project }) => (
 <Link href={`/project/${project._id}`}>
  <div className="p-4 border rounded-lg space-y-2 my-2 hover:shadow-md transition-shadow">
    <h3 className="font-medium">{project.projectName}</h3>
    <p className="text-sm text-gray-500 mt-1">Deadline: {project.dueDate}</p>
    <p className={`text-sm font-semibold mt-1 ${project.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
      {project.status.toUpperCase()}
    </p>
  </div>
 </Link>
);

// Helper function to determine priority colors
const getPriorityColor = (priority: "low" | "medium" | "high") => {
  switch (priority) {
    case "low":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "high":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export default Dashboard;
