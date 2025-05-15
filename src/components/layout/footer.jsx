"use client";

import React from "react";
import Link from "next/link";
// import Image from "next/image"; //  SNS 아이콘 등에 필요시 사용
// import { Instagram, Youtube, Twitter, Facebook } from "lucide-react"; // lucide-react 아이콘 예시

// 임시 아이콘 (추후 실제 아이콘으로 교체)
const InstagramIcon = () => (
  <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
    IG
  </span>
);
const YoutubeIcon = () => (
  <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
    YT
  </span>
);
const TwitterIcon = () => (
  <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
    TW
  </span>
);
const FacebookIcon = () => (
  <span className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center text-xs">
    FB
  </span>
);
const ArrowDownIcon = () => <span>⌄</span>; // 패밀리사이트용 아래 화살표
const ArrowUpIcon = () => <span>↑</span>; // 간단한 텍스트 아이콘

export default function Footer() {
  const footerMenus = [
    {
      title: "사업소개",
      links: [
        { label: "스마트공장 소개", url: "/business/about" },
        { label: "지원 프로그램", url: "/business/program" },
        { label: "지원절차 안내", url: "/business/process" },
      ],
    },
    {
      title: "미디어&우수사례",
      links: [
        { label: "보도자료", url: "/media/press" },
        { label: "성공스토리", url: "/media/story" },
        { label: "업종별 우수사례", url: "/media/case-by-industry" },
      ],
    },
    {
      title: "인재교육",
      links: [
        { label: "전문가양성교육", url: "/education/expert" },
        { label: "직무별특화교육", url: "/education/worker" },
        { label: "삼성 사업장 벤치마킹", url: "/education/venture" },
        { label: "우수기업 벤치마킹", url: "/education/excellent" },
      ],
    },
    {
      title: "스마트비즈엑스포",
      links: [
        { label: "스마트비즈엑스포 소개", url: "/expo/about" },
        { label: "스마트비즈엑스포 참여 안내", url: "/expo/guide" },
      ],
    },
    {
      title: "동반성장",
      links: [
        { label: "판로지원", url: "/trend/market" },
        { label: "교차협력 마당", url: "/trend/customer" },
        { label: "글로벌 홍보 방송", url: "/trend/global" },
      ],
    },
    {
      title: "고객지원",
      links: [
        { label: "공지", url: "/support/notice" },
        { label: "자료실", url: "/support/resources" },
        { label: "FAQ", url: "/support/faq" },
        { label: "1:1 문의", url: "/support/qna" },
      ],
    },
  ];

  const legalLinks = [
    { label: "개인정보처리방침", url: "/privacy" },
    { label: "이용약관", url: "/terms" },
    { label: "이메일무단수집거부", url: "/reject-email" },
  ];

  const snsLinks = [
    { name: "instagram", url: "#", icon: <InstagramIcon /> },
    { name: "youtube", url: "#", icon: <YoutubeIcon /> },
    { name: "twitter", url: "#", icon: <TwitterIcon /> },
    { name: "facebook", url: "#", icon: <FacebookIcon /> },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="lg:container-fixed md:px-10 px-5 bg-black text-white">
      <div className="lg:pt-12 md:pt-10 pb-10">
        <div className="hidden md:flex flex-col lg:flex-row lg:justify-between gap-4">
          <div className="flex">
            <Link href="/" className="w-[111px] h-12 bg-gray-600">
              LOGO
            </Link>
            <ul className="flex-1 grid grid-cols-6 lg:flex lg:flex-row lg:gap-x-11 md:gap-x-6 lg:ml-20">
              {footerMenus.map((menu) => (
                <li key={menu.title} className="flex flex-col gap-3 lg:gap-4">
                  <h3 className="body-3 lg:body-4 font-semibold">
                    {menu.title}
                  </h3>
                  <ul className="flex flex-col gap-1 lg:gap-1.5">
                    {menu.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.url} className="body-3 text-gray-700">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex md:absolute md:right-4 lg:relative lg-right-0 gap-4">
            <button className="w-full md:w-[168px] h-10 border border-gray-700 bg-gray-800 rounded-full flex items-center justify-between px-4 md:px-5 text-xs md:text-sm text-white hover:border-white transition-colors">
              <span>Family Site</span>
              <ArrowDownIcon />
            </button>
            <button
              onClick={scrollToTop}
              className="w-full md:w-18 h-10.5 border border-gray-700 bg-gray-800 rounded-full hidden lg:flex items-center justify-center text-2xs"
            >
              <span>TOP</span>
              <ArrowUpIcon />
            </button>
          </div>
        </div>

        {/* 모바일 상단 레이아웃 */}
        <div className="md:hidden flex flex-col gap-10">
          <Link
            href="/"
            className="block w-[111px] h-12 bg-gray-600 text-sm flex items-center justify-center"
          >
            LOGO
          </Link>
        </div>
      </div>

      {/* 하단 정보 영역 */}
      <div className="py-8 md:py-6 lg:py-5">
        {/* PC & Tablet 하단 레이아웃 */}
        <div className="hidden md:flex flex-row justify-between items-center">
          <div className="flex flex-col gap-1.25 text-gray-500 w-full">
            <div className="flex justify-between items-center w-full">
              <ul className="flex items-center gap-2.5 body-5 flex-wrap text-gray-800">
                <li>상호명 이모션글로벌</li>
                <li className="relative before:content-['|'] before:mx-2 before:text-gray-800">
                  대표 이모션
                </li>
                <li className="relative before:content-['|'] before:mx-2 before:text-gray-800">
                  사업자등록번호 123-45-67890
                </li>
                <li className="relative before:content-['|'] before:mx-2 before:text-gray-800">
                  이메일 emotion@emotion.co.kr
                </li>
                <li className="relative before:content-['|'] before:mx-2 before:text-gray-800">
                  주소 강남구 언주로 637, 싸이칸홀딩스타워
                </li>
              </ul>
              <div className="flex gap-4 self-start">
                {snsLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.url}
                    aria-label={link.name}
                    className="text-gray-400 hover:text-white"
                  >
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-2.5 mt-5 flex justify-between items-center">
              <p className="mt-2.5 text-xs lg:text-sm text-gray-500">
                © SAMSUNG SMARTWAY. All rights reserved.
              </p>
              <div className="flex items-center">
                <Link
                  href="/privacy"
                  className={`text-xs lg:text-sm font-bold`}
                >
                  개인정보처리방침
                </Link>
                <Link
                  href="/terms"
                  className={`text-xs lg:text-sm relative before:content-['|'] before:mx-5 before:text-gray-700`}
                >
                  이용약관
                </Link>
                <Link
                  href="/reject-email"
                  className={`text-xs lg:text-sm relative before:content-['|'] before:mx-5 before:text-gray-700`}
                >
                  이메일무단수집거부
                </Link>
              </div>
            </div>
          </div>
          {/* SNS 링크 (Tablet: 회사정보 우측, PC: 회사정보 우측) */}
        </div>

        {/* 모바일 하단 레이아웃 */}
        <div className="md:hidden flex flex-col gap-5">
          {/* 모바일: 패밀리사이트 버튼, SNS 아이콘이 회사정보보다 위로 이동 */}
          <div className="flex flex-col gap-3">
            <button className="w-full h-10 border border-gray-700 bg-gray-800 rounded-full flex items-center justify-between px-5 text-sm text-white">
              <span>관련사이트</span>
              <ArrowDownIcon />
            </button>
            <div className="flex gap-4 self-start">
              {snsLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.url}
                  aria-label={link.name}
                  className="text-gray-400 hover:text-white"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1 text-sm text-gray-400">
            <span>상호명 이모션글로벌</span>
            <span>대표 이모션</span>
            <span>사업자등록번호 123-45-67890</span>
            <span>이메일 emotion@emotion.co.kr</span>
            <span>주소 강남구 언주로 637, 싸이칸홀딩스타워</span>
          </div>

          <div className="mt-1 pt-4 border-t border-gray-800">
            <div className="flex flex-col items-start gap-1.25 text-xs">
              {legalLinks.map((link, index) => (
                <Link
                  key={link.label}
                  href={link.url}
                  className={`hover:text-gray-200 transition-colors ${
                    index === 0
                      ? "font-semibold text-gray-300"
                      : "text-gray-500"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <p className="mt-2.5 text-sm text-gray-500">
              © SAMSUNG SMARTWAY. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
