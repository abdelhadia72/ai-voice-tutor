"use client";

import React from "react";

export const Header = () => {
  return (
    <header className="h-16 px-4 border-b border-gray-200 bg-white flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
            Practago
          </span>
        </div>
      </div>
    </header>
  );
};
