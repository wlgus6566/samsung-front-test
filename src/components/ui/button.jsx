import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
const responsiveSizeMap = {
  lg: "h-9 px-3 py-2 rounded-[22px] text-2xs sm:h-13 sm:px-7 sm:py-3 sm:rounded-full sm:text-md md:h-14 md:px-7 md:py-3 md:rounded-full md:text-md",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed text-white",
  {
    variants: {
      variant: {
        brand:
          "hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        primary:
          "border border-gray-300 bg-blue-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        secondary:
          "border border-gray-300 bg-green-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        outline:
          "border border-gray-300 text-black disabled:bg-white disabled:text-gray-500 disabled:border-gray-300",
        link: "text-primary-blue underline-offset-4 hover:brightness-[85%] hover:underline disabled:text-gray-500]",
      },
      size: {
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function Button({
  className,
  variant = "primary",
  size = "md",
  asChild = false,
  children,
  ...props
}) {
  const Comp = asChild ? Slot : "button";

  const isBrand = variant === "brand";
  const brandGradientStyle = isBrand
    ? { backgroundImage: "var(--gradient-brand)" }
    : {};
  const responsiveSizeClass = responsiveSizeMap[size] || "";
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({ variant }), // variant는 CVA로 관리
        responsiveSizeClass, // 반응형 사이즈는 따로 매핑
        className
      )}
      style={brandGradientStyle}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
