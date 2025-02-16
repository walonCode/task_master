"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  FiHome, 
  FiCheckSquare, 
  FiClock, 
  FiStar,
  FiPlus
} from 'react-icons/fi';

interface Task {
  id: number;
  title: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  dueDate: string;
}

// Mock data
const mockTasks: Task[] = [
  { id: 1, title: 'Complete project proposal', status: 'pending', priority: 'high', dueDate: '2024-03-25' },
  { id: 2, title: 'Review code changes', status: 'completed', priority: 'medium', dueDate: '2024-03-22' },
  { id: 3, title: 'Update documentation', status: 'pending', priority: 'low', dueDate: '2024-03-24' },
  { id: 4, title: 'Team meeting', status: 'pending', priority: 'high', dueDate: '2024-03-23' },
];

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'completed'>('all');

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:ml-[68px]">
      <div className="max-w-7xl mx-auto">
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard icon={<FiCheckSquare />} title="Total Tasks" value="24" />
          <StatsCard icon={<FiClock />} title="Pending" value="12" />
          <StatsCard icon={<FiStar />} title="High Priority" value="8" />
          <StatsCard icon={<FiHome />} title="Completed" value="16" />
        </div>

        {/* Tasks Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <h2 className="text-xl font-semibold">Tasks</h2>
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <Link href='/task/create' className='flex items-center justify-center gap-2'>
              <FiPlus /> Add Task
              </Link>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 border-b overflow-x-auto pb-1">
            {['all', 'pending', 'completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'all' | 'pending' | 'completed')}
                className={`pb-2 px-2 capitalize whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) => (
  <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
        {icon}
      </div>
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl md:text-2xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);

const TaskCard = ({ task }: { task: Task }) => (
  <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{task.title}</h3>
        <p className="text-sm text-gray-500 mt-1">Due: {task.dueDate}</p>
      </div>
      <div className="flex flex-wrap gap-2 items-center">
        <div className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
          task.status === 'completed' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {task.status}
        </div>
        <span className={`px-2 py-1 rounded-md text-xs whitespace-nowrap ${
          task.priority === 'high' 
            ? 'bg-red-100 text-red-800'
            : task.priority === 'medium'
            ? 'bg-orange-100 text-orange-800'
            : 'bg-blue-100 text-blue-800'
        }`}>
          {task.priority}
        </span>
      </div>
    </div>
  </div>
);

export default DashboardPage;
