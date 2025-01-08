"use client";

import { Home, MessagesSquare, MessageSquareDot, X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { useSidebarStore } from "../store/sidebarStore";
import { useUserPreferences } from "../store/userPreferences";
import { cn } from "@/lib/utils";

interface SidebarProps {
  children?: ReactNode;
}

export function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const { isOpen, toggleSidebar, items } = useSidebarStore();
  const { name } = useUserPreferences();

  // Get initials from name
  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="fixed top-4 right-4 z-50 lg:hidden bg-zinc-50 p-2 rounded-lg hover:bg-zinc-100"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-zinc-600" />
        ) : (
          <Menu className="w-6 h-6 text-zinc-600" />
        )}
      </button>

      <div
        className={cn(
          "h-full w-[300px] bg-zinc-100 lg:static fixed inset-y-0 left-0 z-40 transition-transform duration-200 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-zinc-200">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center">
                <span className="text-zinc-600 text-sm">{initials}</span>
              </div>
              <span className="text-sm text-zinc-600">{name || "Guest"}</span>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            <div className="space-y-1">
              <Link
                href="/"
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  pathname === "/"
                    ? "bg-teal-600 text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-200/50",
                )}
              >
                <Home className="w-4 h-4 shrink-0" />
                <span>Dashboard</span>
              </Link>
              <Link
                href="/chat"
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  pathname === "/chat"
                    ? "bg-teal-600 text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-200/50",
                )}
              >
                <MessagesSquare className="w-4 h-4 shrink-0" />
                <span>Interactive Chat</span>
              </Link>
              <Link
                href="/real-time?type=live"
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm",
                  pathname === "/real-time"
                    ? "bg-teal-600 text-zinc-50"
                    : "text-zinc-600 hover:bg-zinc-200/50",
                )}
              >
                <MessageSquareDot className="w-4 h-4 shrink-0" />
                <span>Live Call</span>
              </Link>
            </div>

            {items.length > 0 && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-zinc-500 px-3 mb-2">
                  Custom Menu
                </div>
                {items.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href || "#"}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors text-sm",
                      pathname === item.href
                        ? "bg-teal-600 text-zinc-50"
                        : "text-zinc-600 hover:bg-zinc-200/50",
                    )}
                  >
                    <span>{item.title}</span>
                  </Link>
                ))}
              </div>
            )}

            {children && (
              <div className="space-y-1">
                <div className="text-xs font-medium text-zinc-500 px-3 mb-2">
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
