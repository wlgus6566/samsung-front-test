"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

function Input({
  className, // div wrapper에 적용될 클래스
  inputClassName, // input element에 적용될 클래스
  type = "text",
  placeholder,
  onSearch, // search 타입일 때 아이콘 클릭 시 호출
  leftIcon, // 좌측 아이콘
  rightIcon, // 우측 아이콘 (search 타입과 함께 사용 시 주의)
  size = "md", // 'md' (default), 'lg'
  // value, onChange 등 나머지 inputProps는 자동으로 input 태그에 전달됨
  ...inputProps
}) {
  const hasLeftIcon = !!leftIcon;
  const hasRightIcon = !!rightIcon || type === "search";

  // Size-specific styles
  const sizeStyles = {
    md: {
      height: "h-12",
      textSize: "text-sm",
      rounded: "rounded-xl",
    },
    lg: {
      height: "h-14", // 56px
      textSize: "text-base", // 16px
      rounded: "rounded-2xl",
    },
  };

  const currentSizeStyle = sizeStyles[size] || sizeStyles.md;

  return (
    <div className={cn("relative w-full", className)}>
      {hasLeftIcon && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            size === "lg" ? "left-5" : "left-4", // lg: 20px, md: 16px
            currentSizeStyle.iconSize
          )}
        >
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full border bg-white text-black placeholder:text-gray-400 px-4",
          currentSizeStyle.height, // h-12 or h-14
          currentSizeStyle.textSize, // text-sm or text-base,
          currentSizeStyle.rounded,
          "border-gray-300",
          "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10",
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
      {!rightIcon && type === "search" && (
        <Image
          src="/images/icon/ic_basic_20_search_black.svg"
          alt="search"
          role="button"
          width={size === "lg" ? 24 : 20}
          height={size === "lg" ? 24 : 20}
          onClick={onSearch}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 cursor-pointer",
            size === "lg" ? "right-5" : "right-4", // lg: 20px, md: 16px
            currentSizeStyle.iconSize
          )}
        />
      )}
      {rightIcon && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2",
            size === "lg" ? "right-5" : "right-4",
            currentSizeStyle.iconSize
          )}
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
}

export { Input };
