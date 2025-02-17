"use client";

import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Plus,
  Menu,
  FolderClosed,
  LogIn,
  UserPlus,
  LogOut
} from "lucide-react";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function Navbar({ isAuthenticated, name }: { isAuthenticated: boolean; name: string | undefined }) {
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
            {isAuthenticated ? (
              <>
                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <Menu className="w-5 h-5" />
                </button>

                {/* Create Task Button */}
                <Button variant="outline" size="icon" asChild>
                  <Link href="/task/create">
                    <Plus className="w-5 h-5" />
                  </Link>
                </Button>

                {/* Profile Button */}
                <Button variant="secondary" className="ml-2 h-8 w-8 rounded-full">
                  <Link href="/profile" className="text-black font-bold">
                    {name?.charAt(0).toUpperCase()}
                  </Link>
                </Button>
              </>
            ) : (
              <>
                <LoginLink>
                  <Button variant="outline" className="flex items-center gap-2">
                    <LogIn className="w-4 h-4" /> Login
                  </Button>
                </LoginLink>
                <RegisterLink>
                  <Button variant="default" className="flex items-center gap-2">
                    <UserPlus className="w-4 h-4" /> Sign Up
                  </Button>
                </RegisterLink>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && isAuthenticated && (
          <div className="lg:hidden py-4 border-t">
            <Link href="/dashboard" className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
            <Link href="/task" className="flex items-center gap-2">
              <CheckSquare className="w-4 h-4" /> Tasks
            </Link>
            <Link href="/project" className="flex items-center gap-2">
              <FolderClosed className="w-4 h-4" /> Projects
            </Link>
            <Link href="/calendar" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Calendar
            </Link>
            <div className="flex items-center justify-center mt-4">
              <LogoutLink>
                <Button variant="destructive" className="flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Logout
                </Button>
              </LogoutLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
