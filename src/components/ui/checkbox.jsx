"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef(
  ({ className, size = "default", ...props }, ref) => {
    const isLg = size === "lg";

    return (
      <CheckboxPrimitive.Root
        ref={ref}
        className={cn(
          "group peer shrink-0 rounded-sm border transition-all outline-none",
          "focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          // 크기
          isLg ? "size-6" : "size-5",
          // 기본 상태 (선택되지 않음)
          "data-[state=unchecked]:bg-white data-[state=unchecked]:border-gray-300 data-[state=unchecked]:text-gray-900",
          // 선택된 상태
          "data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white",
          // 비활성화 상태
          "disabled:cursor-not-allowed disabled:opacity-70",
          "disabled:data-[state=unchecked]:bg-gray-100 disabled:data-[state=unchecked]:border-gray-300 disabled:data-[state=unchecked]:text-gray-400",
          "disabled:data-[state=checked]:bg-gray-200 disabled:data-[state=checked]:border-gray-200 disabled:data-[state=checked]:text-gray-400",
          className
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator
          className={cn("flex items-center justify-center text-current")}
        >
          <CheckIcon className={cn(isLg ? "size-3.5" : "size-3")} />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
    );
  }
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
