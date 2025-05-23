"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Img from "./img";
import { useBreakpoint } from "@/hooks/use-breakpoint";

export default function Pagination({
  pageNum = 1,
  pageSize = 10,
  totalCount = 1,
  goToPage,
}) {
  const pageNumInt = Number(pageNum);
  const totalPageSize = Math.ceil(totalCount / pageSize);
  const totalPageSizeInt = Number(totalPageSize);
  const device = useBreakpoint();
  const [localPageNum, setLocalPageNum] = useState(pageNumInt);

  useEffect(() => {
    setLocalPageNum(pageNumInt);
  }, [pageNumInt]);

  const router = useRouter();
  const searchParams = useSearchParams();

  const pageList = useMemo(() => {
    let pageLength = 5;
    const currentGroup = Math.ceil(localPageNum / pageLength);
    const startPage = (currentGroup - 1) * pageLength + 1;

    let num = [];
    for (let i = 0; i < pageLength; i++) {
      const page = startPage + i;
      if (page <= totalPageSizeInt) {
        num.push(page);
      }
    }

    return num;
  }, [totalPageSizeInt, localPageNum, pageSize]);

  const goPage = (num) => {
    if (num < 1 || num > totalPageSizeInt) {
      return;
    }
    setLocalPageNum(num);
    if (typeof goToPage === "function") {
      goToPage(num);
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set("currentPage", num.toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  // 이전 페이지로 이동
  const goToPrevPage = () => {
    if (localPageNum > 1) {
      goPage(localPageNum - 1);
    }
  };

  const goToNextPage = () => {
    if (localPageNum < totalPageSizeInt) {
      goPage(localPageNum + 1);
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 px-[16px] h-[40px] mt-[60px]">
      {device !== "mobile" && (
        <button
          type="button"
          onClick={() => {
            goPage(1);
          }}
          disabled={localPageNum === 1}
        >
          <Img
            src={`/images/icon/ic_page_pprev_${
              localPageNum === 1 ? "disabled" : "black"
            }.svg`}
            alt="처음으로"
            width={32}
            height={32}
            className={`${localPageNum === 1 ? "cursor-not-allowed" : ""} `}
            key={`pprev-${localPageNum === 1 ? "disabled" : "black"}`}
          />
        </button>
      )}
      <button
        type="button"
        onClick={goToPrevPage}
        disabled={localPageNum === 1}
      >
        <Img
          src={`/images/icon/ic_page_prev_${
            localPageNum === 1 ? "disabled" : "black"
          }.svg`}
          alt="이전"
          width={32}
          height={32}
          className={`${localPageNum === 1 ? "cursor-not-allowed" : ""} `}
          key={`prev-${localPageNum === 1 ? "disabled" : "black"}`}
        />
      </button>
      <div className="box flex gap-2 mx-3">
        {pageList.map((el) => {
          return (
            <button
              type="button"
              className={`${
                localPageNum === el ? "active" : ""
              } body5 rounded-[8px] w-8 h-8 flex justify-center items-center ${
                localPageNum === el
                  ? "bg-blue-50 text-gray-800"
                  : "bg-white text-gray-700"
              } font-bold`}
              key={el}
              onClick={() => {
                goPage(el);
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={localPageNum === totalPageSizeInt}
      >
        <Img
          src={`/images/icon/ic_page_prev_${
            localPageNum === totalPageSizeInt || totalPageSizeInt == 0
              ? "disabled"
              : "black"
          }.svg`}
          className={`${
            localPageNum === totalPageSizeInt ? "cursor-not-allowed" : ""
          } rotate-180`}
          alt="다음"
          width={32}
          height={32}
          key={`next-${
            localPageNum === totalPageSizeInt ? "disabled" : "black"
          }`}
        />
      </button>
      {device !== "mobile" && (
        <button
          type="button"
          className={`btn-paginate ${
            localPageNum === totalPageSizeInt ? "cursor-not-allowed" : ""
          }`}
          onClick={() => {
            goPage(totalPageSizeInt);
          }}
          disabled={localPageNum === totalPageSizeInt}
        >
          <Img
            src={`/images/icon/ic_page_pprev_${
              localPageNum === totalPageSizeInt || totalPageSizeInt == 0
                ? "disabled"
                : "black"
            }.svg`}
            className={"rotate-180"}
            alt="마지막으로"
            width={32}
            height={32}
            key={`pprev-last-${
              localPageNum === totalPageSizeInt ? "disabled" : "black"
            }`}
          />
        </button>
      )}
    </div>
  );
}
