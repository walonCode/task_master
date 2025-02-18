"use client"
import React, { useContext, useState } from 'react'
import { CalendarDays, Clock, ListChecks, ClipboardCheck, ClipboardX, Trash2 } from 'lucide-react'
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

export default function TaskPage() {
  const { task } = useContext(TaskContext) || {}
  const checked = true
  const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

  const handleDelete = (taskId: string) => {
    console.log(`Deleting task with ID: ${taskId}`);
  };

  const toggleTaskStatus = (taskId: string) => {
    console.log(`Toggling task status for ID: ${taskId}`);
  };

  const filteredTasks = task!.filter(t => 
    filter === 'all' ? true : filter === 'completed' ? t.status === 'completed' : t.status === 'pending'
  );

  const completedTasks = task!.filter(task => task.status === 'completed').length;
  const pendingTasks = task!.filter(task => task.status === 'pending').length;
  const totalTasks = task!.length;

  const groupTasks = () => ({
    daily: filteredTasks.filter(task => task.taskType === 'daily'),
    weekly: filteredTasks.filter(task => task.taskType === 'weekly'),
    monthly: filteredTasks.filter(task => task.taskType === 'monthly'),
    oneTime: filteredTasks.filter(task => task.taskType === 'one-time')
  });

  const TaskGroup = ({ tasks, title, icon: Icon }: { tasks: Task[], title: string, icon: React.ElementType }) => (
    <div className="mb-6 lg:mb-8 bg-white rounded-xl p-4 lg:p-6 shadow-sm border border-gray-200">
      <div className="flex items-center gap-2 mb-4 lg:mb-6">
        <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-gray-700" />
        <h2 className="text-xl lg:text-2xl font-semibold text-gray-900">{title}</h2>
        <span className="ml-auto bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full text-xs lg:text-sm">
          {tasks.length} tasks
        </span>
      </div>
      <div className="grid gap-3 lg:gap-4">
        {tasks.length === 0 ? (
          <div className="text-gray-500 italic flex items-center justify-center py-6 lg:py-8 bg-gray-50 rounded-lg">
            <p>No tasks available</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="relative border border-gray-200 rounded-lg p-3 lg:p-4 hover:shadow-md transition-all duration-200 bg-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <input 
                    type="checkbox" 
                    checked={checked}
                    onChange={() => toggleTaskStatus(task._id)}
                    className="w-5 h-5 text-green-500 cursor-pointer"
                  />
                  <h3 className="text-base lg:text-lg font-medium text-gray-900">{task.taskName}</h3>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-xs lg:text-sm ${task.status === 'completed' ? 'bg-gray-100 text-gray-700' : 'bg-gray-800 text-gray-100'}`}>
                  {task.status}
                </span>
                <button 
                  onClick={() => handleDelete(task._id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                  title="Delete Task"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 mt-2 ml-8 text-sm lg:text-base">{task.taskDescription}</p>
              <div className="mt-3 lg:mt-4 ml-8 flex items-center text-xs lg:text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                Due: {new Date(task.dueDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const groupedTasks = groupTasks();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-6 lg:p-8 max-w-7xl">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6 lg:mb-8">Task Dashboard</h1>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div onClick={() => setFilter('all')} className="cursor-pointer bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <ListChecks className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-xl font-semibold text-gray-900">{totalTasks}</p>
              </div>
            </div>
            <div onClick={() => setFilter('completed')} className="cursor-pointer bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <ClipboardCheck className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-xl font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
            <div onClick={() => setFilter('pending')} className="cursor-pointer bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <ClipboardX className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-xl font-semibold text-gray-900">{pendingTasks}</p>
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
