"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * Badge 컴포넌트
 * @param {Object} props
 * @param {'primary' | 'secondary' | 'tertiary' | 'quaternary'} [props.type='primary'] - 배지 유형
 * @param {'small' | 'medium'} [props.size='medium'] - 배지 크기
 * @param {string} props.children - 배지 내용
 * @param {string} [props.className] - 추가 CSS 클래스
 */
const Badge = ({
  type = "blue",
  size = "medium",
  className,
  children,
  ...props
}) => {
  const typeStyles = {
    blue: "bg-[var(--color-blue-100)] text-[var(--color-blue-500)]",
    green: "bg-[var(--color-green-50)] text-[var(--color-green-800)]",
    red: "bg-[var(--color-red-100)] text-[var(--color-red-700)]",
    gray: "bg-[var(--color-gray-100)] text-[var(--color-gray-700)]",
  };

  const sizeStyles = {
    medium: "body5 py-0.75 px-3",
    small: "caption py-0.5 px-2",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-[8px]",
        typeStyles[type],
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
