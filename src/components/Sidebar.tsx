"use client";

import { Home, BookOpen, Settings, X, Menu } from "lucide-react";

interface Story {
  id: number;
  title: string;
  description: string;
  progress: number;
  isActive: boolean;
}

interface SidebarProps {
  stories: Story[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function Sidebar({ stories, isOpen, onOpenChange }: SidebarProps) {
  return (
    <>
      <button
        onClick={() => onOpenChange(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-40 bg-white p-2 rounded-lg"
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
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-gray-800">
              Learning Journey
            </h2>
          </div>

          <nav className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 px-3">Menu</div>
              <div className="space-y-1">
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-blue-50 text-blue-600">
                  <Home className="w-5 h-5" />
                  <span>Dashboard</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                  <BookOpen className="w-5 h-5" />
                  <span>My Stories</span>
                </button>
                <button className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50">
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-gray-500 px-3">
                Stories
              </div>
              <div className="space-y-1">
                {stories.map((story) => (
                  <button
                    key={story.id}
                    className={`w-full px-3 py-2 rounded-lg text-left ${
                      story.isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{story.title}</span>
                      {story.progress > 0 && (
                        <span className="text-sm">{story.progress}%</span>
                      )}
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1">
                      <div
                        className="bg-blue-500 h-1 rounded-full"
                        style={{ width: `${story.progress}%` }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
