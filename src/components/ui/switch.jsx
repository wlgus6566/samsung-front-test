"use client";

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

const Switch = React.forwardRef(
  ({ className, size = "default", ...props }, ref) => {
    const isLg = size === "lg";

    return (
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
          // 크기: Medium (default) / Large (lg)
          isLg ? "h-7 w-12" : "h-6 w-11",
          // 배경색
          "data-[state=unchecked]:bg-gray-200",
          "data-[state=checked]:bg-blue-500",
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform",
            // 핸들 크기 및 위치
            isLg
              ? "size-5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
              : "size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
          )}
        />
      </SwitchPrimitives.Root>
    );
  }
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
