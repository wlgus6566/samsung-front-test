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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const phonePrefixItems = [
  { label: "010", value: "010" },
  { label: "011", value: "011" },
  { label: "016", value: "016" },
  { label: "017", value: "017" },
  { label: "018", value: "018" },
  { label: "019", value: "019" },
];

const FormPhone = ({
  control,
  name, // name은 반드시 3개의 string 객체로 나누어야: 예시 → { phone1, phone2, phone3 }
  label,
  required = false,
  description = "",
  className,
  labelClassName,
  descriptionClassName,
}) => {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <FormLabel required={required} className={cn(labelClassName)}>
          {label}
        </FormLabel>
      )}
      <div className="flex gap-1">
        {/* 앞자리 번호 */}
        <FormField
          control={control}
          name={`${name}.phone1`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="선택" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {phonePrefixItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />

        {/* 중간 번호 */}
        <FormField
          control={control}
          name={`${name}.phone2`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  maxLength={4}
                  inputMode="numeric"
                  pattern="\d*"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* 끝 번호 */}
        <FormField
          control={control}
          name={`${name}.phone3`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  maxLength={4}
                  inputMode="numeric"
                  pattern="\d*"
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, "");
                  }}
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </div>

      {description && (
        <FormDescription className={cn(descriptionClassName)}>
          {description}
        </FormDescription>
      )}
    </div>
  );
};

export default FormPhone;
