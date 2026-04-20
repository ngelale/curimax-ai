import { Button } from "../../../../components/ui/button";
import { ChevronLeft, ChevronRight, Save, CheckCircle2 } from "lucide-react";

interface StepNavigationProps {
  currentStep: number;
  onBack: () => void;
  onSaveDraft: () => void;
  isSubmitting: boolean;
}

export function StepNavigation({ currentStep, onBack, onSaveDraft, isSubmitting }: StepNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isFinalStep = currentStep === 4;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-3 pt-6 md:pt-8">
      {/* Left Side */}
      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isFirstStep || isSubmitting}
          className="gap-2 min-w-fit"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back</span>
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onSaveDraft}
          disabled={isSubmitting}
          className="gap-2"
        >
          <Save className="w-4 h-4" />
          <span className="hidden sm:inline">Save Draft</span>
        </Button>
      </div>

      {/* Right Side */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-200 min-w-fit"
      >
        {isFinalStep ? (
          <>
            <CheckCircle2 className="w-4 h-4" />
            <span className="hidden sm:inline">Create Project & Start Analysis</span>
            <span className="sm:hidden">Create Project</span>
          </>
        ) : (
          <>
            <span className="hidden sm:inline">Next</span>
            <span className="sm:hidden">Continue</span>
            <ChevronRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </div>
  );
}
