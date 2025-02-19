import TaskView from "@/components/Task/TaskView";
import type { Metadata } from "next";

export const metadata:Metadata = {
  title:"Task Page",
  description:"This page shows the user all the task he/she has created"
}

export default function page(){
  return(
    <TaskView/>
  )
}