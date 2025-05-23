"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import Link from "next/link";

const BoardTable = ({ data, className, onRowClick }) => {
  // 반응형을 위한 화면 크기 확인
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 로드 시 화면 크기 확인
    checkScreenSize();

    // 리사이즈 이벤트 리스너 등록
    window.addEventListener("resize", checkScreenSize);

    // 클린업 함수
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // 데이터가 없을 경우
  if (!data || data.length === 0) {
    return (
      <div className="w-full py-16 text-center text-gray-500 body3">
        등록된 게시물이 없습니다.
      </div>
    );
  }

  // 모바일 화면에서는 다른 레이아웃 사용
  if (isMobile) {
    return (
      <div className={cn("space-y-4", className)}>
        {data.map((item, index) => (
          <div
            key={index}
            className="border-b border-gray-200 pb-4"
            onClick={() => onRowClick && onRowClick(item)}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600 body4">{item.category}</span>
              <span className="text-gray-500 body5">{item.date}</span>
            </div>
            <h3 className="body3 font-medium mb-2 line-clamp-2">
              {item.href ? (
                <Link href={item.href} className="hover:text-primary-blue">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </h3>
            <div className="text-right">
              <span className="text-gray-500 body5">No. {item.id}</span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 데스크톱 테이블 레이아웃
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="w-20">No.</TableHead>
          <TableHead className="w-40">카테고리</TableHead>
          <TableHead>제목</TableHead>
          <TableHead className="w-40">등록일</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            className="cursor-pointer"
            onClick={() => onRowClick && onRowClick(item)}
          >
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.category}</TableCell>
            <TableCell className="text-left font-medium">
              {item.href ? (
                <Link href={item.href} className="hover:text-primary-blue">
                  {item.title}
                </Link>
              ) : (
                item.title
              )}
            </TableCell>
            <TableCell>{item.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BoardTable;
