"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useCallback } from "react";

/**
 * 검색 영역 컴포넌트
 * @param {Object} props
 * @param {React.ReactNode} props.children - 검색 영역에 표시할 검색 요소들
 * @param {Function} props.onReset - 초기화 버튼 클릭 시 실행할 함수
 * @param {Function} props.onSearch - 검색 버튼 클릭 시 실행할 함수
 * @param {string} props.className - 추가 클래스명
 */
const SearchArea = ({ children, onReset, onSearch, className, ...props }) => {
  const handleReset = useCallback(() => {
    if (onReset && typeof onReset === "function") {
      onReset();
    }
  }, [onReset]);

  const handleSearch = useCallback(() => {
    if (onSearch && typeof onSearch === "function") {
      onSearch();
    }
  }, [onSearch]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-end gap-2 bg-white p-4 rounded-md mb-6",
        className
      )}
      {...props}
    >
      {/* 검색 요소들 영역 */}
      <div className="flex-1 flex flex-wrap items-end gap-2 min-w-0">
        {children}
      </div>

      {/* 버튼 그룹 */}
      <div className="flex items-center gap-2 shrink-0">
        {/* 초기화 버튼 */}
        <Button
          type="button"
          variant="outline"
          className="h-10 px-3 py-2 border border-gray-300 text-gray-500 hover:bg-gray-50 hover:text-gray-700"
          onClick={handleReset}
        >
          <Image
            src="/images/icon/ic_default_refresh.svg"
            alt="초기화"
            width={16}
            height={16}
            className="mr-2"
          />
          초기화
        </Button>

        {/* 검색 버튼 */}
        <Button
          type="button"
          className="h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          onClick={handleSearch}
        >
          검색
        </Button>
      </div>
    </div>
  );
};

export default SearchArea;
