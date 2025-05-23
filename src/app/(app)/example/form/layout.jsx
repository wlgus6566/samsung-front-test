import { Suspense } from "react";
import Loading from "@/components/ui/loading";
import Contents from "@/components/layout/contents";
import { Button } from "@/components/ui/button";
export const revalidate = 60;

export default async function DetailLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <Contents title="예시" description="예시입니다.">
        <div className="text-display text-red-500">123 </div>
        <Button variant="brand">123</Button>
        {children}
      </Contents>
    </Suspense>
  );
}
