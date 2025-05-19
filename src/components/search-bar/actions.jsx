"use client";

import { useSearchBar } from "./context";
import { cn } from "@/lib/utils";
import Img from "@/components/ui/img";

export function Actions({ className }) {
  const { handleSearch, handleReset } = useSearchBar();

  return (
    <div
      className={cn(
        "flex items-center gap-2 max-lg:w-full justify-end mt-5",
        className
      )}
    >
      {/* <Button onClick={handleSearch}>검색</Button> */}
      <button
        className="flex items-center gap-1 border-none"
        type="button"
        onClick={handleReset}
      >
        <Img
          src="/images/icon/ic_default_refresh.svg"
          alt="refresh"
          width={16}
          height={16}
        />
        <span className="body-4 font-semibold">검색 초기화</span>
      </button>
    </div>
  );
}
