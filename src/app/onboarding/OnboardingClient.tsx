"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { onboardingSteps, productTips } from "./mock-data";
import { Button } from "@/app/components/ui/button";

export default function OnboardingClient() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showCompletion, setShowCompletion] = useState(false);
  const [showProductTour, setShowProductTour] = useState(false);

  const step = onboardingSteps.find((s) => s.id === currentStep);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowCompletion(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    setShowCompletion(true);
  };

  const handleStartTour = () => {
    setShowProductTour(true);
  };

  const handleCompleteOnboarding = () => {
    window.location.href = "/";
  };

  if (showCompletion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center space-y-8">
          <div className="text-6xl">🎉</div>

          <div>
            <h1 className="text-4xl font-bold mb-2">You're All Set!</h1>
            <p className="text-xl text-muted-foreground">
              Onboarding Complete
            </p>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              ✨ Badge Unlocked: Onboarding Complete!
            </div>
            <p className="text-muted-foreground">
              You now understand the core features of Curimax. Ready to dive in?
            </p>
          </div>

          <div className="space-y-3">
            <p className="font-semibold text-lg">Ready to create your first project?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={handleStartTour}
                variant="outline"
                className="sm:w-auto"
              >
                Interactive Tour
              </Button>
              <Button
                onClick={handleCompleteOnboarding}
                className="bg-blue-600 hover:bg-blue-700 sm:w-auto"
              >
                Start Using Curimax
              </Button>
            </div>
            <button
              onClick={handleCompleteOnboarding}
              className="block w-full sm:w-auto text-muted-foreground hover:text-foreground text-sm"
            >
              I'll explore first
            </button>
          </div>

          <div className="pt-4 border-t text-sm text-muted-foreground">
            <p>Need help? Visit our <a href="/help" className="text-blue-600 hover:underline">Help Center</a> anytime</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Step Indicator */}
        <div className="flex items-center justify-between px-8 py-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div>
            <h1 className="text-3xl font-bold">{step?.title}</h1>
            <p className="text-muted-foreground mt-1">{step?.description}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-blue-600">
              Step {currentStep} of {onboardingSteps.length}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-2 bg-gray-200">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-300"
            style={{
              width: `${(currentStep / onboardingSteps.length) * 100}%`,
            }}
          />
        </div>

        {/* Content */}
        <div className="p-8 md:p-12 space-y-8">
          {/* Graphic Placeholder */}
          <div className="h-64 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center overflow-hidden">
            <div className="text-center">
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="text-6xl">🚀</div>
                  <p className="text-lg font-semibold text-blue-900">
                    Welcome to Curimax
                  </p>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="text-6xl">📋</div>
                  <p className="text-lg font-semibold text-blue-900">
                    Guided Intake Wizard
                  </p>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <div className="text-6xl">🤖</div>
                  <p className="text-lg font-semibold text-blue-900">
                    AI-Powered Analysis
                  </p>
                </div>
              )}
              {currentStep === 4 && (
                <div className="space-y-4">
                  <div className="text-6xl">📊</div>
                  <p className="text-lg font-semibold text-blue-900">
                    Financial Modeling
                  </p>
                </div>
              )}
              {currentStep === 5 && (
                <div className="space-y-4">
                  <div className="text-6xl">📄</div>
                  <p className="text-lg font-semibold text-blue-900">
                    Professional Reports
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4">
            {step?.content.split("\n").map((paragraph, idx) => (
              <p
                key={idx}
                className={
                  paragraph.startsWith("•") ||
                  paragraph.startsWith("✓")
                    ? "text-muted-foreground ml-4 flex items-start gap-2"
                    : paragraph.startsWith("**")
                    ? "font-semibold text-foreground"
                    : "text-muted-foreground leading-relaxed"
                }
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Step Indicators */}
          <div className="flex justify-center gap-2">
            {onboardingSteps.map((s) => (
              <div
                key={s.id}
                className={`w-3 h-3 rounded-full transition-all ${
                  s.id === currentStep
                    ? "bg-blue-600 w-8"
                    : s.id < currentStep
                    ? "bg-blue-600"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 py-6 border-t bg-gray-50">
          <div className="space-y-1">
            {step?.buttons.skip && (
              <button
                onClick={handleSkip}
                className="text-sm text-muted-foreground hover:text-foreground font-medium"
              >
                Skip tour
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {step?.buttons.back && (
              <Button
                onClick={handleBack}
                variant="outline"
                className="gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </Button>
            )}

            {step?.buttons.next && (
              <Button
                onClick={handleNext}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}

            {step?.buttons.action && (
              <Button
                onClick={handleNext}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {step.actionLabel || "Continue"}
                <ChevronRight className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
