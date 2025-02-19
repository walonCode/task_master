import ProjectView from "@/components/Project/ProjectView";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title: "Project Page",
  description: "This display's all the project created by the user"
}

export default function ProjectPage(){
  return(
    <ProjectView/>
  )
}