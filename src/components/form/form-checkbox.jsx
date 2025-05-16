"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const FormCheckbox = ({
  control,
  name,
  label,
  description = "",
  items = [],
  className,
  labelClassName,
  descriptionClassName,
  required = false,
  size = "default",
  disabled = false,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
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
          <div className="flex gap-5">
            {items.map((item) => (
              <FormField
                key={item.value}
                control={control}
                name={name}
                render={({ field }) => {
                  return (
                    <FormItem
                      key={item.value}
                      className="flex items-center gap-2"
                    >
                      <div className="flex items-center h-5">
                        <FormControl>
                          <Checkbox
                            className={cn("", className)}
                            checked={field.value?.includes(item.value)}
                            size={size}
                            disabled={disabled || item.disabled}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.value])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.value
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                      </div>
                      <FormLabel size={size} className="mt-0">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>

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

export default FormCheckbox;
