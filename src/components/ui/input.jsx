"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Input({
  className,
  inputClassName,
  type = "text",
  placeholder,
  onSearch,
  leftIcon,
  rightIcon,
  size = "md",
  value,
  onChange,
  ...inputProps
}) {
  const inputRef = React.useRef(null);
  const hasLeftIcon = !!leftIcon;
  const sizeStyles = {
    md: {
      height: "h-12",
      textSize: "text-sm",
      rounded: "rounded-xl",
      iconRight: "right-4",
    },
    lg: {
      height: "h-14",
      textSize: "text-base",
      rounded: "rounded-2xl",
      iconRight: "right-5",
    },
  };

  const currentSize = sizeStyles[size] || sizeStyles.md;

  const handleClear = () => {
    const event = { target: { value: "" } };
    onChange?.(event);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)}>
      {hasLeftIcon && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            size === "lg" ? "left-5" : "left-4"
          )}
        >
          {leftIcon}
        </div>
      )}

      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={cn(
          "w-full border bg-white text-black placeholder:text-gray-700 px-4",
          currentSize.height,
          currentSize.textSize,
          currentSize.rounded,
          "border-gray-300",
          "focus:border-blue-500",
          "transition-colors duration-150 ease-in-out",
          "outline-none appearance-none",
          "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400",
          {
            "[&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-cancel-button]:hidden":
              type === "search",
          },
          inputClassName
        )}
        {...inputProps}
      />

      {/* ❌ X 아이콘: 입력 중일 때만 표시 */}
      {type === "search" && value && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 cursor-pointer right-11"
          )}
        >
          <Image
            src="/images/icon/ic_default_close_circle.svg"
            alt="clear"
            width={24}
            height={24}
          />
        </button>
      )}

      {/* 🔍 돋보기 아이콘 */}
      {!rightIcon && type === "search" && (
        <Image
          src="/images/icon/ic_default_search.svg"
          alt="search"
          role="button"
          width={24}
          height={24}
          onClick={onSearch}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 cursor-pointer",
            currentSize.iconRight
          )}
        />
      )}

      {rightIcon && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            currentSize.iconRight
          )}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export { Input };
