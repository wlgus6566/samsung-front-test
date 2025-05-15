"use client";

import { SWRConfig } from "swr";
import fetcher from "@/lib/fetcher";

export function SWRProviders({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        onError: (error) => {
          console.error("SWR Error:", error);
        },
        shouldRetryOnError: false, // 에러 발생 시 자동 재시도 비활성화
        revalidateOnFocus: true, // 포커스 시 데이터 재검증
        revalidateOnReconnect: true, // 네트워크 재연결 시 데이터 재검증
        dedupingInterval: 1, // 같은 요청 중복 호출 방지 (30초)
      }}
    >
      {children}
    </SWRConfig>
  );
}
