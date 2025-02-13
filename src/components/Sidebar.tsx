"use client"

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  ListTodo,
  Star,
  Clock,
  ChevronDown,
  ChevronRight,
  FolderClosed,
  PanelLeftClose,
  PanelLeft,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  const pathname = usePathname();
  const [isProjectsOpen, setIsProjectsOpen] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const isActiveLink = (path: string) => pathname === path;

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className={`fixed top-4 ${
          isSidebarOpen ? 'left-64' : 'left-4'
        } z-[60] p-2 bg-white rounded-lg border shadow-sm hover:bg-gray-100 transition-all duration-300 lg:flex hidden`}
      >
        {isSidebarOpen ? (
          <PanelLeftClose className="w-5 h-5 text-gray-700" />
        ) : (
          <PanelLeft className="w-5 h-5 text-gray-700" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-[58]"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-screen pt-8 bg-white border-r transition-all duration-300 z-[50]
          ${isSidebarOpen ? 'w-[85%] sm:w-[300px] lg:w-64' : 'w-0 lg:w-[68px]'}
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          hidden lg:block
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header Section */}
          <div className="pt-1  border-b">
            <h1 className={`font-bold text-blue-950 text-center  text-xl ${!isSidebarOpen && 'md:hidden'}`}>
              TaskMaster
            </h1>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Main Navigation */}
            <nav className="pt-5 space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group hover:bg-blue-50 ${
                  isActiveLink('/dashboard')
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700'
                }`}
              >
                <LayoutDashboard className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                  isActiveLink('/dashboard') ? 'text-blue-600' : 'text-gray-500 group-hover:text-blue-600'
                }`} />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Dashboard</span>
              </Link>

              <Link
                href="/task"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActiveLink('/task')
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <CheckSquare className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>My Tasks</span>
              </Link>

              <Link
                href="/calendar"
                className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                  isActiveLink('/calendar')
                    ? 'bg-blue-50 text-blue-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Calendar className="w-5 h-5 flex-shrink-0" />
                <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Calendar</span>
              </Link>
            </nav>

            {/* Task Filters Section */}
            <div className={!isSidebarOpen ? 'md:hidden' : ''}>
              <h3 className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-6">Tasks</h3>
              <nav className="mt-2 p-2 space-y-1">
                <Link
                  href="/tasks/today"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                >
                  <Clock className="w-5 h-5 flex-shrink-0" />
                  <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Today</span>
                </Link>

                <Link
                  href="/tasks/important"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                >
                  <Star className="w-5 h-5 flex-shrink-0" />
                  <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>Important</span>
                </Link>

                <Link
                  href="/tasks/todo"
                  className="flex items-center px-3 py-2 rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                >
                  <ListTodo className="w-5 h-5 flex-shrink-0" />
                  <span className={`ml-3 ${!isSidebarOpen && 'md:hidden'}`}>To-do</span>
                </Link>
              </nav>
            </div>

            {/* Projects Section */}
            <div className={!isSidebarOpen ? 'md:hidden' : ''}>
              <button
                onClick={() => setIsProjectsOpen(!isProjectsOpen)}
                className="flex items-center justify-between w-full px-4 py-2 mt-6 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
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
                <div className="mt-1 ml-4 space-y-1">
                  <Link
                    href="/projects/website"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Website Redesign
                  </Link>
                  <Link
                    href="/projects/mobile"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Mobile App
                  </Link>
                  <Link
                    href="/projects/marketing"
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    Marketing
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* User Profile Section */}
          <div className={`mt-auto pb-5 pt-1 border-t ${!isSidebarOpen && 'md:hidden'}`}>
            <div className="flex justify-between gap-3 items-center ">
              <Link className='flex-1' href='/profile'><div className="w-8 h-8 rounded-full bg-gray-200" /></Link>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">john@example.com</p>
              </div>
              <div className='flex-1'>
                <LogOut/>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
