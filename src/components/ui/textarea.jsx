"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

const sizeStyles = {
  md: {
    textSize: "body5",
    padding: "px-4 py-3.25",
    rounded: "rounded-[16px]",
  },
  lg: {
    textSize: "body4",
    padding: "px-4.5 py-4",
    rounded: "rounded-[16px]",
  },
};

function Textarea({
  className,
  maxLength,
  value,
  onChange,
  placeholder,
  height = "h-[126px]",
  size = "lg",
  ...props
}) {
  const [charCount, setCharCount] = React.useState(value?.length || 0);
  const currentSize = sizeStyles[size] || sizeStyles.md;

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    onChange?.(e);
  };

  React.useEffect(() => {
    setCharCount(value?.length || 0);
  }, [value]);

  return (
    <div className="relative w-full">
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={cn(
          "w-full border bg-white text-black placeholder:text-gray-700 placeholder:body4",
          height,
          currentSize.textSize,
          currentSize.padding,
          currentSize.rounded,
          "border-gray-300",
          "focus:border-primary-blue",
          "transition-colors duration-150 ease-in-out",
          "outline-none appearance-none",
          "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700 disabled:border-gray-300",
          "resize-none",
          className
        )}
        {...props}
      />
      {maxLength && (
        <div className="absolute bottom-4 right-4 caption text-gray-700">
          <span className="text-black font-semibold">{charCount}</span>/
          {maxLength}
        </div>
      )}
    </div>
  );
}

export { Textarea };
