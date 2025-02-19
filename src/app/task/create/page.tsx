import TaskCreate from "@/components/Task/create/TaskCreate";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title:"Task Creation Page",
  description:"This is the page the user uses to create tasks"
}

export default function Page(){
  return(
    <TaskCreate/>
  )
}