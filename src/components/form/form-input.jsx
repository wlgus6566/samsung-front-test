"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FormInput = ({
  control,
  name,
  label,
  description = "",
  placeholder,
  type,
  required = false,
  labelSide,
  className,
  inputClassName,
  labelClassName,
  descriptionClassName,
  action,
  size = "md",
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormItem className={cn(className)}>
          {label && (
            <div className="flex items-center mb-2">
              <FormLabel
                className={cn(
                  "body-5 font-medium",
                  { "text-destructive": !!error },
                  labelClassName,
                  required &&
                    "after:content-['*'] after:text-destructive after:ml-0.5 after:mt-0.5 after:text-red-600"
                )}
              >
                {label}
              </FormLabel>
              {labelSide && <div className="ml-auto">{labelSide}</div>}
            </div>
          )}
          <div className="flex items-center">
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                className={cn(inputClassName)}
                size={size}
                {...field}
                {...props}
              />
            </FormControl>
            {action && action}
          </div>
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

export default FormInput;
