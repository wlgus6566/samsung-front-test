"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Badge = ({
  size = "medium",
  color = "blue",
  className,
  children,
  ...props
}) => {
  const typeStyles = {
    blue: "bg-blue-100 text-blue-500",
    green: "bg-green-50 text-green-800",
    red: "bg-red-100 text-red-700",
    gray: "bg-gray-100 text-gray-700",
  };

  const sizeStyles = {
    medium: "body5 py-0.75 px-3",
    small: "caption py-0.5 px-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-[8px]",
        typeStyles[color],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Badge };
