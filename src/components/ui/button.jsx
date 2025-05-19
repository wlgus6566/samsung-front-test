import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed text-white",
  {
    variants: {
      variant: {
        brand:
          "border border-bg-blue-500 bg-blue-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        primary:
          "border border-gray-300 bg-blue-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        secondary:
          "border border-gray-300 bg-green-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        outline:
          "border border-gray-300 text-black disabled:bg-white disabled:text-gray-500 disabled:border-gray-300",
        link: "text-primary-blue underline-offset-4 hover:brightness-[85%] hover:underline disabled:text-gray-500]",
      },
      size: {
        lg: "h-15 px-8 py-4 rounded-[20px] body-3",
        md: "h-11 px-6 py-3 rounded-[16px] body-4",
        sm: "h-9 px-4 py-1.75 rounded-[12px] body-5",
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
  variant,
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

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), {})}
      style={brandGradientStyle}
      {...props}
    >
      {children}
    </Comp>
  );
}

export { Button, buttonVariants };
