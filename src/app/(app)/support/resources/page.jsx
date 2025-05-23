import ResultsList from "@/app/(app)/support/resources/result-list";
import { Suspense } from "react";
import Loading from "@/components/ui/loading";
export const revalidate = 60;

export default async function SupportResourcesPage({ searchParams }) {
  //const params = await searchParams;
  //const currentPage = parseInt(params.currentPage || "1", 10);

  //   const initialData = await fetcher(
  //     `/api/v1/competition/result?currentPage=${currentPage}&size=10`
  //   );
  const initialData = [];
  console.log(initialData);
  return (
    <Suspense fallback={<Loading />}>
      <ResultsList initialData={initialData} />
    </Suspense>
  );
}
