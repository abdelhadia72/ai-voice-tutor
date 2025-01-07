"use client";

import { Home, MessagesSquare, MessageSquareDot, X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { useSidebarStore } from "../store/sidebarStore";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, toggleSidebar, items } = useSidebarStore();

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-md hover:bg-gray-50">
        {isOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      <div
        className={cn(
          "h-full w-[300px] bg-white border-r border-gray-200 lg:static fixed inset-y-0 left-0 z-40 transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
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
          </div>

          <nav className="flex-1 overflow-y-auto p-6 space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 px-3">Menu</div>
              <div className="space-y-1">
                <Link
                  href="/"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  )}>
                  <Home className="w-5 h-5 shrink-0" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  href="/chat"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/chat"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  )}>
                  <MessagesSquare className="w-5 h-5 shrink-0" />
                  <span>Interactive Chat</span>
                </Link>
                <Link
                  href="/real-time?type=live"
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    pathname === "/real-time"
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50"
                  )}>
                  <MessageSquareDot className="w-5 h-5 shrink-0" />
                  <span>Live Call</span>
                </Link>
              </div>
            </div>

            {items.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 px-3">
                  Custom Menu
                </div>
                <div className="space-y-1">
                  {items.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href || "#"}
                      className={cn(
                        "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                        pathname === item.href
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-600 hover:bg-gray-50"
                      )}>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {children && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-500 px-3">
                  Current Progress
                </div>
                <div className="space-y-1">{children}</div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
