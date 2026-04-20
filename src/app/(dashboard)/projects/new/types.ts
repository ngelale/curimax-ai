import { z } from "zod";

export const step1Schema = z.object({
  projectName: z.string().min(3, "Project name must be 3-200 characters").max(200, "Project name must be 3-200 characters"),
  programLevel: z.enum(["certificate", "associate", "bachelor", "master", "doctoral", "executive", "corporate"]),
  programTopic: z.string().min(1, "Program topic is required"),
});

export const step2Schema = z.object({
  targetRegions: z.array(z.string()).min(1, "At least one target region is required"),
  industrySectors: z.array(z.string()).optional(),
});

export const step3Schema = z.object({
  isRefresh: z.boolean(),
  existingProgramUrl: z.string().optional(),
  deliveryFormat: z.enum(["online", "hybrid", "in-person", "no-preference"]),
  duration: z.number().min(4).max(208),
  noPreferenceDuration: z.boolean(),
  specialConsiderations: z.string().max(500, "Cannot exceed 500 characters").optional(),
});

export const newProjectSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export type NewProjectData = z.infer<typeof newProjectSchema>;
