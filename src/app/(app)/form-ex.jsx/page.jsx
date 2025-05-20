import PressResultsList from "@/app/(app)/media/press/list";
import fetcher from "@/lib/fetcher";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
export const revalidate = 60;

export default async function FormExPage() {
  const params = await searchParams;
  const currentPage = parseInt(params.currentPage || "1", 10);

  // const initialData = await fetcher(
  //   `/api/v1/bbs/NEWS?currentPage=${currentPage}&size=10`
  // );

  const initialData = {
    list: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
    },
  };

  console.log(initialData);

  return (
    <Suspense fallback={<Loading />}>
      <div>폼 예시</div>
    </Suspense>
  );
}
