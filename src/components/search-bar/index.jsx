"use client";

import { cn } from "@/lib/utils";
import { SearchBarProvider } from "./context";
import { DateRange } from "./date-range";
import { Field } from "./field";
import { SearchInput } from "./input";
import { Status } from "./status";
import { Actions } from "./actions";

function SearchBar({ children, className, defaultSearchField = "searchWord" }) {
  return (
    <SearchBarProvider defaultSearchField={defaultSearchField}>
      <div className={cn("bg-blue-50 p-10 rounded-[20px]", className)}>
        {children}
      </div>
    </SearchBarProvider>
  );
}

// 하위 컴포넌트 연결
SearchBar.DateRange = DateRange;
SearchBar.Field = Field;
SearchBar.SearchInput = SearchInput;
SearchBar.Status = Status;
SearchBar.Actions = Actions;

export default SearchBar;
