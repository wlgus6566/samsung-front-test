"use client";

import { DatePicker } from "@/components/ui/date-picker";
import { useSearchBar } from "./context";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import React from "react";

export function DateRange({ label, className, maxDate, wrapClassName }) {
  const { date, setDate } = useSearchBar();
  return (
    <div
      className={cn(
        "flex flex-col min-w-[200px] max-md:w-full gap-1",
        wrapClassName
      )}
    >
      {label && (
        <Label className="text-xs font-medium text-muted-foreground">
          {label}
        </Label>
      )}
      <DatePicker
        value={date}
        onChange={setDate}
        mode="range"
        className={cn("w-full", className)}
        maxDate={maxDate}
      />
    </div>
  );
}
