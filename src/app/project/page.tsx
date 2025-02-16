"use client";

import { useState } from "react";
import Link from "next/link";
import { FiFolder, FiCheck, FiPlus } from "react-icons/fi";

// Project Data Type
interface Project {
  id: number;
  name: string;
  description: string;
  status: "active" | "completed";
}

// Mock Project Data
const mockProjects: Project[] = [
  { id: 1, name: "Task Master App", description: "Manage tasks efficiently.", status: "active" },
  { id: 2, name: "Portfolio Website", description: "Personal website development.", status: "completed" },
  { id: 3, name: "E-commerce Platform", description: "Building an online store.", status: "active" },
];

const ProjectPage = () => {
  const [activeTab, setActiveTab] = useState<"all" | "active" | "completed">("all");

  // Filter projects based on activeTab
  const filteredProjects = activeTab === "all" ? mockProjects : mockProjects.filter((p) => p.status === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:ml-[68px]">
      <div className="max-w-5xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <StatsCard icon={<FiFolder />} title="Total Projects" value={mockProjects.length.toString()} />
          <StatsCard icon={<FiCheck />} title="Completed Projects" value={mockProjects.filter(p => p.status === 'completed').length.toString()} />
        </div>

        {/* Projects Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h2 className="text-xl font-semibold">Projects</h2>
            <Link href="/projects/create">
              <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <FiPlus /> Add Project
              </button>
            </Link>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b overflow-x-auto pb-1">
            {["all", "active", "completed"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "all" | "active" | "completed")}
                className={`pb-2 px-2 capitalize whitespace-nowrap ${
                  activeTab === tab ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Project List */}
          <div className="space-y-4">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)
            ) : (
              <p className="text-gray-500 text-center py-4">No projects found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm flex items-center gap-4">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">{icon}</div>
    <div>
      <p className="text-gray-600 text-sm">{title}</p>
      <p className="text-xl md:text-2xl font-semibold">{value}</p>
    </div>
  </div>
);

// Project Card Component
const ProjectCard = ({ project }: { project: Project }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow bg-white">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{project.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{project.description}</p>
      </div>
      <div className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
        project.status === "active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
      }`}>
        {project.status}
      </div>
    </div>
  </div>
);

export default ProjectPage;
