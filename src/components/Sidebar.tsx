"use client";

import { FC, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import {
  LayoutDashboard,
  CheckSquare,
  ListTodo,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  FolderClosed,
  PanelLeftClose,
  PanelLeft,
  LogOut,
  User,
} from "lucide-react";
import Image from "next/image";

type User = {
  id: string;
  given_name: string;
  family_name: string;
  email: string;
  picture?: string; // Profile image (optional)
};

const SidebarLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  label: string;
  icon: FC<{ className?: string }>;
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center px-4 py-2 rounded-lg transition-all duration-300 group ${
        isActive ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="ml-3">{label}</span>
    </Link>
  );
};

const Sidebar = ({
  isAuthenticated,
  user,
}: {
  isAuthenticated: boolean;
  user: User | null;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hidden lg:block"
      >
        {isSidebarOpen ? (
          <PanelLeftClose className="w-5 h-5" />
        ) : (
          <PanelLeft className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      {isSidebarOpen && isAuthenticated && (
        <aside
          className={`fixed top-0 left-0 h-screen bg-white border-r transition-all duration-300 z-40 lg:block hidden
         ${isSidebarOpen ? "w-64" : "w-0"}`}
        >
          <div className="flex flex-col h-full p-4">
            {/* Logo/Header */}
            <div className="flex justify-between items-center border-b pb-3">
              <h1 className="text-xl font-bold text-blue-900">TaskMaster</h1>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="mt-4 space-y-2">
              <SidebarLink
                href="/dashboard"
                icon={LayoutDashboard}
                label="Dashboard"
              />
              <SidebarLink href="/task" icon={CheckSquare} label="My Tasks" />
              <SidebarLink href="/project" icon={FolderClosed} label="Projects" />
            </nav>

            {/* Task Filters */}
            <div className="mt-6">
              <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase">
                Tasks
              </h3>
              <nav className="mt-2 space-y-1">
                <SidebarLink href="/tasks/today" icon={Clock} label="Today" />
                <SidebarLink
                  href="/tasks/important"
                  icon={Star}
                  label="Important"
                />
                <SidebarLink href="/tasks/todo" icon={ListTodo} label="To-do" />
              </nav>
            </div>

            {/* Projects Section */}
            <div className="mt-6">
              <button
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                <div className="flex items-center">
                  <FolderClosed className="w-5 h-5 text-gray-500" />
                  <span className="ml-3">Projects</span>
                </div>
                {isProjectsOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              {isProjectsOpen && (
                <div className="mt-2 pl-6 space-y-1">
                  <SidebarLink
                    href="/projects/website"
                    icon={FolderClosed}
                    label="Website Redesign"
                  />
                  <SidebarLink
                    href="/projects/mobile"
                    icon={FolderClosed}
                    label="Mobile App"
                  />
                  <SidebarLink
                    href="/projects/marketing"
                    icon={FolderClosed}
                    label="Marketing"
                  />
                </div>
              )}
            </div>

            {/* User Profile & Logout */}
            <div className="mt-auto pt-4 border-t flex items-center justify-between px-4">
              {user ? (
                <div className="flex items-center space-x-3 w-full">
                  {/* Profile Picture or Icon */}
                  <Link href="/profile">
                    {user.picture ? (
                      <Image
                        src={user.picture}
                        alt="Profile"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="w-8 h-8 text-gray-600 shrink-0" />
                    )}
                  </Link>

                  {/* User Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {user.given_name} {user.family_name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {user.email}
                    </p>
                  </div>

                  {/* Logout Button */}
                  <LogoutLink>
                    <button className="flex items-center text-red-600 hover:bg-red-50 rounded-lg p-2">
                      <LogOut className="w-5 h-5" />
                    </button>
                  </LogoutLink>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No user found</p>
              )}
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
