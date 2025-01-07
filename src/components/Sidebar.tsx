"use client";

import {
  Home,
  MessagesSquare,
  MessageSquareDot,
  X,
  Menu,
  ChevronLeft,
} from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";

interface SidebarProps {
  children?: ReactNode | ReactNode[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ children, isOpen, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const showBackButton = pathname !== "/";

  return (
    <>
      {showBackButton && (
        <Link
          href="/"
          className="fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </Link>
      )}

      <button
        onClick={() => onOpenChange(!isOpen)}
        className="lg:hidden fixed top-4 left-16 z-40 bg-white p-2 rounded-lg"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      <div
        className={`fixed inset-y-0 left-0 w-[300px] bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="p-6">
          {/* User Profile Section */}
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">AM</span>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Ali Mo</h3>
              <div className="text-sm text-gray-500">Level B2</div>
            </div>
          </div>

          <nav className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 px-3">Menu</div>
              <div className="space-y-1">
                <Link
                  href="/"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600"
                >
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/chat"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <MessagesSquare className="w-5 h-5" />
                  <span>interactive chat</span>
                </Link>
                <Link
                  href="/real-time?type=live"
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                >
                  <MessageSquareDot className="w-5 h-5" />
                  <span>live call</span>
                </Link>
              </div>
            </div>

            {/* Content Section */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 px-3">
                Current Progress
              </div>
              <div className="space-y-1">{children}</div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
