export interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  graphic?: string;
  content: string;
  buttons: {
    back?: boolean;
    skip?: boolean;
    next?: boolean;
    action?: boolean;
  };
  actionLabel?: string;
}

export interface ProductTip {
  id: number;
  title: string;
  description: string;
  targetElement: string;
  position: "top" | "bottom" | "left" | "right";
  action?: string;
}

export interface OnboardingState {
  currentStep: number;
  completed: boolean;
  skipped: boolean;
  dismissedTips: boolean;
}
