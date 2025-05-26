import React from "react";
import { formatDate } from "@/lib/utils";
export default function PostHeader({
  title,
  registerName = "대한요가회",
  registrationDt = "2024.08.05",
  inquiryCount = "106회",
}) {
  return (
    <>
      {/* 제목 */}
      <h1 className="text-[44px] leading-[1] font-bold">{title}</h1>

      {/* 작성자 / 작성일 / 조회수 */}
      <ul className="flex text-[16px] leading-[26px] text-[#999] mt-[20px] border-b-2 border-black pb-[40px]">
        <li className="flex gap-[4px]">
          <span className="font-bold">작성자</span>
          <span>{registerName}</span>
        </li>
        <li className="flex gap-[4px] before:content-['|'] before:mx-[16px] before:text-[#eee]">
          <span className="font-bold">작성일</span>
          <span>{formatDate(registrationDt)}</span>
        </li>
        <li className="flex gap-[4px] before:content-['|'] before:mx-[16px] before:text-[#eee]">
          <span className="font-bold">조회</span>
          <span>{inquiryCount}</span>
          <span className="font-bold">회</span>
        </li>
      </ul>
    </>
  );
}
