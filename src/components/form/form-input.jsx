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
            <FormLabel required={required} className={cn(labelClassName)}>
              {label}
            </FormLabel>
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

export default FormInput;
