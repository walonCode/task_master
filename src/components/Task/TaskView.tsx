"use client"
import React, { useContext, useState } from 'react'
import { CalendarDays, Clock, ListChecks, ClipboardCheck, CheckCircle, ClipboardX, Trash2 } from 'lucide-react'
import TaskContext from '@/libs/context/taskContext'

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

export default function TaskView() {
  const { task } = useContext(TaskContext) || {}
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const taskWithOutProjectId = task!.filter(task => task.projectId == null)
  const totalTasks = taskWithOutProjectId.length;
  const completedTasks = taskWithOutProjectId.filter(task => task.status === 'completed').length;
  const pendingTasks = taskWithOutProjectId.filter(task => task.status === 'pending').length;

  const handleDelete = (taskId: string) => {
    console.log(`Deleting task with ID: ${taskId}`);
  };

  const toggleTaskStatus = (taskId: string) => {
    console.log(`Toggling task status for ID: ${taskId}`);
  };

  const filteredTasks = taskWithOutProjectId.filter(t => 
    filter === 'all' ? true : filter === 'completed' ? t.status === 'completed' : t.status === 'pending'
  );

  const groupTasks = () => ({
    daily: filteredTasks.filter(taskWithOutProjectId => taskWithOutProjectId.taskType === 'daily'),
    weekly: filteredTasks.filter(taskWithOutProjectId => taskWithOutProjectId.taskType === 'weekly'),
    monthly: filteredTasks.filter(taskWithOutProjectId => taskWithOutProjectId.taskType === 'monthly'),
    oneTime: filteredTasks.filter(taskWithOutProjectId => taskWithOutProjectId.taskType === 'one-time')
  });

  const TaskGroup = ({ tasks, title, icon: Icon }: { tasks: Task[]; title: string; icon: React.ElementType }) => (
    <div className="bg-white rounded-xl p-5 shadow-md border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <Icon className="w-6 h-6 text-gray-700" />
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <span className="ml-auto bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">{tasks.length} tasks</span>
      </div>
      {tasks.length === 0 ? (
        <p className="text-gray-500 italic text-center py-4">No tasks available</p>
      ) : (
        <div className="space-y-3">
          {tasks.map(task => (
            <div key={task._id} className="p-4 border rounded-lg shadow-sm flex items-start justify-between bg-gray-50 hover:bg-gray-100 transition">
              <div>
                <h3 className="text-md font-medium text-gray-900">{task.taskName}</h3>
                <p className="text-sm text-gray-600 mt-1">{task.taskDescription}</p>
                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-4 h-4" /> Due: {new Date(task.dueDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button title='completed' onClick={() => toggleTaskStatus(task._id)} className="text-green-500 hover:text-green-700">
                  <CheckCircle className="w-5 h-5" />
                </button>
                <button title='delete' onClick={() => handleDelete(task._id)} className="text-red-500 hover:text-red-700">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const groupedTasks = groupTasks();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-6 lg:p-8 max-w-7xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">Task Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div onClick={() => setFilter('all')} className={`cursor-pointer p-4 rounded-lg shadow flex items-center gap-4 transition-colors ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-white hover:bg-blue-100'}`}>
              <ListChecks className={`w-8 h-8 ${filter === 'all' ? 'text-white' : 'text-blue-500'}`} />
              <div>
                <p className="text-sm">Total Tasks</p>
                <p className="text-xl font-semibold">{totalTasks}</p>
              </div>
            </div>
            <div onClick={() => setFilter('completed')} className={`cursor-pointer p-4 rounded-lg shadow flex items-center gap-4 transition-colors ${filter === 'completed' ? 'bg-green-500 text-white' : 'bg-white hover:bg-green-100'}`}>
              <ClipboardCheck className={`w-8 h-8 ${filter === 'completed' ? 'text-white' : 'text-green-500'}`} />
              <div>
                <p className="text-sm">Completed</p>
                <p className="text-xl font-semibold">{completedTasks}</p>
              </div>
            </div>
            <div onClick={() => setFilter('pending')} className={`cursor-pointer p-4 rounded-lg shadow flex items-center gap-4 transition-colors ${filter === 'pending' ? 'bg-red-500 text-white' : 'bg-white hover:bg-red-100'}`}>
              <ClipboardX className={`w-8 h-8 ${filter === 'pending' ? 'text-white' : 'text-red-500'}`} />
              <div>
                <p className="text-sm">Pending</p>
                <p className="text-xl font-semibold">{pendingTasks}</p>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            <TaskGroup tasks={groupedTasks.oneTime} title="One-Time Tasks" icon={CalendarDays} />
            <TaskGroup tasks={groupedTasks.daily} title="Daily Tasks" icon={Clock} />
            <TaskGroup tasks={groupedTasks.weekly} title="Weekly Tasks" icon={Clock} />
            <TaskGroup tasks={groupedTasks.monthly} title="Monthly Tasks" icon={CalendarDays} />
          </div>
        </div>
      </div>
    </div>
  )
}
