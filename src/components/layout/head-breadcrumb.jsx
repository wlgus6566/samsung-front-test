"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import { data } from "@/components/layout/app-sidebar";
import { cn } from "@/lib/utils";

export default function HeadBreadcrumb() {
  const pathname = usePathname();
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    if (pathname) {
      setSegments(pathname.split("/").filter(Boolean));
    }
  }, [pathname]);

  // 네비게이션 데이터를 기반으로 경로에 해당하는 레이블을 찾는 함수
  const findLabelByPath = (path) => {
    // 전체 경로 생성 (예: "/news/notices")
    const fullPath = `/${path}`;

    // 메인 아이템 확인
    for (const item of data.navMain) {
      // 메인 아이템의 URL이 정확히 일치하는 경우
      if (item.url === fullPath) {
        return item.title;
      }

      // 메인 아이템의 URL이 현재 경로의 일부인 경우 서브아이템 확인
      if (fullPath.startsWith(item.url) && item.items) {
        for (const subItem of item.items) {
          if (subItem.url === fullPath) {
            return subItem.title;
          }
        }
      }
    }

    // 매핑된 항목이 없으면 마지막 세그먼트를 디코딩해서 사용
    const lastSegment = path.split("/").pop();
    return decodeURIComponent(lastSegment);
  };

  // 서버 렌더링 시 빈 breadcrumb 반환
  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList />
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const path = segments.slice(0, index + 1).join("/");
          const href = `/${path}`;
          const label = findLabelByPath(path);
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                <BreadcrumbPage className={cn(!isLast && "text-gray-500")}>
                  {label}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
