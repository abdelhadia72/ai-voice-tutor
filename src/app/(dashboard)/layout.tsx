"use client";

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/custom/Header";
import { OnboardingWrapper } from "@/components/OnboardingWrapper";
import { useSidebarStore } from "@/store/sidebarStore";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen } = useSidebarStore();

  return (
    <div className="flex flex-col min-h-screen">
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

        <main className="flex-1 lg:ml-[300px] relative mt-0">
          <OnboardingWrapper>{children}</OnboardingWrapper>
        </main>
      </div>
    </div>
  );
}
