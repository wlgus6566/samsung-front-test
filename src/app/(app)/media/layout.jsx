import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import Contents from "@/components/layout/contents";

export default function DetailLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <Contents
        title="보도자료"
        description="스마트공장과 관련된 주요 언론 보도를 한눈에 확인하세요. 성과와 변화, 그리고 현장의 이야기가 담긴 생생한 뉴스입니다"
      >
        {children}
      </Contents>
    </Suspense>
  );
}
