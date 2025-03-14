"use client"
import { createContext,useState,useEffect } from "react";
import axios from "axios";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

interface Project {
    _id: string;
    projectName: string;
    projectDescription: string;
    owner: string;
    dueDate: string; 
    status: 'active' | 'completed';
    createdAt?: string;
    updatedAt?:string
    task?: Task[] 
}

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

interface ProjectProps {
    createProject:(projectName:string,projectDescription:string,dueDate:string) => Promise<void>;
    project:Project[] | [];
    totalProject: number | undefined;
    completedProject : number | undefined
}

const ProjectContext = createContext<ProjectProps | undefined>(undefined);

export const ProjectProvider = ({children}:{children:React.ReactNode}) => {
    const[project, setProject] = useState<Project[]>([])
    const [totalProject, setTotalProject]= useState<number>()
    const [completedProject, setCompletedProject] = useState<number>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { isAuthenticated } = useKindeBrowserClient()
    console.log(isAuthenticated)

    useEffect(() => {
        if(isAuthenticated != undefined){
            setIsLoading(true)
        }
    },[isAuthenticated])

    const createProject = async(projectName:string,projectDescription:string,dueDate:string):Promise<void> => {
        try{
            const newProject = {
                projectDescription,
                projectName,
                dueDate
            }
            const res = await axios.post('/api/project',newProject)
            console.log(res.data)
            setProject(project.concat(res.data.newProject))
            window.location.reload()
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        if(isLoading){
            const getProjectSummary = async() => {
                try{
                    const [projectRes,totalProject] = await Promise.all([
                        axios.get('/api/project/user'),
                        axios.get('/api/project/user/summary')
                    ])
                    setProject(project.concat(projectRes.data.project))
                    setTotalProject(totalProject.data.totalProjects)
                    setCompletedProject(totalProject.data.completedProjects)
                }catch(error){
                    console.error(error)
                }
            }
            getProjectSummary()
        }
    },[])
    return(
        <ProjectContext.Provider value={{
            createProject,
            project,
            totalProject,
            completedProject
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext