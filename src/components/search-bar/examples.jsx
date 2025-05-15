"use client";

import SearchBar from "./index";

// 관리자 관리 페이지 검색바 예시 (모든 필드 사용)
export function AdminSearchBar() {
  return (
    <SearchBar>
      <SearchBar.DateRange />
      <SearchBar.Field
        options={[
          { id: "name", label: "이름" },
          { id: "email", label: "이메일" },
        ]}
      />
      <SearchBar.Status />
      <SearchBar.SearchInput />
      <SearchBar.Actions />
    </SearchBar>
  );
}

// 마케팅 관리 페이지 검색바 예시 (날짜와 제목만 검색)
export function MarketingSearchBar() {
  return (
    <SearchBar>
      <SearchBar.DateRange />
      <SearchBar.Field
        options={[
          { id: "title", label: "제목" },
          { id: "content", label: "내용" },
        ]}
      />
      <SearchBar.SearchInput placeholder="검색어를 입력하세요" />
      <SearchBar.Actions />
    </SearchBar>
  );
}

// 공지사항 관리 페이지 검색바 예시 (날짜 없이 제목만 검색)
export function NoticeSearchBar() {
  return (
    <SearchBar>
      <SearchBar.Field
        options={[
          { id: "title", label: "제목" },
          { id: "content", label: "내용" },
        ]}
      />
      <SearchBar.SearchInput placeholder="검색어를 입력하세요" />
      <SearchBar.Actions />
    </SearchBar>
  );
}

// 경영공시 관리 페이지 검색바 예시 (제목만 검색 + 커스텀 스타일)
export function DisclosureSearchBar() {
  return (
    <SearchBar className="bg-muted">
      <SearchBar.Field
        options={[{ id: "title", label: "공시명" }]}
        className="w-[120px]"
      />
      <SearchBar.SearchInput placeholder="공시명을 입력하세요" />
      <SearchBar.Actions />
    </SearchBar>
  );
}
