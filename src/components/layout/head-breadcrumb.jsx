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
export default function HeadBreadcrumb() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const segments = pathname.split("/").filter(Boolean);

  // 클라이언트 사이드에서만 실행되도록 마운트 상태 관리
  useEffect(() => {
    setMounted(true);
  }, []);

  const labelMap = {
    media: {
      _self: "미디어&우수사례",
      press: "보도자료",
      story: "성과스토리",
      case: "업종별 우수사례",
    },
    kya: {
      _self: "KYA",
      greeting: "회장 인사말",
      about: "소개",
      history: "연혁",
      ci: "CI",
      organization: "조직도",
      executives: "임원",
      branches: "시도회",
      international: "국제기구",
      sponsors: "후원사",
      regulations: "정관/규정",
      management: "경영공시",
      faq: "FAQ",
      player: "선수등록신청",
      tournament: "국내대회 참가신청",
      system: "체육정보시스템",
      schedule: "대회일정",
      results: "대회결과",
      certificate: "증명서발급",
      center: "공식인증센터",
      yoga: "요가소식",
      event: "행사 안내",
    },
    yoga: {
      _self: "요가 소식",
      notice: "공지사항",
      news: "KYA 뉴스",
      gallery: "갤러리",
      magazine: "매거진",
    },
    conference: {
      _self: "대회",
      sports: "종목",
      domestic: "국내",
      international: "국제",
      leisure: "생활체육",
      schedule: "대회 일정",
      results: "대회 결과",
    },
    event: {
      _self: "행사",
      info: "행사 안내",
      "yoga-day": "세계 요가의 날",
      "meditation-day": "세계 명상의 날",
      "yoga-mala": "요가 말라 프로젝트",
      seminar: "세미나 ∙ 워크숍",
    },
    member: {
      _self: "회원",
      about: "회원이란",
      education: "인증교육기관",
      centers: "공식인증센터",
      instructors: "강사",
      practitioners: "수련자",
      judges: "심판",
      athletes: "선수",
    },
    dashboard: { _self: "대시보드" },
    models: { _self: "모델" },
    magazine: { _self: "매거진" },
    settings: { _self: "설정" },
    users: { _self: "사용자" },
    history: { _self: "행사" },
    test: { _self: "테스트" },
  };

  return (
    <div className="flex justify-end">
      <Breadcrumb className="flex items-center py-3.75">
        <BreadcrumbList className="text-md flex items-center">
          <BreadcrumbLink href="/" className="flex items-center gap-1">
            <Img
              src="/images/icon/ic_inverse_home.svg"
              alt="home"
              width={12}
              height={12}
              priority={true}
            />
            홈
          </BreadcrumbLink>
          {mounted &&
            segments.map((segment, index) => {
              if (!isNaN(Number(segment))) {
                return null;
              }
              const href = "/" + segments.slice(0, index + 1).join("/");
              let label;

              // 첫 번째 depth는 항상 그 자체 라벨 사용
              if (index === 0) {
                label = labelMap[segment]?._self || decodeURIComponent(segment);
              }
              // 두 번째 이상의 depth일 경우 부모 객체 안에서 찾기
              else {
                const parentSegment = segments[0];
                label =
                  labelMap[parentSegment]?.[segment] ||
                  decodeURIComponent(segment);
              }

              const isLast = index === segments.length - 1;
              return (
                <Fragment key={href}>
                  <BreadcrumbSeparator className="mx-[6px]">
                    <Img
                      src="/images/icon/ic_default_right_angle.svg"
                      alt="chevron-right"
                      width={24}
                      height={24}
                      priority={true}
                    />
                  </BreadcrumbSeparator>
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{label}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink href={href} asChild>
                        <Link href={href}>{label}</Link>
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
