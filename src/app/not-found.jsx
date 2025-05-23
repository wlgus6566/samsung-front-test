import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
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
        <h1 className="heading1 mb-4">페이지를 찾을 수 없습니다</h1>
        <p className="body-1 text-gray-600 mb-8">
          요청하신 페이지가 존재하지 않거나, 이동되었을 수 있습니다.
          <br />
          주소를 다시 확인해 주세요.
        </p>

        <div className="flex justify-center">
          <Link
            href="/"
            className="btn-more-link min-w-[180px] rounded-full px-6 py-3 flex items-center justify-center"
          >
            홈으로 이동
          </Link>
        </div>
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-gray-500 mb-2">
          이전 페이지로 돌아가거나, 홈페이지에서 원하는 정보를 찾아보세요.
        </p>
      </div>
    </div>
  );
}
