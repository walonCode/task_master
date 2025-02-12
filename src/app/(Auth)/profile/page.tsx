
import { CheckCircle, List, ClipboardCheck } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen p-6 flex-col items-center bg-gray-100">
      {/* Profile Section */}
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center gap-8 min-h-[50vh]">
        {/* Profile Image */}
        <div className="w-32 h-32 lg:w-40 lg:h-40 bg-gray-300 rounded-full"></div>

        {/* Profile Details */}
        <div className="text-center lg:text-left flex-1">
          <h1 className="text-3xl font-bold">John Doe</h1>
          <p className="text-gray-500">johndoe@example.com</p>
          <div className="mt-4 space-y-2">
            <p className="text-gray-600">Task Manager | Productivity Enthusiast</p>
            <p className="text-gray-600">Keeping track of daily, weekly, and monthly tasks</p>
          </div>
        </div>
      </div>

      {/* Task Summary Section */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Total Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <List size={32} className="text-blue-500" />
          <div>
            <h2 className="text-xl font-bold">Total Tasks</h2>
            <p className="text-gray-600">35</p>
          </div>
        </div>

        {/* Completed Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <CheckCircle size={32} className="text-green-500" />
          <div>
            <h2 className="text-xl font-bold">Completed</h2>
            <p className="text-gray-600">20</p>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center gap-4">
          <ClipboardCheck size={32} className="text-yellow-500" />
          <div>
            <h2 className="text-xl font-bold">Pending</h2>
            <p className="text-gray-600">15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
