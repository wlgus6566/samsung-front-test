"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchBar } from "./context";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

export function Field({ options = [], className }) {
  const { searchField, setSearchField, defaultSearchField } = useSearchBar();

  // 옵션이 없으면 렌더링 안함
  if (!options || options.length === 0) return null;

  // 컴포넌트 마운트 및 options 변경 시 검색 필드 설정
  useEffect(() => {
    if (options.length > 0) {
      const optionIds = options.map((opt) => opt.id);

      // 1. defaultSearchField가 있고, options에 포함되어 있으면 해당 값 사용
      if (defaultSearchField && optionIds.includes(defaultSearchField)) {
        setSearchField(defaultSearchField);
      }
      // 2. 현재 searchField가 비어있거나 options에 없으면 첫 번째 옵션으로 설정
      else if (!searchField || !optionIds.includes(searchField)) {
        setSearchField(options[0].id);
      }
    }
  }, [options, searchField, setSearchField, defaultSearchField]);

  return (
    <Select
      value={searchField}
      onValueChange={setSearchField}
      className={cn("w-[150px] max-md:w-full", className)}
    >
      <SelectTrigger>
        <SelectValue placeholder="검색 조건" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.id} value={option.id}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
