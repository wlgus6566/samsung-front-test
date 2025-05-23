"use client";

import { Input } from "@/components/ui/input";
import { useSearchBar } from "./context";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import React from "react";

export function SearchInput({ label, wrapClassName, className, placeholder }) {
  const { searchText, setSearchText, handleSearch } = useSearchBar();

  return (
    <div
      className={cn(
        "flex-1 flex flex-col max-sm:w-full min-w-[200px] gap-1",
        wrapClassName
      )}
    >
      {label && (
        <Label className="body5 font-medium text-gray-700">{label}</Label>
      )}
      <Input
        type="search"
        size="md"
        placeholder={placeholder || "검색어를 입력해 주세요"}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
        className={cn("flex-initial w-full", className)}
      />
    </div>
  );
}
