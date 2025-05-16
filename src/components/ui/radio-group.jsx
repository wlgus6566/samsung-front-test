import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { CircleIcon } from "lucide-react";
import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  );
}

function RadioGroupItem({ className, size = "default", ...props }) {
  const isLg = size === "lg";

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "group shrink-0 rounded-full border transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        isLg ? "size-6" : "size-5",
        "bg-white border-gray-300 text-gray-900",
        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-400",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative flex items-center justify-center">
        <CircleIcon
          className={cn(
            isLg ? "size-4" : "size-3",
            // 기본 fill
            "fill-white stroke-none ",
            // disabled + checked 일 때
            "group-data-[state=checked]:group-disabled:fill-gray-300 group-data-[state=checked]:fill-blue-500"
          )}
        />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
}

export { RadioGroup, RadioGroupItem };
