"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

/**
 * @param {{ error: Error; reset: () => void }} props
 */
export default function Error({ error, reset }) {
  useEffect(() => {
    // 에러 로깅 기능 추가 가능
    console.error("애플리케이션 에러:", error);
  }, [error]);

  return (
    <div className="container mx-auto py-20 text-center">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          오류가 발생했습니다
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          페이지를 표시하는 중에 문제가 발생했습니다. 다시 시도하거나 잠시 후
          다시 접속해 주세요.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={() => reset()} variant="default">
            다시 시도
          </Button>
          <Button
            onClick={() => (window.location.href = "/")}
            variant="outline"
          >
            홈으로 이동
          </Button>
        </div>
      </div>
    </div>
  );
}
