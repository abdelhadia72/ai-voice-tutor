"use client";

import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useSidebarStore } from "../store/sidebarStore";
import { Header } from "./custom/Header";

interface ContentWrapperProps {
  children: ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 h-[calc(100vh-4rem)] pt-16">
        <div className="fixed inset-y-16 w-[300px] lg:block hidden h-[calc(100vh-4rem)]">
          <Sidebar />
        </div>

        <div className="lg:hidden">
          <Sidebar />
        </div>

        <div
          className={`fixed inset-0 top-16 bg-black/20 backdrop-blur-sm transition-opacity lg:hidden ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden="true"
          onClick={() => useSidebarStore.getState().setSidebarOpen(false)}
        />

        <main className="flex-1 lg:ml-[300px] relative mt-0">{children}</main>
      </div>
    </div>
  );
}
