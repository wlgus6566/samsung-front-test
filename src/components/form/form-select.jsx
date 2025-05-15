"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const FormSelect = ({
  control,
  name,
  label,
  description = "",
  placeholder,
  items = [],
  className,
  selectTriggerClassName,
  labelClassName,
  descriptionClassName,
  required = false,
  disabled = false,
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn(className)}>
          {label && (
            <div className="flex items-center mb-1.5">
              <FormLabel
                className={cn(
                  "text-sm font-medium text-gray-800",
                  { "text-destructive": !!error },
                  labelClassName,
                  required &&
                    "after:content-['*'] after:text-destructive after:ml-0.5"
                )}
              >
                {label}
              </FormLabel>
            </div>
          )}
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
            disabled={disabled || props.disabled}
            {...props}
          >
            <FormControl>
              <SelectTrigger
                className={cn(selectTriggerClassName)}
                disabled={disabled || props.disabled}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => (
                <SelectItem
                  key={item.value}
                  value={item.value}
                  disabled={item.disabled}
                >
                  {item.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {description && !error && (
            <FormDescription
              className={cn(
                "text-xs text-gray-600 mt-1.5",
                descriptionClassName
              )}
            >
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
