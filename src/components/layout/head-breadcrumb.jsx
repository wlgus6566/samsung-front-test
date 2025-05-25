"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import Img from "@/components/ui/img";
import Link from "next/link";
import { generateBreadcrumb } from "@/constants/navigation";

export default function HeadBreadcrumb() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [breadcrumbItems, setBreadcrumbItems] = useState([]);

  // 클라이언트 사이드에서만 실행되도록 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
    if (pathname) {
      const items = generateBreadcrumb(pathname);
      setBreadcrumbItems(items);
    }
  }, [pathname]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="absolute top-0 right-[15px] flex justify-end">
      <Breadcrumb className="flex items-center py-3.75">
        <BreadcrumbList className="text-md flex items-center">
          <BreadcrumbLink href="/">
            <Img
              src="/images/icon/ic_home.svg"
              alt="home"
              width={16}
              height={16}
              priority={true}
            />
          </BreadcrumbLink>
          {breadcrumbItems.slice(1).map((item, index) => {
            const isLast = index === breadcrumbItems.length - 2;
            return (
              <Fragment key={item.url}>
                <BreadcrumbSeparator className="mx-1">
                  <Img
                    src="/images/icon/ic_right_angle_16.svg"
                    alt="chevron-right"
                    width={16}
                    height={16}
                    priority={true}
                  />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.url} asChild>
                      <Link href={item.url}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
