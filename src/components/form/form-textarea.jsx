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
            <FormLabel required={required} className={cn(labelClassName)}>
              {label}
            </FormLabel>
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

export default FormTextarea;
