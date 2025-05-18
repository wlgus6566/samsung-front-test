"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";

const SearchBarContext = createContext(null);

export function SearchBarProvider({
  children,
  defaultSearchField = "searchWord",
}) {
  const [searchField, setSearchField] = useState(defaultSearchField);

  const router = useRouter();
  const searchParams = useSearchParams();

  // 상태 관리
  const [date, setDate] = useState(null);
  const [searchText, setSearchText] = useState("");
  // 여러 상태 필터를 위한 객체 기반 상태
  const [statusMap, setStatusMap] = useState({}); // { [field]: value }
  const [statusOptionsMap, setStatusOptionsMap] = useState({}); // { [field]: options }

  // URL 검색 파라미터에서 초기값 설정
  useEffect(() => {
    // 검색어 설정
    const searchValue = searchParams.get(defaultSearchField) || "";
    setSearchText(searchValue);

    // 여러 상태 필터 초기화
    const newStatusMap = { ...statusMap };
    Object.keys(statusOptionsMap).forEach((field) => {
      const value = searchParams.get(field) || "all";
      newStatusMap[field] = value;
    });
    setStatusMap(newStatusMap);

    // 날짜 범위 설정
    const beginDt = searchParams.get("beginDt");
    const endDt = searchParams.get("endDt");
    if (beginDt) {
      try {
        setDate({
          from: new Date(beginDt),
          to: endDt ? new Date(endDt) : new Date(beginDt),
        });
      } catch (error) {
        console.error("Invalid date format:", error);
        setDate(null);
      }
    } else {
      setDate(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    searchParams,
    defaultSearchField,
    Object.keys(statusOptionsMap).join(","),
  ]);

  // URL 파라미터 보정: 최초 마운트 시 필수 필드가 없으면 push
  useEffect(() => {
    if (!Object.keys(statusOptionsMap).length) return;
    const params = new URLSearchParams(searchParams.toString());
    let shouldPush = false;
    Object.entries(statusOptionsMap).forEach(([field, options]) => {
      const hasAll = options.some((opt) => String(opt.value) === "all");
      const firstValue = String(options[0]?.value);
      const current = params.get(field);
      if (!current && !hasAll && firstValue) {
        params.set(field, firstValue);
        shouldPush = true;
      }
    });
    if (shouldPush) {
      // 페이지 초기화
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusOptionsMap, searchParams]);

  // 필터별 상태 설정 함수
  const setStatus = useCallback((field, value) => {
    setStatusMap((prev) => ({ ...prev, [field]: value }));
  }, []);
  const setStatusOptions = useCallback((field, options) => {
    setStatusOptionsMap((prev) => ({ ...prev, [field]: options }));
  }, []);

  // 검색 실행 함수
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    // 검색어 설정
    if (searchText) {
      params.set(defaultSearchField, searchText);
    } else {
      params.delete(defaultSearchField);
    }
    // 여러 상태 필터 파라미터 설정
    Object.entries(statusMap).forEach(([field, value]) => {
      if (value && value !== "all") {
        params.set(field, value);
      } else {
        params.delete(field);
      }
    });
    // 날짜 파라미터 설정
    if (date?.from) {
      params.set("beginDt", format(date.from, "yyyy-MM-dd"));
      if (date.to) {
        params.set("endDt", format(date.to, "yyyy-MM-dd"));
      } else {
        params.set("endDt", format(date.from, "yyyy-MM-dd"));
      }
    } else {
      params.delete("beginDt");
      params.delete("endDt");
    }
    // 페이지 초기화
    params.set("page", "1");
    // URL 업데이트
    router.push(`?${params.toString()}`);
  }, [router, searchParams, date, searchText, defaultSearchField, statusMap]);

  // 초기화 함수
  const handleReset = useCallback(() => {
    setDate(null);
    setSearchText("");
    // 모든 상태 필터 초기화
    const resetStatusMap = {};
    Object.keys(statusOptionsMap).forEach((field) => {
      resetStatusMap[field] = "all";
    });
    setStatusMap(resetStatusMap);
    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [router, statusOptionsMap]);

  const value = {
    searchField,
    setSearchField,
    // 상태
    date,
    setDate,
    searchText,
    setSearchText,
    statusMap,
    setStatus,
    statusOptionsMap,
    setStatusOptions,
    // 기능
    handleSearch,
    handleReset,
  };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
}

// 커스텀 훅 - 컨텍스트 사용
export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBar must be used within a SearchBarProvider");
  }
  return context;
}
