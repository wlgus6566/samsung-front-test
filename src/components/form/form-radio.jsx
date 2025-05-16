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
  size = "default",
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
            <div className="flex items-center mb-2">
              <FormLabel
                className={cn(
                  labelClassName,
                  required &&
                    "after:content-['*'] after:text-destructive after:ml-0.5 after:mt-0.5 after:text-red-600"
                )}
              >
                {label}
              </FormLabel>
            </div>
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
                  className="flex items-center space-x-2 space-y-0"
                >
                  <div className="flex items-center h-5">
                    <FormControl>
                      <RadioGroupItem
                        value={item.value}
                        disabled={item.disabled}
                        size={size}
                      />
                    </FormControl>
                  </div>
                  <FormLabel
                    className={`mt-0 ${size === "lg" ? "body-4" : "body-5"}`}
                  >
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
