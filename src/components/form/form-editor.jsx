"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Editor from "@/components/editor";
import { cn } from "@/lib/utils";

const FormEditor = ({
  control,
  name,
  label,
  description = "",
  placeholder,
  className,
  labelClassName,
  descriptionClassName,
  onFileUpload = () => {},
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel className={cn(labelClassName)}>{label}</FormLabel>
          )}
          <FormControl>
            <Editor
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              onFileUpload={onFileUpload}
              className={cn(className)}
              placeholder={placeholder}
            />
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

export default FormEditor;
