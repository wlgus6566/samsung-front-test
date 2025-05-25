import React, { useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
function Board({
  data = [],
  totalCount = 0,
  filterOptions = [],
  onFilterChange = () => {},
}) {
  const [currentFilter, setCurrentFilter] = useState(filterOptions[0]?.value);
  const handleFilterChange = (value) => {
    onFilterChange(value);
  };

  return (
    <div className="mt-20.5 max-md:mt-11">
      <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-1 body4 font-medium text-black">
          총
          <span className="body5 font-medium font-poppins text-blue-500 ml-1 mt-0.75">
            {totalCount.toLocaleString()}
          </span>
          건
        </div>
        {filterOptions.length > 0 && (
          <Select
            onValueChange={handleFilterChange}
            defaultValue={currentFilter}
            items={filterOptions}
            placeholder="정렬 선택"
          >
            <SelectTrigger
              iconColor="text-black"
              className="!text-xs font-semibold text-gray-900 border-none shadow-none p-0 h-auto gap-1 hover:bg-transparent focus:ring-0 w-20"
            >
              <SelectValue placeholder="정렬 선택" />
            </SelectTrigger>
            <SelectContent className="w-25">
              {filterOptions.map((option) => (
                <SelectItem
                  className="w-25"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="border-t border-black">
        <div className="flex py-4 border-b border-gray-300 items-center max-md:hidden">
          <div className="w-20 px-5 text-center flex-shrink-0 body2 font-medium font-poppins">
            No.
          </div>
          <div className="body2 font-semibold pl-5 w-full box-border text-center">
            제목
          </div>
          <div className="body2 font-semibold w-[152px] px-5 text-center">
            등록일
          </div>
        </div>

        <ul>
          {data.length > 0 ? (
            <>
              {data.map((item, index) => (
                <li
                  key={index}
                  className="flex md:py-4 border-b border-gray-300 items-center max-md:flex-col max-md:py-4"
                >
                  <div className="w-20 px-5 text-center flex-shrink-0 body5 max-md:hidden">
                    {index + 1}
                  </div>
                  <div className="body3 px-5 w-full box-border max-md:px-0 max-md:mt-1.5 line-clamp-1">
                    <Link href={item.url} className="hover:text-blue-600">
                      {item.title}
                    </Link>
                  </div>
                  <div className="body5 px-5 font-poppins font-medium w-[152px] text-center max-md:text-left max-md:px-0 max-md:w-full max-md:flex-row-reverse max-md:mt-2">
                    {item.date}
                  </div>
                </li>
              ))}
            </>
          ) : (
            <li className="block py-20 text-xl font-light leading-8 text-center max-md:py-8 max-md:text-sm max-md:leading-6">
              등록된 글이 없습니다.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Board;
