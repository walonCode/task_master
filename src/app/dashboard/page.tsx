import Dashboard from "@/components/Dashboard";
import type { Metadata } from "next";

export const metadata:Metadata =  {
  title:"Dashboard Page",
  description: "This is the user dashboard page"
}

export default function DashboardPage(){
  return(
    <Dashboard/>
  )
}