"use client";

import React from "react";
import Link from "next/link";
import Img from "@/components/ui/img";
import { FamilySelect } from "@/components/ui/family-select";
import { gnbMenu } from "@/constants/navigation";

export default function Footer() {
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
            {gnbMenu.map((menu) => (
              <li key={menu.label} className="flex flex-col gap-3 lg:gap-4">
                <h3 className="text-sm font-semibold whitespace-nowrap tracking-[-0.05rem]">
                  <Link href={menu.url}>{menu.label}</Link>
                </h3>
                <ul className="flex-col gap-1 lg:gap-1.5 min-[1600px]:flex hidden">
                  {menu.children?.map((link) => (
                    <li key={link.url}>
                      <Link href={link.url} className="text-sm text-gray-700">
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
              className="w-18 h-12 bg-fill-inverse-muted rounded-[20px] flex items-center justify-center text-2xs"
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
            <ul className="flex items-center text-2xs flex-wrap text-gray-800">
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
            <p className="sm:order-2 order-1 text-2xs font-poppins">
              © SAMSUNG SMARTWAY. All rights reserved.
            </p>
            <div className="flex items-center sm:order-1 order-2">
              <Link
                href="/privacy"
                className={`text-3xs lg:text-2xs font-bold`}
              >
                개인정보처리방침
              </Link>
              <Link
                href="/terms"
                className={`text-3xs lg:text-2xs relative before:content-['|'] before:mx-5 before:text-gray-700`}
              >
                이용약관
              </Link>
              <span
                className={`text-3xs lg:text-2xs relative before:content-['|'] before:mx-5 before:text-gray-700`}
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
