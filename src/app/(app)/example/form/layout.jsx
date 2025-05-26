import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import Contents from "@/components/layout/contents";
import { Button } from "@/components/ui/button";
export const revalidate = 60;

export default function DetailLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <Contents title="교차협력 상품 등록 신청">{children}</Contents>
    </Suspense>
  );
}
