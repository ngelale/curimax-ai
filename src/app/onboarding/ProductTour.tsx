"use client";

import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { productTips } from "./mock-data";
import { Button } from "@/app/components/ui/button";
import { Checkbox } from "@/app/components/ui/checkbox";

interface ProductTourProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProductTour({ isOpen, onClose }: ProductTourProps) {
  const [currentTip, setCurrentTip] = useState(0);
  const [dismissTips, setDismissTips] = useState(false);

  if (!isOpen) return null;

  const tip = productTips[currentTip];

  const handleNext = () => {
    if (currentTip < productTips.length - 1) {
      setCurrentTip(currentTip + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentTip > 0) {
      setCurrentTip(currentTip - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  return (
    <>
      {/* Dark Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        onClick={handleSkip}
      />

      {/* Spotlight on Target Element */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <svg className="w-full h-full">
          <defs>
            <mask id="spotlight-mask">
              <rect width="100%" height="100%" fill="white" />
              <circle
                cx="50%"
                cy="50%"
                r="50"
                fill="black"
              />
            </mask>
          </defs>
          <rect
            width="100%"
            height="100%"
            fill="black"
            fillOpacity="0.5"
            mask="url(#spotlight-mask)"
          />
        </svg>
      </div>

      {/* Tooltip */}
      <div
        className="fixed z-50 bg-white rounded-lg shadow-2xl p-6 max-w-sm w-full mx-4"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tip Number */}
        <div className="text-sm font-semibold text-blue-600 mb-2">
          Tip {currentTip + 1} of {productTips.length}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-2">{tip.title}</h3>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {tip.description}
        </p>

        {/* Progress Bar */}
        <div className="h-1 bg-gray-200 rounded-full mb-6 overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{
              width: `${((currentTip + 1) / productTips.length) * 100}%`,
            }}
          />
        </div>

        {/* Options */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={dismissTips}
              onCheckedChange={(checked) =>
                setDismissTips(checked as boolean)
              }
            />
            <span className="text-sm text-muted-foreground">
              Don't show these tips again
            </span>
          </label>

          {/* Action Buttons */}
          <div className="flex gap-2 justify-between">
            <div className="flex gap-2">
              {currentTip > 0 && (
                <Button
                  onClick={handlePrev}
                  variant="outline"
                  size="sm"
                  className="gap-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
              )}
              <Button
                onClick={handleSkip}
                variant="ghost"
                size="sm"
              >
                Skip tour
              </Button>
            </div>
            <Button
              onClick={handleNext}
              className="bg-blue-600 hover:bg-blue-700 gap-1"
              size="sm"
            >
              {currentTip === productTips.length - 1 ? "Done" : "Next"}
              {currentTip < productTips.length - 1 && (
                <ChevronRight className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Arrow Pointer */}
        <div
          className="absolute w-4 h-4 bg-white transform rotate-45"
          style={{
            top: "-8px",
            left: "50%",
            marginLeft: "-8px",
          }}
        />
      </div>
    </>
  );
}
