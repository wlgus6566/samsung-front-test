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
import React from "react";
import { Label } from "@/components/ui/label";
export function Status({
  label,
  className,
  wrapClassName,
  options = [
    { value: "all", label: "전체" },
    { value: "true", label: "활성" },
    { value: "false", label: "비활성" },
  ],
  field = "isActive",
  placeholder = "사용 유무",
}) {
  const {
    statusMap,
    setStatus,
    statusOptionsMap,
    setStatusOptions,
    handleSearch,
  } = useSearchBar();

  const items = statusOptionsMap[field] || options;
  const hasAll = items.some((opt) => String(opt.value) === "all");
  const firstValue = String(items[0]?.value);
  const contextValue = statusMap[field];
  const value = String(contextValue || (hasAll ? "all" : firstValue));
  const validValue = items.some((opt) => String(opt.value) === value)
    ? value
    : firstValue;

  const [didSetDefault, setDidSetDefault] = React.useState(false);

  // 옵션 등록
  React.useEffect(() => {
    setStatusOptions(field, options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field, options]);

  // context 값이 없고, all도 없고, 첫 옵션이 있으면 렌더 직전에 context에 반영
  React.useLayoutEffect(() => {
    if (!contextValue && !hasAll && firstValue) {
      setStatus(field, firstValue);
      setDidSetDefault(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contextValue, hasAll, firstValue, field]);

  // context 값이 실제로 바뀐 후 handleSearch를 한 번만 실행
  React.useEffect(() => {
    if (didSetDefault && contextValue === firstValue) {
      handleSearch();
      setDidSetDefault(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [didSetDefault, contextValue, firstValue]);

  return (
    <div className={cn("flex flex-col gap-1", wrapClassName)}>
      {label && (
        <Label className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
      )}
      <Select
        value={validValue}
        onValueChange={(v) => setStatus(field, v)}
        className={cn("w-full", className)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {items.map((option) => (
            <SelectItem key={String(option.value)} value={String(option.value)}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
