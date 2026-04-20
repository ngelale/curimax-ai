import { useFormContext } from "react-hook-form";
import { Input } from "../../../../components/ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../../components/ui/form";
import { RadioGroup, RadioGroupItem } from "../../../../components/ui/radio-group";
import { Slider } from "../../../../components/ui/slider";
import { Switch } from "../../../../components/ui/switch";
import { Textarea } from "../../../../components/ui/textarea";
import { Checkbox } from "../../../../components/ui/checkbox";
import { NewProjectData } from "../types";

const deliveryFormats = [
  { id: "online", label: "Online" },
  { id: "hybrid", label: "Hybrid" },
  { id: "in-person", label: "In-person" },
  { id: "no-preference", label: "No preference" },
];

function weeksToYears(weeks: number) {
  if (weeks < 52) return `${weeks} weeks`;
  const years = (weeks / 52).toFixed(1).replace(".0", "");
  return `${years} year${parseFloat(years) > 1 ? 's' : ''}`;
}

export function Step3Config() {
  const form = useFormContext<NewProjectData>();
  const isRefresh = form.watch("isRefresh");
  const duration = form.watch("duration");
  const noPreferenceDuration = form.watch("noPreferenceDuration");

  return (
    <div className="space-y-6">
      <FormField
        control={form.control}
        name="isRefresh"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel>Is this a program refresh?</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      {isRefresh && (
        <FormField
          control={form.control}
          name="existingProgramUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Existing program URL (optional)</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/program" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      <FormField
        control={form.control}
        name="deliveryFormat"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Delivery Format</FormLabel>
            <FormControl>
              <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex items-center gap-6">
                {deliveryFormats.map((format) => (
                  <FormItem key={format.id} className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={format.id} />
                    </FormControl>
                    <FormLabel className="font-normal">{format.label}</FormLabel>
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
        name="duration"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Duration: {weeksToYears(duration)}</FormLabel>
            <FormControl>
              <Slider 
                defaultValue={[48]} 
                min={4} 
                max={208} 
                step={4} 
                onValueChange={(value) => field.onChange(value[0])} 
                disabled={noPreferenceDuration}
              />
            </FormControl>
            <FormField
              control={form.control}
              name="noPreferenceDuration"
              render={({ field: noPrefField }) => (
                <FormItem className="flex items-center space-x-2 space-y-0 mt-2">
                  <FormControl>
                    <Checkbox checked={noPrefField.value} onCheckedChange={noPrefField.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal text-sm">No preference</FormLabel>
                </FormItem>
              )}
            />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="specialConsiderations"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special considerations (optional)</FormLabel>
            <FormControl>
              <Textarea placeholder="Any other details to consider..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
