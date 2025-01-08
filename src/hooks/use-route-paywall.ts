"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { usePaywall } from "./use-paywall";

export function useRoutePaywall() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { checkAccess } = usePaywall();

  useEffect(() => {
    // For chat route, check if it's one of the two allowed types
    if (pathname.startsWith("/chat")) {
      const type = searchParams.get("type");
      // Only these two specific types are allowed without paywall
      if (type !== "scenario-shopping" && type !== "grammar-basic") {
        checkAccess();
      }
      return;
    }

    // Check for other routes that need paywall
    if (pathname.startsWith("/story") || pathname.startsWith("/real-time")) {
      checkAccess();
      return;
    }
  }, [pathname, searchParams, checkAccess]);
}
