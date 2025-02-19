import ProjectDetail from "@/components/Project/dyanmic/ProjectDetail";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title:"Project Detail Page",
  description: "This page show the detail on any of the project clicked on"
}

export default function Page(){
  return(
    <ProjectDetail/>
  )
}