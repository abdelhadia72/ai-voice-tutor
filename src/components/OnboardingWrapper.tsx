"use client";

import { useUserPreferences } from "@/store/userPreferences";
import { Onboarding } from "./Onboarding";

export function OnboardingWrapper({ children }: { children: React.ReactNode }) {
  const { hasCompletedOnboarding } = useUserPreferences();

  return (
    <>
      {!hasCompletedOnboarding && <Onboarding />}
      {children}
    </>
  );
} 