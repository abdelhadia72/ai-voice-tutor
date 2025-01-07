import { create } from 'zustand';

export interface SidebarItem {
  id: string;
  title: string;
  icon?: string;
  href?: string;
  items?: SidebarItem[];
}

interface SidebarState {
  isOpen: boolean;
  items: SidebarItem[];
  currentPath: string;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  setItems: (items: SidebarItem[]) => void;
  setCurrentPath: (path: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  items: [],
  currentPath: '/',
  toggleSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
  setSidebarOpen: (isOpen: boolean) => set({ isOpen }),
  setItems: (items: SidebarItem[]) => set({ items }),
  setCurrentPath: (path: string) => set({ currentPath: path }),
}));
