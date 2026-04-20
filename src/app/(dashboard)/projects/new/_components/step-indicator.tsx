import { cn } from "../../../../components/ui/utils";
import { CheckCircle2, Circle } from "lucide-react";

const steps = ["Program Basics", "Geography & Industry", "Configuration", "Review & Confirm"];

export function StepIndicator({ currentStep }: { currentStep: number }) {
  return (
    <div className="relative">
      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = currentStep === stepNumber;
          const isCompleted = currentStep > stepNumber;

          return (
            <div key={step} className="flex-1 flex items-center">
              <div className="flex flex-col items-center w-full">
                <div className="relative z-10 mb-3">
                  {isCompleted ? (
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                        isActive
                          ? "bg-gradient-to-br from-blue-600 to-blue-500 text-white shadow-lg scale-110"
                          : "bg-slate-200 text-slate-600"
                      )}
                    >
                      {stepNumber}
                    </div>
                  )}
                </div>
                <p
                  className={cn(
                    "text-xs md:text-sm text-center font-medium transition-colors duration-300",
                    isActive ? "text-blue-600 font-semibold" : isCompleted ? "text-green-600" : "text-slate-600"
                  )}
                >
                  {step}
                </p>
              </div>
              {stepNumber < steps.length && (
                <div className={cn(
                  "flex-1 h-1 mx-2 rounded-full transition-all duration-500",
                  isCompleted ? "bg-green-500" : isActive ? "bg-blue-300" : "bg-slate-200"
                )} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Layout */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="text-center">
            <h3 className="text-lg font-bold text-slate-900">Step {currentStep} of 4</h3>
            <p className="text-sm text-slate-600 mt-1">{steps[currentStep - 1]}</p>
          </div>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-300"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
        <div className="flex justify-between mt-3">
          {steps.map((_, index) => {
            const isCompleted = currentStep > index + 1;
            const isActive = currentStep === index + 1;
            return (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  isCompleted ? "bg-green-500" : isActive ? "bg-blue-600" : "bg-slate-300"
                )}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
