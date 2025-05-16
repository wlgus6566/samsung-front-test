import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex body-3 items-center justify-center whitespace-nowrap font-[600] transition-all disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed text-white",
  {
    variants: {
      variant: {
        brand:
          "bg-blue-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        primary:
          "bg-blue-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        secondary:
          "bg-green-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500]",
        outline:
          "border border-gray-300 text-gray-800 disabled:bg-background disabled:text-gray-500 disabled:border-gray-300",
        link: "text-primary-blue underline-offset-4 hover:brightness-[85%] hover:underline disabled:text-gray-500]",
      },
      size: {
        lg: "h-16 px-8 py-4 rounded-2xl text-sm",
        default: "h-12 px-6 py-4.25 rounded-xl text-xs",
        sm: "px-4 py-2 rounded-[10px] body-5",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

function Button({
  className,
  variant,
  size,
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
