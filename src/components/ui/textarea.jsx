"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({
  className,
  maxLength,
  value,
  onChange,
  placeholder,
  ...props
}) {
  const [charCount, setCharCount] = React.useState(value?.length || 0);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setCharCount(newValue.length);
    if (onChange) onChange(e);
  };

  // useEffect를 사용하여 외부에서 value가 변경될 때 charCount 동기화
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
          "w-full border bg-white text-black placeholder:text-gray-700 placeholder:body-5 p-4",
          "h-32", // 기본 높이 설정
          "body-5",
          "rounded-xl",
          "border-gray-300",
          "focus:border-primary-blue focus:ring-1 focus:ring-primary-blue",
          "transition-colors duration-150 ease-in-out",
          "outline-none appearance-none",
          "disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-400",
          "resize-none", // 사용자가 크기 조절 불가능하게 설정
          className
        )}
        {...props}
      />
      {maxLength && (
        <div className="absolute bottom-4 right-4 text-[12px] text-gray-700">
          <span className="text-black font-semibold">{charCount}</span>/
          {maxLength}
        </div>
      )}
    </div>
  );
}

export { Textarea };
