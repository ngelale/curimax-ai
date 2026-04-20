import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { Checkbox } from "../../../../components/ui/checkbox";
import { Button } from "../../../../components/ui/button";
import { MultiSelect } from "./multi-select";
import { NewProjectData } from "../types";

const regions = [
  { value: "us-all", label: "Select all US" },
  { value: "us-ca", label: "California, US" },
  { value: "us-ny", label: "New York, US" },
  { value: "gb-lon", label: "London, UK" },
  { value: "jp-tok", label: "Tokyo, JP" },
];

const industries = [
  "Technology", "Healthcare", "Finance", 
  "Energy", "Education", "Manufacturing",
  "Retail", "Real Estate", "Government"
];

export function Step2GeoIndustry() {
  const form = useFormContext<NewProjectData>();

  const handleSelectAllIndustries = () => {
    form.setValue("industrySectors", industries);
  };

  const handleClearAllIndustries = () => {
    form.setValue("industrySectors", []);
  };

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="targetRegions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Regions</FormLabel>
            <FormControl>
              <MultiSelect 
                options={regions}
                selected={field.value || []}
                onChange={field.onChange}
                placeholder="Select target regions..."
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="industrySectors"
        render={() => (
          <FormItem>
            <div className="mb-4">
              <FormLabel>Industry Sectors (optional)</FormLabel>
              <div className="flex items-center gap-2 mt-2">
                <Button type="button" variant="outline" size="sm" onClick={handleSelectAllIndustries}>Select all</Button>
                <Button type="button" variant="outline" size="sm" onClick={handleClearAllIndustries}>Clear all</Button>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {industries.map((item) => (
                <FormField
                  key={item}
                  control={form.control}
                  name="industrySectors"
                  render={({ field }) => {
                    return (
                      <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...(field.value || []), item])
                                : field.onChange(field.value?.filter((value) => value !== item));
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">{item}</FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
