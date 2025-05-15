"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const FormTextarea = ({
  control,
  name,
  label,
  description = "",
  placeholder,
  required = false,
  labelSide,
  className,
  textareaClassName,
  labelClassName,
  descriptionClassName,
  action,
  maxLength,
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
              {labelSide && <div className="ml-auto">{labelSide}</div>}
            </div>
          )}
          <div className="flex items-center">
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className={cn(textareaClassName)}
                maxLength={maxLength}
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

export default FormTextarea;
