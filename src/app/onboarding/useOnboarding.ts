"use client";

import { useState, useEffect, ReactNode } from "react";
import { OnboardingState } from "./types";

interface OnboardingContextType {
  state: OnboardingState;
  completeOnboarding: () => void;
  skipOnboarding: () => void;
  dismissProductTips: () => void;
  showOnboarding: boolean;
  showProductTips: boolean;
}

const DEFAULT_STATE: OnboardingState = {
  currentStep: 1,
  completed: false,
  skipped: false,
  dismissedTips: false,
};

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("onboarding-state");
    if (saved) {
      setState(JSON.parse(saved));
    }
    setMounted(true);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("onboarding-state", JSON.stringify(state));
    }
  }, [state, mounted]);

  const completeOnboarding = () => {
    setState({
      ...state,
      completed: true,
      currentStep: 5,
    });
  };

  const skipOnboarding = () => {
    setState({
      ...state,
      completed: true,
      skipped: true,
      currentStep: 1,
    });
  };

  const dismissProductTips = () => {
    setState({
      ...state,
      dismissedTips: true,
    });
  };

  return {
    state,
    completeOnboarding,
    skipOnboarding,
    dismissProductTips,
    showOnboarding: !state.completed && !state.skipped,
    showProductTips: state.completed && !state.dismissedTips,
  };
}
