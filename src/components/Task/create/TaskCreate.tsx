"use client";

import { useState,useContext } from "react";
import { Calendar, Flag, Layout, ListTodo, Tag, Loader2} from "lucide-react";
import { ToastContainer,toast } from "react-toastify";
import { useRouter } from "next/navigation";
import TaskContext from "@/libs/context/taskContext";

export default function TaskCreate() {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [taskType, setTaskType] = useState("");
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()
  const { createTask } = useContext(TaskContext) || {}

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true)
      const task = await createTask!(taskName,taskDescription,priority,dueDate,taskType)
      toast('task created')
      console.log(task)
      router.push('/task')
    }catch(error){
      setLoading(false)
      console.error(error)
      toast('task creation failed')
    }finally{
      setLoading(false)
    }
  };

  return (
    <div className="p-4 lg:p-6 lg:ml-64  min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-gray-600 mt-1">Fill in the details to create a new task</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <ListTodo className="w-4 h-4" />
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Layout className="w-4 h-4" />
                  Description
                </label>
                <textarea
                  id="description"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter task description"
                  required
                />
              </div>
            </div>

            {/* Task Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="taskType" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Tag className="w-4 h-4" />
                  Task Type
                </label>
                <select
                  id="taskType"
                  value={taskType}
                  onChange={(e) => setTaskType(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select task type</option>
                  <option value="daily">Daily</option>
                  <option value="monthly">Monthly</option>
                  <option value="weekly">Weekly</option>
                  <option value="one-time">One-Time</option>
                </select>
              </div>

              <div>
                <label htmlFor="priority" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Flag className="w-4 h-4" />
                  Priority
                </label>
                <select
                  id="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="dueDate" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4" />
                  Due Date
                </label>
                <input
                  type="date"
                  id="dueDate"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {loading ? <Loader2 size={20} className="animate-spin"/> : "Create task"}
            </button>
          </div>
        </form>
        <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        />
      </div>
    </div>
  );
}
