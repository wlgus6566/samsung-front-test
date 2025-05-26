"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function PostNavigation({ prevPost = null, nextPost = null }) {
  const searchParams = useSearchParams().toString();
  const router = useRouter();
  const pathname = usePathname();
  const getListPath = (pathname) => {
    const lastSlashIndex = pathname.lastIndexOf("/");
    return pathname.substring(0, lastSlashIndex);
  };
  const handleGoToList = () => {
    router.push(`${getListPath(pathname)}?${searchParams}`, {
      scroll: true,
    });
  };
  return (
    <>
      {/* 이전글 / 다음글 */}
      <div className="border-t-2 border-black">
        {prevPost && (
          <div className="flex py-[30px] border-b-1 border-[#eee]">
            <span className="mr-[40px] font-bold">이전글</span>
            <Link
              href={
                searchParams ? prevPost.url + "?" + searchParams : prevPost.url
              }
              className="hover:underline"
            >
              {prevPost.title}
            </Link>
          </div>
        )}
        {nextPost && (
          <div className="flex py-[30px] border-b-1 border-[#eee]">
            <span className="mr-[40px] font-bold">다음글</span>
            <Link
              href={
                searchParams ? nextPost.url + "?" + searchParams : nextPost.url
              }
              className="hover:underline"
            >
              {nextPost.title}
            </Link>
          </div>
        )}
      </div>

      {/* 목록 버튼 */}
      <div className="text-right mt-[30px]">
        <button
          onClick={handleGoToList}
          className="btn-more-link w-[104px] min-w-auto rounded-full px-[20px] py-[11px] leading-[24px]"
        >
          목록
        </button>
      </div>
    </>
  );
}
