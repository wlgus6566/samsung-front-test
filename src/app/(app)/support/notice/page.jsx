import SupportResultsList from "./list";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
export const revalidate = 60;

export default async function SupportNoticePage({ searchParams }) {
  //const params = await searchParams;
  //const currentPage = parseInt(params.currentPage || "1", 10);

  //   const initialData = await fetcher(
  //     `/api/v1/competition/result?currentPage=${currentPage}&size=10`
  //   );
  const initialData = [];
  console.log(initialData);
  return (
    <Suspense fallback={<Loading />}>
      <SupportResultsList initialData={initialData} />
    </Suspense>
  );
}
