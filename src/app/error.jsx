"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Error({ error, reset }) {
  useEffect(() => {
    // 오류를 로깅하는 서비스에 에러 전송
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <Image
        src="/images/common/logo_kya.png"
        alt="대한요가회 로고"
        width={150}
        height={40}
        className="mb-8"
      />

      <div className="text-center">
        <h1 className="heading-1 text-[44px] leading-[54px] mb-4">
          오류가 발생했습니다
        </h1>
        <p className="body-1 text-gray-600 mb-8">
          페이지를 표시하는 중 문제가 발생했습니다.
          <br />
          잠시 후 다시 시도해 주세요.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => reset()}
            className="btn-more-link min-w-[180px] rounded-full px-6 py-3"
          >
            다시 시도
          </button>

          <Link
            href="/"
            className="btn border border-black rounded-full min-w-[180px] px-6 py-3 text-center flex items-center justify-center"
          >
            홈으로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
