"use client";

import SearchBar from "@/components/search-bar";
import Pagination from "@/components/ui/pagination";
export default function PressResultsList({ initialData }) {
  return (
    <>
      <SearchBar defaultSearchField="searchWord">
        <div className="flex gap-2 items-end">
          <SearchBar.Status
            label="구분"
            wrapClassName="w-[calc((100%-24px)/4)]"
            field="category"
            placeholder="구분 선택"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.SearchInput placeholder="검색어를 입력하세요 (예 : 금형, AI, 자동차부품, 생산성 향상)" />
        </div>
        <div className="flex gap-2 items-end mt-3.5">
          <SearchBar.Status
            label="업종"
            wrapClassName="flex-1"
            field="status1"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.Status
            label="기술 분야"
            wrapClassName="flex-1"
            field="status2"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.Status
            label="기업 규모"
            wrapClassName="flex-1"
            field="status3"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.Status
            label="성과 유형"
            wrapClassName="flex-1"
            field="status4"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
        </div>
        <SearchBar.Actions />
      </SearchBar>
      <Pagination
        pageNum={1}
        pageSize={10}
        totalCount={1}
        goToPage={() => {}}
      />
    </>
  );
}
