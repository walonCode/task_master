"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Plus,
  Menu,
  FolderClosed
} from "lucide-react";
import { RegisterLink,LoginLink,LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";



export default function Navbar({ isAuthenticated, name }:{isAuthenticated:boolean, name:string | undefined}){
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 border-b bg-white/75 backdrop-blur-sm z-50">
      <div className="container mx-auto lg:mx-20 px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-xl font-bold text-blue-900">
            TaskMaster
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Menu Button - Visible only on mobile */}
            

            { isAuthenticated ? (
              // If user is signed in
              <>
              <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Link href="/task/create">
                    <Plus className="w-5 h-5" />
                  </Link>
                </button>
                <button className="ml-2 h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center">
                  <Link href="/profile">
                    {name?.charAt(0)}
                  </Link>
                </button>
                
              </>
            ) : (
              // If user is not signed in
              <>
                <LoginLink
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Login
                </LoginLink>
                <RegisterLink
                  className="px-3 py-1 text-sm border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  Sign Up
                </RegisterLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="lg:hidden py-4 border-t">
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/task"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Tasks</span>
            </Link>
            <Link 
            href='/project'
            className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <FolderClosed className="w-4 h-4"/>
              <span>Projects</span>
            </Link>
            <Link
              href="/calendar"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Link>
           <div className="flex items-center justify-center">
           <button
                  className="px-10 py-1.5 text-sm bg-red-600 font-bold  text-white rounded-lg hover:bg-red-700"
                >
                <LogoutLink>
                  Logout
                </LogoutLink>
            </button>
           </div>
          </div>
        )}
      </div>
    </nav>
  );
};

