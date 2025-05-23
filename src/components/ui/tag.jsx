"use client";

import React from "react";
import { cn } from "@/lib/utils";

const Tag = ({ color = "black", className, children, ...props }) => {
  const colorStyles = {
    black: "bg-black text-white",
    white: "bg-white border border-gray-300 text-black",
    blue: "bg-blue-500 text-white",
    gray: "bg-gray-200 text-gray-800",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center px-3 py-0.5 font-semibold body5 rounded-full",
        colorStyles[color],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export { Tag };
