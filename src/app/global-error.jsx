"use client";

import React, { useEffect } from "react";

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    // 오류를 로깅하는 서비스에 에러 전송
    console.error(error);
  }, [error]);

  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">오류가 발생했습니다</h1>
            <p className="text-lg text-gray-600 mb-8">
              서비스 이용에 불편을 드려 죄송합니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </p>

            <button
              onClick={() => reset()}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-full"
            >
              다시 시도
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
