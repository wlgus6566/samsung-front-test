import MediaResultsList from "@/app/(app)/media/press/list";
import fetcher from "@/lib/fetcher";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import Contents from "@/components/layout/contents";
export const revalidate = 60;

export default async function DetailLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <Contents title="폼 예시" description="폼 예시">
        {children}
      </Contents>
    </Suspense>
  );
}
