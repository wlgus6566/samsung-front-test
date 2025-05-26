"use client";
import React from "react";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Img from "@/components/ui/img";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col gap-15">
      {/* 이전글 / 다음글 */}
      <div className="flex justify-between items-center">
        {/* 이전글 */}
        <div className="flex items-center gap-3">
          {prevPost ? (
            <>
              <Img
                src="/images/icon/ic_default_left_angle.svg"
                alt="이전"
                width={24}
                height={24}
              />
              <span className="text-sm font-semibold text-black">이전</span>
              <Link
                href={
                  searchParams
                    ? prevPost.url + "?" + searchParams
                    : prevPost.url
                }
                className="text-sm font-medium text-gray-800 hover:text-blue-500 transition-colors"
              >
                {prevPost.title}
              </Link>
            </>
          ) : (
            <div></div>
          )}
        </div>

        {/* 다음글 */}
        <div className="flex items-center gap-3">
          {nextPost ? (
            <>
              <Link
                href={
                  searchParams
                    ? nextPost.url + "?" + searchParams
                    : nextPost.url
                }
                className="text-sm font-medium text-gray-800 hover:text-blue-500 transition-colors"
              >
                {nextPost.title}
              </Link>
              <span className="text-sm font-semibold text-black">다음</span>
              <Img
                src="/images/icon/ic_default_right_angle.svg"
                alt="다음"
                width={24}
                height={24}
              />
            </>
          ) : (
            <div></div>
          )}
        </div>
      </div>

      {/* 목록보기 버튼 */}
      <div className="flex justify-center">
        <Button
          onClick={handleGoToList}
          variant="black"
          size="lg"
          className="w-[200px]"
        >
          목록보기
        </Button>
      </div>
    </div>
  );
}
