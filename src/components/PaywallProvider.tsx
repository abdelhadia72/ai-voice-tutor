"use client";
import { useRoutePaywall } from "@/hooks/use-route-paywall";
import { usePaywall } from "@/hooks/use-paywall";
import { PaywallModal } from "./PaywallModal";

interface PaywallProviderProps {
  children: React.ReactNode;
}

export function PaywallProvider({ children }: PaywallProviderProps) {
  const { showPaywall, closePaywall } = usePaywall();
  useRoutePaywall();

  return (
    <>
      {showPaywall && <PaywallModal onClose={closePaywall} />}
      {children}
    </>
  );
} 