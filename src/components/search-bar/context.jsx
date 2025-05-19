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
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🆕 상태 추가
  const [searchField, setSearchField] = useState(defaultSearchField); // 검색 조건 (예: name, email)
  const [searchText, setSearchText] = useState(""); // 검색어

  const [date, setDate] = useState(null);

  const [statusMap, setStatusMap] = useState({});
  const [statusOptionsMap, setStatusOptionsMap] = useState({});

  // 🧠 URL에서 초기값 세팅
  useEffect(() => {
    // 검색 조건 및 값 초기화
    const initialSearchValue = searchParams.get(searchField) || "";
    setSearchText(initialSearchValue);

    const newStatusMap = { ...statusMap };
    Object.keys(statusOptionsMap).forEach((field) => {
      const value = searchParams.get(field) || "all";
      newStatusMap[field] = value;
    });
    setStatusMap(newStatusMap);

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
  }, [searchParams, searchField, Object.keys(statusOptionsMap).join(",")]);

  // 🧹 상태 필터 기본값 보정
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
      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusOptionsMap, searchParams]);

  const setStatus = useCallback((field, value) => {
    setStatusMap((prev) => ({ ...prev, [field]: value }));
  }, []);

  const setStatusOptions = useCallback((field, options) => {
    setStatusOptionsMap((prev) => ({ ...prev, [field]: options }));
  }, []);

  // 🔍 검색 실행
  const handleSearch = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());

    // 현재 선택된 검색 필드에 검색어를 넣음
    if (searchText && searchField) {
      params.set(searchField, searchText);
    } else if (searchField) {
      params.delete(searchField);
    }

    // 필터 처리
    Object.entries(statusMap).forEach(([field, value]) => {
      if (value && value !== "all") {
        params.set(field, value);
      } else {
        params.delete(field);
      }
    });

    // 날짜 처리
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

    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [router, searchParams, searchText, searchField, date, statusMap]);

  // 🔄 초기화
  const handleReset = useCallback(() => {
    setDate(null);
    setSearchText("");
    setSearchField(defaultSearchField);
    const resetStatusMap = {};
    Object.keys(statusOptionsMap).forEach((field) => {
      resetStatusMap[field] = "all";
    });
    setStatusMap(resetStatusMap);

    const params = new URLSearchParams();
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  }, [router, defaultSearchField, statusOptionsMap]);

  const value = {
    searchField,
    setSearchField,
    searchText,
    setSearchText,
    date,
    setDate,
    statusMap,
    setStatus,
    statusOptionsMap,
    setStatusOptions,
    handleSearch,
    handleReset,
  };

  return (
    <SearchBarContext.Provider value={value}>
      {children}
    </SearchBarContext.Provider>
  );
}

export function useSearchBar() {
  const context = useContext(SearchBarContext);
  if (!context) {
    throw new Error("useSearchBar must be used within a SearchBarProvider");
  }
  return context;
}
