"use client";

import { useState } from "react";
import SearchArea from "./index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export function BasicSearchArea() {
  const [keyword, setKeyword] = useState("");
  const [searchField, setSearchField] = useState("name");
  const [date, setDate] = useState(null);

  const handleReset = () => {
    setKeyword("");
    setSearchField("name");
    setDate(null);
  };

  const handleSearch = () => {
    console.log("검색 조건:", {
      keyword,
      searchField,
      date,
    });
    // 실제로는 여기서 API 호출 등을 수행
  };

  return (
    <SearchArea onReset={handleReset} onSearch={handleSearch}>
      {/* 검색 필드 선택 */}
      <div className="w-36">
        <Label htmlFor="search-field" className="sr-only">
          검색 필드
        </Label>
        <Select value={searchField} onValueChange={setSearchField}>
          <SelectTrigger id="search-field" className="h-10">
            <SelectValue placeholder="검색 조건" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">이름</SelectItem>
            <SelectItem value="email">이메일</SelectItem>
            <SelectItem value="phone">전화번호</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 검색어 입력 */}
      <div className="w-full md:w-64">
        <Label htmlFor="keyword" className="sr-only">
          검색어
        </Label>
        <Input
          id="keyword"
          placeholder="검색어를 입력하세요"
          className="h-10"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      {/* 날짜 선택 */}
      <div>
        <Label htmlFor="date" className="sr-only">
          날짜
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant="outline"
              className="h-10 w-full md:w-48 border-gray-300 text-gray-700 justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date
                ? format(date, "yyyy년 MM월 dd일", { locale: ko })
                : "날짜 선택"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
    </SearchArea>
  );
}

export function AdvancedSearchArea() {
  const [searchParams, setSearchParams] = useState({
    keyword: "",
    category: "",
    status: "all",
    dateFrom: null,
    dateTo: null,
  });

  const handleReset = () => {
    setSearchParams({
      keyword: "",
      category: "",
      status: "all",
      dateFrom: null,
      dateTo: null,
    });
  };

  const handleSearch = () => {
    console.log("고급 검색 조건:", searchParams);
    // 실제로는 여기서 API 호출 등을 수행
  };

  const handleChange = (field, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <SearchArea
      onReset={handleReset}
      onSearch={handleSearch}
      className="bg-gray-50"
    >
      {/* 카테고리 선택 */}
      <div className="w-36">
        <Label htmlFor="category" className="text-xs text-gray-500 mb-1 block">
          카테고리
        </Label>
        <Select
          value={searchParams.category}
          onValueChange={(value) => handleChange("category", value)}
        >
          <SelectTrigger id="category" className="h-10">
            <SelectValue placeholder="전체" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">전체</SelectItem>
            <SelectItem value="product">제품</SelectItem>
            <SelectItem value="service">서비스</SelectItem>
            <SelectItem value="tech">기술</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 상태 선택 */}
      <div className="w-36">
        <Label htmlFor="status" className="text-xs text-gray-500 mb-1 block">
          상태
        </Label>
        <Select
          value={searchParams.status}
          onValueChange={(value) => handleChange("status", value)}
        >
          <SelectTrigger id="status" className="h-10">
            <SelectValue placeholder="상태 선택" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="active">활성화</SelectItem>
            <SelectItem value="inactive">비활성화</SelectItem>
            <SelectItem value="pending">대기중</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 검색어 입력 */}
      <div className="w-full md:w-64">
        <Label
          htmlFor="advanced-keyword"
          className="text-xs text-gray-500 mb-1 block"
        >
          검색어
        </Label>
        <Input
          id="advanced-keyword"
          placeholder="검색어를 입력하세요"
          className="h-10"
          value={searchParams.keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
        />
      </div>
    </SearchArea>
  );
}
