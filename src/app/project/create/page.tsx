import ProjectCreate from "@/components/Project/create/ProjectCreate";
import type { Metadata } from "next";


export const metadat:Metadata = {
  title: "Project Creation",
  description: "This is the page the user uses to create projects"
}

export default function page(){
  return(
    <ProjectCreate/>
  )
}