"use client"
import { createContext,useState,useEffect } from "react";
import axios from "axios";

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
        const getProject = async() =>{
            try{
                const res = await axios.get('/api/project/user')
                console.log(res.data)
                setProject(project.concat(res.data.projects))
            }catch(error){
                console.error(error)
            }
        }
        async function getProjectTotal(){
            const res = await axios.get('/api/project/user/summary')
            console.log(res.data)
            setTotalProject(res.data.totalProjects)
            setCompletedProject(res.data.completedProjects)
        }
        getProjectTotal()
        getProject()
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