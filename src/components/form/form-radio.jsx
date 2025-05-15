"use client";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

const FormRadio = ({
  control,
  name,
  label,
  description = "",
  items = [],
  className,
  labelClassName,
  wrapClassName,
  required = false,
  isVertical = false,
  descriptionClassName,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn(wrapClassName)}>
          {label && (
            <FormLabel
              className={cn(
                labelClassName,
                required &&
                  "after:content-['*'] after:text-destructive after:ml-0.5"
              )}
            >
              {label}
            </FormLabel>
          )}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value}
              className={cn(
                "flex",
                isVertical ? "flex-col" : "flex-row gap-x-4",
                className
              )}
            >
              {items.map((item) => (
                <FormItem
                  key={item.value}
                  className="flex items-center space-x-0 space-y-0"
                >
                  <div className="flex items-center h-5">
                    <FormControl>
                      <RadioGroupItem
                        value={item.value}
                        disabled={item.disabled}
                      />
                    </FormControl>
                  </div>
                  <FormLabel className="text-sm font-normal">
                    {item.label}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          {description && (
            <FormDescription className={cn(descriptionClassName)}>
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormRadio;
