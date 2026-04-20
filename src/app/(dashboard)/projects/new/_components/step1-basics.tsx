import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { NewProjectData } from "../types";

const programLevels = [
  { id: "certificate", label: "Certificate" },
  { id: "associate", label: "Associate Degree" },
  { id: "bachelor", label: "Bachelor's Degree" },
  { id: "master", label: "Master's Degree" },
  { id: "doctoral", label: "Doctoral Program (PhD)" },
  { id: "executive", label: "Executive Education" },
  { id: "corporate", label: "Corporate Training" },
];

export function Step1Basics() {
  const form = useFormContext<NewProjectData>();

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="projectName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Project Name</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Master's in Sustainable Finance" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="programLevel"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Program Level</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                {programLevels.map((level) => (
                  <FormItem key={level.id} className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={level.id} />
                    </FormControl>
                    <FormLabel className="font-normal">{level.label}</FormLabel>
                  </FormItem>
                ))}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="programTopic"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Program Topic</FormLabel>
            <FormControl>
              <Input placeholder="e.g., Sustainable Finance and ESG Investing" {...field} />
            </FormControl>
            <p className="text-sm text-muted-foreground">Be specific to get better results</p>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
