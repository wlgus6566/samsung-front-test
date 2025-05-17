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
    <footer className="lg:container-fixed px-5 sm:px-10 lg:px-30 sm:pt-[62px] sm:pb-13 py-10 lg:py-12 bg-black text-white">
      <div className="hidden sm:flex flex-row justify-between">
        <ul className="flex-1 flex space-between lg:gap-x-11 gap-y-10 gap-x-[38px]">
          {footerMenus.map((menu) => (
            <li key={menu.title} className="flex flex-col gap-3 lg:gap-4">
              <h3 className="body-3 font-semibold whitespace-nowrap tracking-[-0.05rem]">
                {menu.title}
              </h3>
              <ul className="flex-col gap-1 lg:gap-1.5 min-[1600px]:flex hidden">
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
              상호명 이모션글로벌
            </li>
            <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
              대표 이모션
            </li>
            <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
              사업자등록번호 123-45-67890
            </li>
            <li className="relative after:content-['|'] after:mx-2 after:text-gray-800">
              이메일 emotion@emotion.co.kr
            </li>
            <li>주소 강남구 언주로 637, 싸이칸홀딩스타워</li>
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
    </footer>
  );
}
