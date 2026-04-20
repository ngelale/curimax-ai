"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { newProjectSchema, NewProjectData, step1Schema, step2Schema, step3Schema } from "./types";

import { StepIndicator } from "./_components/step-indicator";
import { StepNavigation } from "./_components/step-navigation";
import { Step1Basics } from "./_components/step1-basics";
import { Step2GeoIndustry } from "./_components/step2-geo-industry";
import { Step3Config } from "./_components/step3-config";
import { Step4Review } from "./_components/step4-review";
import { ArrowRight } from "lucide-react";

const stepSchemas = [step1Schema, step2Schema, step3Schema];

export default function NewProjectPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  const methods = useForm<NewProjectData>({
    resolver: zodResolver(newProjectSchema),
    defaultValues: {
      projectName: "",
      programLevel: "bachelor",
      programTopic: "",
      targetRegions: [],
      industrySectors: [],
      isRefresh: false,
      existingProgramUrl: "",
      deliveryFormat: "no-preference",
      duration: 48,
      noPreferenceDuration: false,
      specialConsiderations: "",
    },
  });

  const { formState: { isSubmitting } } = methods;

  const processStep = async () => {
    const schema = stepSchemas[currentStep - 1];
    const result = await methods.trigger(Object.keys(schema.shape) as any);
    if (result) {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      } else {
        await methods.handleSubmit(onSubmit)();
      }
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  const handleSaveDraft = async () => {
    const data = methods.getValues();
    toast.info("Saving draft...");
    console.log("Draft saved:", data);
    // Mock API call for saving draft
    await new Promise(res => setTimeout(res, 500));
    toast.success("Draft saved successfully!");
    router.push("/dashboard/projects");
  };

  const onSubmit = async (data: NewProjectData) => {
    try {
      const res = await fetch("/api/projects/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const result = await res.json();
      toast.success("Project created successfully!");
      router.push(`/dashboard/projects/${result.projectId}?tab=evidence`);
    } catch (err) {
      toast.error("Failed to create project. Please try again.");
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1Basics />;
      case 2: return <Step2GeoIndustry />;
      case 3: return <Step3Config />;
      case 4: return <Step4Review onEdit={setCurrentStep} />;
      default: return <Step1Basics />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 md:py-12">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-1 w-10 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Create New Project</h1>
          </div>
          <p className="text-gray-600 text-lg">
            Analyze market demand and skills trends in just a few steps
          </p>
        </div>

        {/* Step Indicator */}
        <div className="mb-8 md:mb-12">
          <StepIndicator currentStep={currentStep} />
        </div>

        {/* Form Container */}
        <FormProvider {...methods}>
          <form onSubmit={(e) => { e.preventDefault(); processStep(); }} className="space-y-8">
            {/* Step Content */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
              <div className="p-6 md:p-8 animate-in fade-in-50 duration-300">
                {renderStep()}
              </div>
            </div>

            {/* Navigation */}
            <StepNavigation 
              currentStep={currentStep} 
              onBack={handleBack} 
              onSaveDraft={handleSaveDraft}
              isSubmitting={isSubmitting}
            />
          </form>
        </FormProvider>

        {/* Help Text */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <span className="font-semibold">💡 Tip:</span> You can save your progress at any time and come back to finish later.
          </p>
        </div>
      </div>
    </div>
  );
}
