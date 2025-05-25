"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { gnbMenu } from "@/constants/navigation";

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

  // 태블릿 검색 관련 상태
  const [isTabletSearchOpen, setIsTabletSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");

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
    if (isMobileMenuOpen || isTabletSearchOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isTabletSearchOpen]);

  useEffect(() => {
    if (isMobileMenuOpen) {
    }
  }, [pathname, isMobileMenuOpen]);

  const [input, setInput] = useState("");

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
      setSearchInput("");
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
    setSearchInput("");
  };

  // 태블릿 검색 관련 함수들
  const showTabletSearch = () => {
    setIsTabletSearchOpen(true);
  };

  const hideTabletSearch = () => {
    setIsTabletSearchOpen(false);
    setSearchInput("");
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
                          "body4 flex items-center h-full transition-colors duration-200 py-9 whitespace-nowrap",
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
          {/* 태블릿 검색 버튼 */}
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
              className="w-12 h-12 hidden min-[1100px]:flex 2xl:hidden border border-gray-300 rounded-full items-center justify-center"
              type="button"
              onClick={showTabletSearch}
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

      {/* 태블릿 검색 오버레이 */}
      {mounted && (
        <div
          className={cn(
            "fixed inset-0 z-[200] bg-white transition-opacity duration-300",
            isTabletSearchOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}
        >
          {/* 반투명 배경 */}
          <div
            className="absolute inset-0 bg-black/25"
            onClick={hideTabletSearch}
          />

          {/* 검색 컨테이너 */}
          <div className="relative z-10 flex flex-col h-full">
            {/* 헤더 */}
            <div className="flex items-center justify-between h-25 px-8 lg:px-30 bg-white border-b border-gray-300">
              <Link href="/" className="flex items-center">
                <Img
                  src="/temp/logo.png"
                  alt="삼성 스마트공장"
                  width={111}
                  height={40}
                />
              </Link>
              <button
                type="button"
                onClick={hideTabletSearch}
                className="w-6 h-6 flex items-center justify-center"
                aria-label="검색 닫기"
              >
                <Img
                  src="/images/icon/ic_default_close.svg"
                  alt="close"
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* 검색 콘텐츠 */}
            <div className="flex-1 flex justify-center items-start">
              <div className="bg-white w-full flex justify-center pb-13 px-5 mt-[-1px]">
                <div className="w-full max-w-[792px] flex flex-col gap-6">
                  {/* 검색 입력창 */}
                  <Input
                    type="search"
                    placeholder="내용을 입력해 주세요"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        console.log("Tablet Search Enter:", searchInput);
                      }
                    }}
                  />

                  {/* 추천 검색어 */}
                  <div className="flex flex-col gap-3">
                    <h3 className="body3 font-semibold text-black">
                      추천 검색어
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {recommendedKeywords.map((keyword, index) => (
                        <Button
                          key={index}
                          variant={
                            searchInput === keyword ? "primary" : "outline"
                          }
                          size="sm"
                          className={
                            searchInput === keyword
                              ? "text-white"
                              : "text-gray-800"
                          }
                          onClick={() => {
                            setSearchInput(keyword);
                            console.log("Recommended keyword search:", keyword);
                          }}
                        >
                          {keyword}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      console.log("Mobile Search Enter:", searchInput);
                    }
                  }}
                  inputClassName="h-12 rounded-full pl-4 pr-12 body5"
                  icon={
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700"
                      onClick={() => {
                        console.log("Mobile Search Click:", searchInput);
                      }}
                      aria-label="검색 실행"
                    >
                      <Img
                        src="/images/icon/ic_default_search.svg"
                        alt="search"
                        width={24}
                        height={24}
                      />
                    </button>
                  }
                />
                <div className="mt-4">
                  <h3 className="body4 font-semibold">추천 검색어</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {recommendedKeywords.map((keyword, index) => (
                      <Button
                        key={index}
                        variant={
                          searchInput === keyword ? "primary" : "outline"
                        }
                        size="sm"
                        className={
                          searchInput === keyword
                            ? "text-white"
                            : "text-gray-800"
                        }
                        onClick={() => {
                          setSearchInput(keyword);
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
