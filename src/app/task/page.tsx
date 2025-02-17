'use client'

import React, { useState } from 'react'
import { CalendarDays, Clock, CheckCircle2, AlertCircle, ListChecks, ClipboardCheck, ClipboardX, } from 'lucide-react'

interface Task {
  id: number
  title: string
  description: string
  status: 'pending' | 'completed'
  dueDate: string
  priority: 'low' | 'medium' | 'high'
  type: 'one-time' | 'recurring'
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Team Stand-up Meeting',
    description: 'Daily scrum meeting with the development team',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: 'high',
    type: 'recurring'
  },
  {
    id: 2,
    title: 'Review Sprint Backlog',
    description: 'Review and prioritize tasks for the upcoming sprint',
    status: 'pending',
    dueDate: new Date().toISOString().split('T')[0], // Today
    priority: 'medium',
    type: 'recurring'
  },
  {
    id: 3,
    title: 'Client Presentation',
    description: 'Present project progress to the client',
    status: 'pending',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 3 days from now
    priority: 'high',
    type: 'recurring'
  },
  {
    id: 4,
    title: 'Code Review',
    description: 'Review pull requests for the authentication feature',
    status: 'completed',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 5 days from now
    priority: 'medium',
    type: 'recurring'
  },
  {
    id: 5,
    title: 'Monthly Report',
    description: 'Prepare and submit monthly progress report',
    status: 'pending',
    dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 15 days from now
    priority: 'high',
    type: 'recurring'
  },
  {
    id: 6,
    title: 'Team Building Event',
    description: 'Organize virtual team building activity',
    status: 'pending',
    dueDate: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 20 days from now
    priority: 'low',
    type: 'recurring'
  }
]

export default function TaskPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks)
  const completedTasks = tasks.filter(task => task.status === 'completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'pending').length;
  const totalTasks = tasks.length;

  const groupTasks = () => {
    const today = new Date()
    const nextWeek = new Date(today)
    nextWeek.setDate(today.getDate() + 7)
    const nextMonth = new Date(today)
    nextMonth.setMonth(today.getMonth() + 1)

    const oneTimeTasks = tasks.filter(task => task.type === 'one-time')
    const recurringTasks = tasks.filter(task => task.type === 'recurring')

    return {
      oneTime: oneTimeTasks,
      daily: recurringTasks.filter(task => {
        const dueDate = new Date(task.dueDate)
        return dueDate.toDateString() === today.toDateString()
      }),
      weekly: recurringTasks.filter(task => {
        const dueDate = new Date(task.dueDate)
        return dueDate > today && dueDate <= nextWeek
      }),
      monthly: recurringTasks.filter(task => {
        const dueDate = new Date(task.dueDate)
        return dueDate > nextWeek && dueDate <= nextMonth
      }),
      future: recurringTasks.filter(task => {
        const dueDate = new Date(task.dueDate)
        return dueDate > nextMonth
      })
    }
  }

  const TaskGroup = ({ tasks, title, icon: Icon }: { tasks: Task[], title: string, icon: React.FC }) => (
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
            <p>No tasks scheduled</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="relative border border-gray-200 rounded-lg p-3 lg:p-4 hover:shadow-md transition-all duration-200 bg-white"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-gray-600" />
                  ) : (
                    <AlertCircle className={`w-5 h-5 ${
                      task.priority === 'high' ? 'text-red-500' :
                      task.priority === 'medium' ? 'text-yellow-500' :
                      'text-green-500'
                    }`} />
                  )}
                  <h3 className="text-base lg:text-lg font-medium text-gray-900">{task.title}</h3>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-xs lg:text-sm ${
                    task.status === 'completed'
                      ? 'bg-gray-100 text-gray-700'
                      : 'bg-gray-800 text-gray-100'
                  }`}
                >
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 mt-2 ml-8 text-sm lg:text-base">{task.description}</p>
              <div className="mt-3 lg:mt-4 ml-8 flex items-center text-xs lg:text-sm text-gray-500">
                <Clock className="w-4 h-4 mr-1" />
                Due: {new Date(task.dueDate).toLocaleDateString('en-US', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const groupedTasks = groupTasks()

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="lg:pl-64">
        <div className="container mx-auto px-4 py-6 lg:p-8 max-w-7xl">
          <div className="flex items-center justify-between mb-6 lg:mb-8 flex-wrap gap-4">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Task Dashboard</h1>
            <div className="w-full sm:w-auto flex items-center gap-4 text-sm text-gray-600 justify-between sm:justify-start">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <span>High Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span>Medium Priority</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Low Priority</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <ListChecks className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-600 text-sm">Total Tasks</p>
                <p className="text-xl font-semibold text-gray-900">{totalTasks}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <ClipboardCheck className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-xl font-semibold text-gray-900">{completedTasks}</p>
              </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow flex items-center gap-4">
              <ClipboardX className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-gray-600 text-sm">Pending</p>
                <p className="text-xl font-semibold text-gray-900">{pendingTasks}</p>
              </div>
            </div>
          </div>
          
          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            <TaskGroup tasks={groupedTasks.oneTime} title="One-Time Tasks" icon={CalendarDays} />
            <TaskGroup tasks={groupedTasks.daily} title="Due Today" icon={CalendarDays} />
            <TaskGroup tasks={groupedTasks.weekly} title="Due This Week" icon={Clock} />
            <TaskGroup tasks={groupedTasks.monthly} title="Due This Month" icon={CalendarDays} />
            <TaskGroup tasks={groupedTasks.future} title="Future Tasks" icon={CalendarDays} />
          </div>
        </div>
      </div>
    </div>
  )
}
