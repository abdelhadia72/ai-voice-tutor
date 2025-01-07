"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useSidebarStore } from "../store/sidebarStore";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex">
      <div className="fixed inset-y-0 w-[300px] lg:block hidden">
        <Sidebar />
      </div>

      <div className="lg:hidden">
        <Sidebar />
      </div>

      <div
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => useSidebarStore.getState().setSidebarOpen(false)}
      />

      <main className="min-h-screen flex-1 lg:ml-[300px]">{children}</main>
    </div>
  );
}
