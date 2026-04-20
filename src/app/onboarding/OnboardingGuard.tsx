// Layout wrapper component for onboarding
// Add this to your root layout if you want auto-show on login

"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useOnboarding } from "./useOnboarding";

export function OnboardingGuard() {
  const router = useRouter();
  const pathname = usePathname();
  const { showOnboarding } = useOnboarding();

  useEffect(() => {
    // Don't redirect if already on onboarding page
    if (pathname === "/onboarding") return;

    // Redirect to onboarding if not completed
    if (showOnboarding && pathname !== "/login" && pathname !== "/register") {
      router.push("/onboarding");
    }
  }, [showOnboarding, pathname, router]);

  return null;
}
