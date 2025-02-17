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
    createdAt?: Date;
    updatedAt?:Date
    task?: Task[] 
}

interface Task {
    _id: string;
    taskName: string;
    taskDescription: string;
    userId: string;
    priorty: 'low' | 'medium' | 'high';
    dueDate: Date; 
    taskType: 'daily' | 'weekly' | 'monthly' | 'one-time';
    status: 'pending' | 'completed';
    createdAt: Date;
    projectId?: string; 
}

interface ProjectProps {
    createProject:(projectName:string,projectDescription:string,dueDate:string) => Promise<void>;
    project:Project[]
}

const ProjectContext = createContext<ProjectProps | undefined>(undefined);

export const ProjectProvider = ({children}:{children:React.ReactNode}) => {
    const[project, setProject] = useState<Project[]>([])

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
        getProject()
    },[])
    return(
        <ProjectContext.Provider value={{
            createProject,
            project
        }}>
            {children}
        </ProjectContext.Provider>
    )
}

export default ProjectContext