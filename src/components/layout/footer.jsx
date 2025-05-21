"use client";

import React from "react";
import Link from "next/link";
import Img from "@/components/ui/img";
import { FamilySelect } from "@/components/ui/family-select";

export default function Footer() {
  const footerMenus = [
    {
      title: "사업소개",
      links: [
        { label: "스마트공장 소개", url: "/business/about" },
        { label: "지원 프로그램", url: "/business/program" },
        { label: "현황 제안", url: "/business/status" },
        { label: "스마트365센터 안내", url: "/business/center" },
        { label: "지원절차 안내", url: "/business/process" },
        { label: "갤러리탭", url: "/business/gallery" },
      ],
    },
    {
      title: "미디어&우수사례",
      links: [
        { label: "보도자료", url: "/media/press" },
        { label: "보도자료 상세", url: "/media/press/detail" },
        { label: "성공스토리", url: "/media/story" },
        { label: "업종별 우수사례", url: "/media/case-by-industry" },
        {
          label: "업종별 우수사례 상세",
          url: "/media/case-by-industry/detail",
        },
      ],
    },
    {
      title: "인재교육(인적양성)",
      links: [
        { label: "전문가양성교육", url: "/education/expert" },
        { label: "직무별특화교육", url: "/education/worker" },
        { label: "삼성 사업장 벤치마킹", url: "/education/samsung" },
        { label: "우수기업 벤치마킹", url: "/education/excellent" },
        { label: "우수기업 벤치마킹 신청", url: "/education/excellent/apply" },
      ],
    },
    {
      title: "스마트비즈엑스포",
      links: [
        { label: "스마트비즈엑스포 소개", url: "/expo/about" },
        { label: "스마트비즈엑스포 참여안내", url: "/expo/guide" },
        { label: "스마트비즈엑스포 신청", url: "/expo/apply" },
      ],
    },
    {
      title: "동반성장",
      links: [
        { label: "판로지원", url: "/growth/market" },
        { label: "판로지원 신청", url: "/growth/market/apply" },
        { label: "교차협력 마당", url: "/growth/cooperation" },
        { label: "교차협력 사용 신청", url: "/growth/cooperation/apply" },
        { label: "글로벌 홍보 방송", url: "/growth/global" },
        { label: "어워즈 TV 신청", url: "/growth/awards" },
      ],
    },
    {
      title: "고객지원",
      links: [
        { label: "공지", url: "/support/notice" },
        { label: "상세", url: "/support/notice/detail" },
        { label: "자료실", url: "/support/resources" },
        { label: "상세", url: "/support/resources/detail" },
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
    {
      name: "instagram",
      url: "#",
      icon: (
        <Img
          src="/images/icon/ic_inverse_instagram.svg"
          alt="instagram"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "youtube",
      url: "#",
      icon: (
        <Img
          src="/images/icon/ic_inverse_youtube.svg"
          alt="youtube"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "twitter",
      url: "#",
      icon: (
        <Img
          src="/images/icon/ic_inverse_twitter.svg"
          alt="twitter"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "facebook",
      url: "#",
      icon: (
        <Img
          src="/images/icon/ic_inverse_facebook.svg"
          alt="facebook"
          width={24}
          height={24}
        />
      ),
    },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="sm:pt-[62px] sm:pb-13 py-10 lg:py-12 bg-black text-white">
      <div className="max-w-[1920px] mx-auto px-5 sm:px-10 lg:px-30">
        <div className="hidden sm:flex flex-row justify-between">
          <ul className="flex-1 flex space-between lg:gap-x-11 gap-y-10 gap-x-[38px]">
            {footerMenus.map((menu) => (
              <li key={menu.title} className="flex flex-col gap-3 lg:gap-4">
                <h3 className="body-3 font-semibold whitespace-nowrap tracking-[-0.05rem]">
                  <Link href={menu.links[0].url}>{menu.title}</Link>
                </h3>
                <ul className="flex-col gap-1 lg:gap-1.5 min-[1600px]:flex hidden">
                  {menu.links.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url} className="body-3 text-gray-700">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <div className="hidden min-[1100px]:flex gap-4">
            <FamilySelect
              options={[
                {
                  label: "FAMILY SITE",
                  value: "family",
                },
              ]}
              theme={"dark"}
              placeholder="FAMILY SITE"
              className="w-[206px] h-12 "
            />
            <button
              onClick={scrollToTop}
              className="w-18 h-12 bg-fill-inverse-muted rounded-[20px] flex items-center justify-center body-5"
            >
              <span>TOP</span>
              <Img
                src="/images/icon/ic_inverse_top_arrow.svg"
                alt="arrow-up"
                width={16}
                height={16}
              />
            </button>
          </div>
        </div>
        <div className="pt-0 sm:pt-10 flex flex-col gap-1.25 text-gray-500 w-full">
          <div className="flex flex-wrap sm:gap-y-5 gap-y-15 justify-between items-center w-full">
            <ul className="flex items-center body-5 flex-wrap text-gray-800">
              <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
                상호명 삼성전자
              </li>
              <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
                대표 한종희
              </li>
              <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
                사업자등록번호 123-45-67890
              </li>
              <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
                이메일 smartfactory@samsung.com
              </li>
              <li>주소 경기도 수원시 영통구 삼성로 129</li>
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

          <div className="text-gray-800 border-t border-gray-800 pt-2.5 mt-5 flex justify-between items-center flex-wrap gap-y-1.25">
            <p className="sm:order-2 order-1 body-5 font-poppins">
              © SAMSUNG SMARTWAY. All rights reserved.
            </p>
            <div className="flex items-center sm:order-1 order-2">
              <Link href="/privacy" className={`caption-1 lg:body-5 font-bold`}>
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className={`caption-1 lg:body-5 relative before:content-['|'] before:mx-5 before:text-gray-700`}
              >
                이용약관
              </Link>
              <span
                className={`caption-1 lg:body-5 relative before:content-['|'] before:mx-5 before:text-gray-700`}
              >
                이메일무단수집거부
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
