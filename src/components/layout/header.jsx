"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  XIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SearchIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Img from "@/components/ui/img";
export default function Header() {
  const [currentMenuIndex, setCurrentMenuIndex] = useState(null);
  const [mounted, setMounted] = useState(false);
  const headerRef = useRef(null);
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileSubMenuIndex, setOpenMobileSubMenuIndex] = useState(null);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchInput, setMobileSearchInput] = useState("");

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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
    }
  }, [pathname, isMobileMenuOpen]);

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
          description: "스마트공장 지원 프로그램 안내",
        },
        {
          label: "현황 제안",
          url: "/business/status",
          description: "스마트공장 현황 제안",
        },
        {
          label: "스마트365센터 안내",
          url: "/business/center",
          description: "스마트365센터 이용 안내",
        },
        {
          label: "지원절차 안내",
          url: "/business/process",
          description: "스마트공장 지원절차 안내",
        },
        {
          label: "갤러리탭",
          url: "/business/gallery",
          description: "스마트공장 갤러리",
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
          label: "보도자료 상세",
          url: "/media/press/detail",
          description: "스마트제조혁신의 보도자료 상세내용",
        },
        {
          label: "성공스토리",
          url: "/media/story",
          description: "스마트제조혁신의 성공 사례를 소개",
        },
        {
          label: "업종별 우수사례",
          url: "/media/case-by-industry",
          description: "스마트제조혁신의 업종별 우수사례를 소개",
        },
        {
          label: "업종별 우수사례 상세",
          url: "/media/case-by-industry/detail",
          description: "업종별 우수사례 상세 내용",
        },
      ],
    },
    {
      label: "인재교육(인적양성)",
      url: "/education",
      children: [
        {
          label: "전문가양성교육",
          url: "/education/expert",
          description: "스마트제조혁신 전문가 양성과정 소개",
        },
        {
          label: "직무별특화교육",
          url: "/education/worker",
          description: "스마트제조혁신 직무별 특화 과정 소개",
        },
        {
          label: "삼성 사업장 벤치마킹",
          url: "/education/samsung",
          description: "삼성 사업장 벤치마킹 교육 안내",
        },
        {
          label: "우수기업 벤치마킹",
          url: "/education/excellent",
          description: "우수기업 벤치마킹 교육 안내",
        },
        {
          label: "우수기업 벤치마킹 신청",
          url: "/education/excellent/apply",
          description: "우수기업 벤치마킹 신청 페이지",
        },
      ],
    },
    {
      label: "스마트비즈엑스포",
      url: "/expo",
      children: [
        {
          label: "스마트비즈엑스포 소개",
          url: "/expo/about",
          description: "스마트비즈엑스포 소개",
        },
        {
          label: "스마트비즈엑스포 참여안내",
          url: "/expo/guide",
          description: "스마트비즈엑스포 참여안내",
        },
        {
          label: "스마트비즈엑스포 신청",
          url: "/expo/apply",
          description: "스마트비즈엑스포 참가 신청",
        },
      ],
    },
    {
      label: "동반성장",
      url: "/growth",
      children: [
        {
          label: "판로지원",
          url: "/growth/market",
          description: "판로지원 프로그램 안내",
        },
        {
          label: "판로지원 신청",
          url: "/growth/market/apply",
          description: "판로지원 프로그램 신청",
        },
        {
          label: "교차협력 마당",
          url: "/growth/cooperation",
          description: "교차협력 마당 안내",
        },
        {
          label: "교차협력 사용 신청",
          url: "/growth/cooperation/apply",
          description: "교차협력 사용 신청",
        },
        {
          label: "글로벌 홍보 방송",
          url: "/growth/global",
          description: "글로벌 홍보 방송 안내",
        },
        {
          label: "어워즈 TV 신청",
          url: "/growth/awards",
          description: "어워즈 TV 신청",
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
          label: "상세",
          url: "/support/notice/detail",
          description: "공지사항 상세보기",
        },
        {
          label: "자료실",
          url: "/support/resources",
          description: "스마트제조혁신 관련 자료실",
        },
        {
          label: "상세",
          url: "/support/resources/detail",
          description: "자료실 상세보기",
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

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    if (!newState) {
      setOpenMobileSubMenuIndex(null);
      setIsMobileSearchOpen(false);
      setMobileSearchInput("");
    }
  };

  const handleMobileMenuClick = (menuIndex) => {
    if (
      !gnbMenu[menuIndex].children ||
      gnbMenu[menuIndex].children.length === 0
    ) {
      return;
    }
    setOpenMobileSubMenuIndex(
      openMobileSubMenuIndex === menuIndex ? null : menuIndex
    );
  };

  const handleMobileLinkClick = () => {
    toggleMobileMenu();
  };

  const showMobileSearch = () => {
    setIsMobileSearchOpen(true);
  };

  const hideMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setMobileSearchInput("");
  };

  const recommendedKeywords = [
    "스마트공장이란?",
    "스마트공장 지원절차",
    "기업을 위한 제휴 혜택",
    "기업을 위한 교육 혜택",
    "1:1 문의하기",
    "자료실",
    "성과리포트",
    "FAQ",
    "공지사항",
    "프로그램",
  ];

  return (
    <>
      <div
        className={`header-wrapper z-50 sticky top-0 left-0 right-0 w-full bg-white mx-auto border-b border-gray-300`}
        ref={headerRef}
        onMouseLeave={handleHeaderMouseLeave}
      >
        <div className="relative h-25 flex items-center justify-between max-w-[1760px] mx-auto px-5 sm:px-10">
          <div className="flex items-center gap-15">
            <Link href="/" className="flex items-center">
              <Img
                src="/temp/logo.png"
                alt="삼성 스마트공장"
                width={111}
                height={40}
                priority
              />
            </Link>
            <nav>
              <ul className="hidden min-[1100px]:flex gnb-menu items-center gap-10">
                {gnbMenu.map((menuItem, menuIndex) => {
                  const isActiveMenu =
                    mounted &&
                    (isCurrentPath(menuItem.url) ||
                      (menuItem.children &&
                        menuItem.children.some((sub) =>
                          isCurrentPath(sub.url)
                        )));

                  return (
                    <li
                      key={menuIndex}
                      className={`menu-item relative h-full flex items-center`}
                      onMouseEnter={() => handleMenuMouseEnter(menuIndex)}
                    >
                      <Link
                        href={menuItem.url || menuItem.children[0]?.url || "/"}
                        className={cn(
                          "text-sm flex items-center h-full transition-colors duration-200 py-9 whitespace-nowrap",
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
          <div className="flex items-center">
            <Input
              type="search"
              className="w-80 hidden 2xl:block"
              inputClassName="rounded-full"
              value={input}
              placeholder="키워드로 검색해보세요."
              onChange={(e) => setInput(e.target.value)}
              onSearch={() => {}}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  console.log("Desktop Search Enter:", input);
                }
              }}
            />
            <button
              className="w-12 h-12 hidden min-[1100px]:flex 2xl:hidden border border-gray-300 rounded-full  items-center justify-center"
              type="button"
            >
              <Img
                src="/images/icon/ic_default_search.svg"
                alt="search"
                role="button"
                width={24}
                height={24}
              />
            </button>
            <button
              className="min-[1100px]:hidden p-2 -mr-2"
              type="button"
              onClick={toggleMobileMenu}
            >
              <Img
                src="/images/icon/ic_default_menu.svg"
                alt="메뉴 열기"
                width={24}
                height={24}
              />
            </button>
          </div>
        </div>

        {mounted &&
          !isMobileMenuOpen &&
          currentMenuIndex !== null &&
          gnbMenu[currentMenuIndex]?.children && (
            <div
              className="mega-menu-wrapper absolute top-25 w-full bg-white z-10 border-t border-gray-300"
              onMouseEnter={() => handleMenuMouseEnter(currentMenuIndex)}
              onMouseLeave={handleHeaderMouseLeave}
            >
              <div className="flex flex-row gap-25 max-w-[1760px] mx-auto pl-[210px]">
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
                        <span className="text-sm font-semibold">
                          {subMenuItem.label}
                        </span>
                        {subMenuItem.description && (
                          <p className="text-2xs text-gray-500 mt-1">
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
      </div>

      {mounted && (
        <div
          className={cn(
            "fixed inset-y-0 right-0 w-full bg-white z-[100] transition-transform flex flex-col",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between py-[22px] px-5 border-b border-gray-200 h-25 shrink-0">
            <Link
              href="/"
              onClick={handleMobileLinkClick}
              className="flex items-center"
            >
              <Img
                src="/temp/logo.png"
                alt="삼성 스마트공장"
                width={148}
                height={26}
              />
            </Link>
            <div className="flex items-center gap-3">
              {!isMobileSearchOpen && (
                <button
                  type="button"
                  onClick={showMobileSearch}
                  aria-label="검색 열기"
                >
                  <Img
                    src="/images/icon/ic_default_search.svg"
                    alt="search"
                    width={24}
                    height={24}
                  />
                </button>
              )}
              <button
                type="button"
                onClick={
                  isMobileSearchOpen ? hideMobileSearch : toggleMobileMenu
                }
                className="p-1 -mr-1"
                aria-label={isMobileSearchOpen ? "검색 닫기" : "메뉴 닫기"}
              >
                <Img
                  src="/images/icon/ic_default_close.svg"
                  alt="close"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto w-full">
            {isMobileSearchOpen ? (
              <div className="p-5 flex flex-col">
                <Input
                  type="search"
                  name="mobile_search"
                  placeholder="키워드로 검색해 보세요."
                  value={mobileSearchInput}
                  onChange={(e) => setMobileSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log("Mobile Search Enter:", mobileSearchInput);
                    }
                  }}
                  inputClassName="h-12 rounded-full pl-4 pr-12 text-sm"
                  icon={
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        console.log("Mobile Search Click:", mobileSearchInput);
                      }}
                      aria-label="검색 실행"
                    >
                      <SearchIcon className="size-5" />
                    </button>
                  }
                />
                <div className="mt-4">
                  <h3 className="text-xs font-semibold">추천 검색어</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recommendedKeywords.map((keyword, index) => (
                      <Button
                        key={index}
                        variant={
                          mobileSearchInput === keyword ? "primary" : "outline"
                        }
                        size="sm"
                        onClick={() => {
                          setMobileSearchInput(keyword);
                          console.log("Recommended keyword search:", keyword);
                        }}
                      >
                        {keyword}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <nav className="pt-2 pb-5">
                <ul>
                  {gnbMenu.map((menuItem, menuIndex) => (
                    <li
                      key={menuIndex}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => handleMobileMenuClick(menuIndex)}
                        className={cn(
                          "w-full flex items-center justify-between text-left py-3.5 px-5",
                          (isCurrentPath(menuItem.url) && !menuItem.children) ||
                            (openMobileSubMenuIndex === menuIndex &&
                              menuItem.children?.some((child) =>
                                isCurrentPath(child.url)
                              ))
                            ? "text-primary-blue font-semibold"
                            : "text-black",
                          openMobileSubMenuIndex === menuIndex
                            ? "font-semibold"
                            : "font-medium"
                        )}
                      >
                        <span className="text-md">{menuItem.label}</span>
                        {menuItem.children && menuItem.children.length > 0 && (
                          <Img
                            src="/images/icon/ic_default_down_angle.svg"
                            alt="toggle submenu"
                            width={24}
                            height={24}
                            className={cn(
                              "transition-transform duration-200",
                              openMobileSubMenuIndex === menuIndex
                                ? "rotate-180"
                                : ""
                            )}
                          />
                        )}
                      </button>

                      {openMobileSubMenuIndex === menuIndex &&
                        menuItem.children && (
                          <ul className="bg-blue-50 py-1">
                            {menuItem.children.map((subItem, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  href={subItem.url}
                                  onClick={handleMobileLinkClick}
                                  className={cn(
                                    "block py-2.5 px-5 text-xs",
                                    isCurrentPath(subItem.url)
                                      ? "text-primary-blue font-medium"
                                      : "text-gray-700 hover:text-primary-blue"
                                  )}
                                >
                                  {subItem.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </div>
      )}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-[99] min-[1100px]:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
