"use client"
import { CheckCircle, List, FolderClosed,TrophyIcon } from "lucide-react";
import axios from "axios";
import { useEffect,useState } from "react";

type User = {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  picture?: string;
  properties?:{
    job_title:string
  }
};

export default  function Profile({user}:{user:User | null}) {
    const [totalTask, setTotalTask]= useState<number>()
    const [totalProject, setTotalProject] = useState<number>()
    const [completedTask, setCompletedTask]= useState<number>()
    const [completedProject, setCompletedProject] = useState<number>()

    useEffect(() => {
      async function getTask(){
        const res = await axios.get('/api/tasks/user/summary')
        console.log(res.data)
        setTotalTask(res.data.totalTasks)
        setCompletedTask(res.data.completedTasks)
      }
      async function getProject(){
        const res = await axios.get('/api/project/user/summary')
        console.log(res.data)
        setTotalProject(res.data.totalProjects)
        setCompletedProject(res.data.completedProjects)
      }

      getProject()
      getTask()
    },[])

    return (
    <div className="flex min-h-screen p-6 flex-col items-center bg-gray-100">
      {/* Profile Section */}
      <div className="w-full max-w-4xl bg-white p-6 md:p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-center gap-6 md:gap-8 min-h-[50vh]">
        {/* Profile Image */}
        <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
          <span className="text-xl md:text-2xl">{user?.given_name?.charAt(0)}</span>
        </div>

        {/* Profile Details */}
        {user ? (
          <div className="text-center md:text-left flex-1">
            <h1 className="text-2xl md:text-3xl font-bold">{user.given_name} {user.family_name}</h1>
            <p className="text-gray-500 text-sm md:text-base">{user.email}</p>
            <div className="mt-4 space-y-2">
              <p className="text-gray-600 text-sm md:text-base">{user.properties?.job_title}</p>
              <p className="text-gray-600 text-sm md:text-base">Managing personal projects efficiently</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">No User Found</p>
        )}
      </div>

      {/* Task & Project Summary Section */}
      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard icon={<List size={32} className="text-blue-500" />} title="Total Tasks" value={totalTask} />
        <StatsCard icon={<CheckCircle size={32} className="text-green-500" />} title="Completed Tasks" value={completedTask} />
      </div>

      <div className="w-full max-w-4xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard icon={<FolderClosed size={32} className="text-blue-500" />} title="Total Projects" value={totalProject} />
        <StatsCard icon={<TrophyIcon size={32} className="text-green-500" />} title="Completed Projects" value={completedProject} />
      </div>
    </div>
  );
}

const StatsCard = ({ icon, title, value }:{icon:React.ReactNode,title:string,value:number | undefined}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center gap-4 transition-transform transform hover:scale-105">
    <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
    <div>
      <h2 className="text-lg font-bold text-gray-800">{title}</h2>
      <p className="text-gray-600 text-xl font-semibold">{value}</p>
    </div>
  </div>
);
