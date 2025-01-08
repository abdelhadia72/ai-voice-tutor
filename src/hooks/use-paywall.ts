"use client";
import { useState } from "react";
import { useProStore } from "@/store/proStore";

export function usePaywall() {
  const { isPro } = useProStore();
  const [showPaywall, setShowPaywall] = useState(false);

  const checkAccess = () => {
    if (!isPro) {
      setShowPaywall(true);
      return false;
    }
    return true;
  };

  const closePaywall = () => {
    setShowPaywall(false);
  };

  return {
    isPro,
    showPaywall,
    checkAccess,
    closePaywall,
  };
}
