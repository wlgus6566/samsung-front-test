"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  const isCurrentPath = (path) => {
    if (!mounted) return false;
    return (
      pathname === path || (path !== "/" && pathname.startsWith(path + "/"))
    );
  };

  useEffect(() => {
    if (!mounted) return;
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setCurrentMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mounted]);

  const [input, setInput] = useState("");

  const gnbMenu = [
    {
      label: "사업소개",
      url: "/business",
      children: [
        {
          label: "스마트공장 소개",
          url: "/business/about",
          description: "스마트공장의 개념과 운영 방식 소개",
        },
        {
          label: "지원 프로그램",
          url: "/business/program",
          description: "스마트공장의 개념과 운영 방식 소개",
        },
        {
          label: "지원절차 안내",
          url: "/business/process",
          description: "스마트공장의 개념과 현황 방식 소개",
        },
      ],
    },
    {
      label: "미디어&우수사례",
      url: "/media",
      children: [
        {
          label: "보도자료",
          url: "/media/press",
          description: "스마트제조혁신의 보도자료를 소개",
        },
        {
          label: "성과스토리",
          url: "/media/story",
          description: "스마트제조혁신의 성과 사례를 소개",
        },
        {
          label: "업종별 우수사례",
          url: "/media/case-by-industry",
          description: "스마트제조혁신의 업종별 우수사례를 소개",
        },
      ],
    },
    {
      label: "인재교육",
      url: "/education",
      children: [
        {
          label: "전문가양성교육",
          url: "/education/expert",
          description: "스마트제조혁신 전문가 양성과정 소개",
        },
        {
          label: "재직자특화교육",
          url: "/education/worker",
          description: "스마트제조혁신 재직자특화 과정 소개",
        },
        {
          label: "산업·산단 벤처기업",
          url: "/education/venture",
          description: "스마트제조혁신 산업 및 벤처기업 교육 소개",
        },
        {
          label: "우수기업 벤처기업",
          url: "/education/excellent",
          description: "스마트제조혁신 우수기업 벤처기업 교육 소개",
        },
      ],
    },
    {
      label: "스마트제조엑스포",
      url: "/expo",
      children: [
        {
          label: "스마트제조엑스포 소개",
          url: "/expo/about",
          description: "스마트제조엑스포 소개",
        },
        {
          label: "스마트제조엑스포 참여안내",
          url: "/expo/guide",
          description: "스마트제조엑스포 참여안내",
        },
      ],
    },
    {
      label: "동향/성장",
      url: "/trend",
      children: [
        {
          label: "판로지원",
          url: "/trend/market",
          description: "스마트제조혁신의 판로지원 동향 소개",
        },
        {
          label: "고객분석 마당",
          url: "/trend/customer",
          description: "스마트제조혁신 고객분석 동향 소개",
        },
        {
          label: "글로벌 홍보/방송",
          url: "/trend/global",
          description: "스마트제조혁신 글로벌 홍보 소개",
        },
      ],
    },
    {
      label: "고객지원",
      url: "/support",
      children: [
        {
          label: "공지",
          url: "/support/notice",
          description: "스마트제조혁신 공지사항",
        },
        {
          label: "자료실",
          url: "/support/resources",
          description: "스마트제조혁신 관련 자료실",
        },
        {
          label: "FAQ",
          url: "/support/faq",
          description: "자주 묻는 질문 모음",
        },
        {
          label: "1:1 문의",
          url: "/support/qna",
          description: "개별 문의를 위한 1:1 상담",
        },
      ],
    },
  ];

  const handleMenuMouseEnter = (menuIndex) => {
    setCurrentMenuIndex(menuIndex);
  };

  const handleHeaderMouseLeave = () => {
    setCurrentMenuIndex(null);
  };

  return (
    <div
      className={`header-wrapper z-50 sticky top-0 left-0 right-0 w-full bg-white mx-auto`}
      ref={headerRef}
      onMouseLeave={handleHeaderMouseLeave}
    >
      <div className="relative flex items-center justify-between container-fixed px-30">
        <div className="flex items-center gap-15">
          <Link href="/" className="w-[111px] h-10 bg-red-500">
            삼스공
          </Link>
          <nav>
            <ul className="gnb-menu flex items-center gap-10">
              {gnbMenu.map((menuItem, menuIndex) => {
                const isActiveMenu =
                  mounted &&
                  (isCurrentPath(menuItem.url) ||
                    (menuItem.children &&
                      menuItem.children.some((sub) => isCurrentPath(sub.url))));

                return (
                  <li
                    key={menuIndex}
                    className={`menu-item relative h-full flex items-center`}
                    onMouseEnter={() => handleMenuMouseEnter(menuIndex)}
                  >
                    <Link
                      href={menuItem.url || menuItem.children[0]?.url || "/"}
                      className={cn(
                        "body-3 flex items-center h-full transition-colors duration-200 py-9",
                        mounted &&
                          (menuIndex === currentMenuIndex || isActiveMenu)
                          ? "text-primary-blue"
                          : "text-black hover:text-primary-blue"
                      )}
                    >
                      {menuItem.label}
                    </Link>
                    {mounted &&
                      (menuIndex === currentMenuIndex || isActiveMenu) && (
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-blue z-20"></div>
                      )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
        <div className="search-area">
          <Input
            type="search"
            className="w-80"
            inputClassName="rounded-full"
            value={input}
            placeholder="키워드로 검색해보세요."
            onChange={(e) => setInput(e.target.value)}
            onSearch={() => {}}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                console.log("Enter");
              }
            }}
          />
        </div>
      </div>

      {mounted &&
        currentMenuIndex !== null &&
        gnbMenu[currentMenuIndex]?.children && (
          <div
            className="mega-menu-wrapper absolute top-25 left-0 w-full bg-white z-10 border-t border-gray-300"
            onMouseEnter={() => handleMenuMouseEnter(currentMenuIndex)}
            onMouseLeave={handleHeaderMouseLeave}
          >
            <div className="ml-[296px] flex flex-row gap-25">
              {gnbMenu[currentMenuIndex].children.map(
                (subMenuItem, subMenuIndex) => (
                  <div key={subMenuIndex} className="flex flex-col gap-1">
                    <Link
                      href={subMenuItem.url}
                      onClick={() => setCurrentMenuIndex(null)}
                      className={cn(
                        "py-13 ",
                        isCurrentPath(subMenuItem.url)
                          ? "text-primary-blue"
                          : "text-black hover:text-primary-blue"
                      )}
                    >
                      <span className="body-3 font-semibold">
                        {subMenuItem.label}
                      </span>
                      {subMenuItem.description && (
                        <p className="body-5 text-gray-500 mt-1">
                          {subMenuItem.description}
                        </p>
                      )}
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      <style jsx>{`
        .header-wrapper {
          border-bottom: 1px solid #eee;
        }
      `}</style>
    </div>
  );
}
