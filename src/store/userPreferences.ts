import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  name: string;
  nativeLanguage: string;
  targetLanguage: string;
  hasCompletedOnboarding: boolean;
  setPreferences: (preferences: Partial<UserPreferences>) => void;
}

export const useUserPreferences = create<UserPreferences>()(
  persist(
    (set) => ({
      name: '',
      nativeLanguage: '',
      targetLanguage: '',
      hasCompletedOnboarding: false,
      setPreferences: (preferences) => set((state) => ({ ...state, ...preferences })),
    }),
    {
      name: 'user-preferences',
    }
  )
); 