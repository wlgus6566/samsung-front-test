"use client";

import SearchBar from "@/components/search-bar";
import Pagination from "@/components/ui/pagination";
import BoardTable from "@/components/ui/board-table";
import { useState } from "react";

export default function SupportResultsList({ initialData }) {
  const [currentFilter, setCurrentFilter] = useState("latest");

  const data = [
    {
      id: 1,
      title: "삼성스마트공장 홈페이지 서비스 중단 안내: 4.6(일) 09시~22시",
      date: "2025-01-01",
    },
    {
      id: 2,
      title:
        "[알림] 신용정보법 제 32조제7항6에 따른 개인신용정보 이용·제공 내역의 공지(김*호)",
      date: "2025-01-01",
    },
    {
      id: 3,
      title: "[알림] 삼성화재 홈페이지 서비스 중단 안내: 11.17(일) 00시~08시",
      date: "2025-01-01",
    },
    {
      id: 4,
      title: "[알림] 2023년 국가고객만족도(NCSI) 부문 23년 연속 1위",
      date: "2025-01-01",
    },
  ];

  const filterOptions = [
    { label: "최신순", value: "latest" },
    { label: "오래된순", value: "oldest" },
    { label: "제목순", value: "title" },
  ];

  const handleFilterChange = (value) => {
    setCurrentFilter(value);
    // 여기서 실제 데이터 정렬 로직을 구현할 수 있습니다
    console.log("Filter changed to:", value);
  };

  return (
    <>
      <SearchBar defaultSearchField="searchWord">
        <SearchBar.SearchInput
          className="max-w-[804px] mx-auto"
          placeholder="제목 또는 키워드를 입력하세요."
        />
      </SearchBar>
      <BoardTable
        data={data}
        totalCount={1998}
        filterOptions={filterOptions}
        onFilterChange={handleFilterChange}
      />
      <Pagination
        pageNum={1}
        pageSize={10}
        totalCount={1}
        goToPage={() => {}}
      />
    </>
  );
}
