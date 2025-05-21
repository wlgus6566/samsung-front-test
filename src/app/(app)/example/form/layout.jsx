import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import Contents from "@/components/layout/contents";
export const revalidate = 60;

export default async function DetailLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <Contents title="예시" description="예시입니다.">
        {children}
      </Contents>
    </Suspense>
  );
}
