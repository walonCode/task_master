"use client";
import { useState } from "react";
import Link from "next/link";
import {
  FiCheckSquare,
  FiClock,
  FiStar,
  FiPlus,
  FiFolder,
} from "react-icons/fi";

// Task and Project Interfaces
interface Task {
  id: number;
  title: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

interface Project {
  id: number;
  name: string;
  status: "ongoing" | "completed";
  priority: "low" | "medium" | "high";
  deadline: string;
}

// Mock Data
const mockTasks: Task[] = [
  { id: 1, title: "Complete project proposal", status: "pending", priority: "high", dueDate: "2024-03-25" },
  { id: 2, title: "Review code changes", status: "completed", priority: "medium", dueDate: "2024-03-22" },
  { id: 3, title: "Update documentation", status: "pending", priority: "low", dueDate: "2024-03-24" },
  { id: 4, title: "Team meeting", status: "pending", priority: "high", dueDate: "2024-03-23" },
];

const mockProjects: Project[] = [
  { id: 1, name: "Website Redesign", status: "ongoing", priority: "high", deadline: "2024-04-15" },
  { id: 2, name: "Mobile App Development", status: "completed", priority: "medium", deadline: "2024-03-10" },
  { id: 3, name: "Marketing Campaign", status: "ongoing", priority: "low", deadline: "2024-05-01" },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<"tasks" | "projects">("tasks");

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:ml-[250px]">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard icon={<FiCheckSquare />} title="Total Tasks" value={mockTasks.length.toString()} />
          <StatsCard icon={<FiClock />} title="Pending Tasks" value={mockTasks.filter(t => t.status === 'pending').length.toString()} />
          <StatsCard icon={<FiFolder />} title="Total Projects" value={mockProjects.length.toString()} />
          <StatsCard icon={<FiStar />} title="High Priority Projects" value={mockProjects.filter(p => p.priority === 'high').length.toString()} />
        </div>

        {/* Tabs for Tasks and Projects */}
        <div className="flex gap-4 mb-6 border-b overflow-x-auto pb-1">
          {['tasks', 'projects'].map(tab => (
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
            {mockTasks.map(task => (
              <TaskCard key={task.id} task={task} />
            ))}
          </Section>
        ) : (
          <Section title="Projects" link="/project/create">
            {mockProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </Section>
        )}
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
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

const Section = ({ title, link, children }: { title: string; link: string; children: React.ReactNode }) => (
  <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Link href={link} className="w-full sm:w-auto flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
        <FiPlus /> Add {title.slice(0, -1)}
      </Link>
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const TaskCard = ({ task }: { task: Task }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
    <h3 className="font-medium">{task.title}</h3>
    <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
  </div>
);

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
    <h3 className="font-medium">{project.name}</h3>
    <p className="text-sm text-gray-500 mt-1">Deadline: {project.deadline}</p>
  </div>
);

export default DashboardPage;
