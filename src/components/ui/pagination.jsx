"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import Img from "./img";

export default function Pagination({
  pageNum = 1,
  pageSize = 10,
  totalCount = 1,
  goToPage,
}) {
  const pageNumInt = Number(pageNum);
  const totalPageSize = Math.ceil(totalCount / pageSize);
  const totalPageSizeInt = Number(totalPageSize);

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
    <div className="flex justify-center items-center gap-[5px] px-[16px] h-[40px] mt-[60px]">
      <button
        type="button"
        onClick={() => {
          goPage(1);
        }}
        disabled={localPageNum === 1}
      >
        <Img
          src={`/images/icon/ic_page_pprev_${localPageNum === 1 ? "disabled" : "black"}.svg`}
          alt="처음으로"
          width={30}
          height={40}
          key={`pprev-${localPageNum === 1 ? "disabled" : "black"}`}
        />
      </button>
      <button
        type="button"
        onClick={goToPrevPage}
        disabled={localPageNum === 1}
      >
        <Img
          src={`/images/icon/ic_page_prev_${localPageNum === 1 ? "disabled" : "black"}.svg`}
          alt="이전"
          width={30}
          height={40}
          key={`prev-${localPageNum === 1 ? "disabled" : "black"}`}
        />
      </button>
      <div className="box flex gap-[5px]">
        {pageList.length > 0 ? (
          pageList.map((el) => {
            return (
              <button
                type="button"
                className={`$${
                  localPageNum === el ? "active" : ""
                } rounded-[50%] w-[40px] h-[40px] flex justify-center items-center ${
                  localPageNum === el
                    ? "bg-primary text-white"
                    : "bg-white text-gray-800"
                } font-bold`}
                key={el}
                onClick={() => {
                  goPage(el);
                }}
              >
                {el}
              </button>
            );
          })
        ) : (
          <div className="rounded-[50%] w-[40px] h-[40px] flex justify-center items-center bg-primary text-white">
            1
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={goToNextPage}
        disabled={localPageNum === totalPageSizeInt}
      >
        <Img
          src={`/images/icon/ic_page_prev_${localPageNum === totalPageSizeInt || totalPageSizeInt == 0 ? "disabled" : "black"}.svg`}
          alt="다음"
          className="rotate-180"
          width={30}
          height={40}
          key={`next-${localPageNum === totalPageSizeInt ? "disabled" : "black"}`}
        />
      </button>
      <button
        type="button"
        className="btn-paginate"
        onClick={() => {
          goPage(totalPageSizeInt);
        }}
        disabled={localPageNum === totalPageSizeInt}
      >
        <Img
          src={`/images/icon/ic_page_pprev_${localPageNum === totalPageSizeInt || totalPageSizeInt == 0 ? "disabled" : "black"}.svg`}
          alt="마지막으로"
          className="rotate-180"
          width={30}
          height={40}
          key={`pprev-last-${localPageNum === totalPageSizeInt ? "disabled" : "black"}`}
        />
      </button>
    </div>
  );
}
