"use client";

import { Button } from "@/components/ui/button";
import { useSearchBar } from "./context";
import { cn } from "@/lib/utils";

export function Actions({ className }) {
  const { handleSearch, handleReset } = useSearchBar();

  return (
    <div
      className={cn(
        "flex items-center gap-2 max-lg:w-full max-lg:justify-end",
        className
      )}
    >
      <Button onClick={handleSearch}>검색</Button>
      <Button variant="outline" onClick={handleReset}>
        초기화
      </Button>
    </div>
  );
}
