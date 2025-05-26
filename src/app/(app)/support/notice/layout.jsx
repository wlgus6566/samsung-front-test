import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import Contents from "@/components/layout/contents";

export default function DetailLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <Contents
        marginTop="0"
        title="공지사항"
        description="스마트공장 지원사업 및 관련 프로그램 운영에 대한 중요한 소식과 안내를 공지사항을 통해 확인하실 수 있습니다."
      >
        {children}
      </Contents>
    </Suspense>
  );
}
