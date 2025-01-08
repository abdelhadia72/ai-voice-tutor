import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ProStore {
  isPro: boolean;
  setPro: (isPro: boolean) => void;
}

export const useProStore = create<ProStore>()(
  persist(
    (set) => ({
      isPro: false,
      setPro: (isPro) => set({ isPro }),
    }),
    {
      name: 'pro-status',
    }
  )
); 