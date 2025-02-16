"use client"
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

// Define the Task type
interface Task {
    _id: string;
    taskName: string;
    taskDescription: string;
    userId: string;
    priorty: 'low' | 'medium' | 'high';
    dueDate: string; // ISO 8601 string or Date object
    taskType: 'daily' | 'weekly' | 'monthly' | 'one-time';
    status: 'pending' | 'completed';
    createdAt: string; // ISO 8601 string
    projectId?: string;
}

const TaskDetailPage = () => {
    const router = useRouter();

    // Mock task data
    const task: Task = {
        _id: '1',
        taskName: 'Task Example',
        taskDescription: 'This is a detailed description of the task. It explains what needs to be done and provides context for the user.',
        userId: '123',
        priorty: 'medium',
        dueDate: '2025-02-20T00:00:00Z',
        taskType: 'weekly',
        status: 'pending',
        createdAt: '2025-02-15T12:00:00Z',
        projectId: 'proj123',
    };

    const handleDelete = () => {
        // Handle delete logic here
        alert('Task deleted!');
    };

    const handleUpdate = () => {
        // Redirect to update page
        router.push(`/task/update/${task._id}`);
    };

    return (
        <div className="flex flex-col min-h-screen  p-4 items-center justify-center">
            <div className="p-5 bg-white flex-1">
                <div className="bg-white p-8 rounded-lg shadow-xl border border-gray-300 relative h-full">
                    <div className="absolute top-5 right-5 flex space-x-4">
                        <button onClick={handleUpdate} className="text-blue-500 hover:text-blue-700">
                            <FaEdit size={20} />
                        </button>
                        <button onClick={handleDelete} className="text-red-500 hover:text-red-700">
                            <FaTrashAlt size={20} />
                        </button>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{task.taskName}</h2>
                    <p className="text-lg text-gray-600 mt-4">{task.taskDescription}</p>

                    <div className="mt-6">
                        <div className="flex justify-between text-gray-700">
                            <div className="flex items-center space-x-2">
                                <strong>Priority:</strong>
                                <span>{task.priorty}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <strong>Status:</strong>
                                <span>{task.status}</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-gray-700 mt-4">
                            <div className="flex items-center space-x-2">
                                <strong>Due Date:</strong>
                                <span>{new Date(task.dueDate).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <strong>Task Type:</strong>
                                <span>{task.taskType}</span>
                            </div>
                        </div>

                        <div className="flex justify-between text-gray-700 mt-4">
                            <div className="flex items-center space-x-2">
                                <strong>Created At:</strong>
                                <span>{new Date(task.createdAt).toLocaleString()}</span>
                            </div>
                            {task.projectId && (
                                <div className="flex items-center space-x-2">
                                    <strong>Project ID:</strong>
                                    <span>{task.projectId}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetailPage;
