"use client"
import Link from 'next/link';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar,
  Plus,
  Menu
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0  left-0 right-0 border-b bg-white/75 backdrop-blur-sm z-50">
      <div className="container mx-auto lg:mx-20 px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo/Brand */}
          <Link 
            href="/" 
            className="text-xl font-bold text-blue-900"
          >
            TaskMaster
          </Link>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Hamburger Menu Button - Visible only on mobile */}
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
            </button>
            <button className="ml-2 h-8 w-8 rounded-full bg-blue-900 text-white flex items-center justify-center">
              JD
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
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
              href="/calendar"
              className="flex items-center space-x-1 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              <span>Calendar</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
