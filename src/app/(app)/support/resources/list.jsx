"use client";

import Contents from "@/components/layout/contents";
import UiTable from "@/components/ui/ui-table";
export default function SupportResourcesList({ initialData }) {
  //const router = useRouter();
  //const searchParams = useSearchParams();

  // const searchWord = searchParams.get("searchWord") || "";
  // const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);

  // const { data, error, isLoading } = useSWR(
  //   `/api/v1/competition/result?searchWord=${encodeURIComponent(searchWord)}&currentPage=${currentPage}&size=10`,
  //   fetcher,
  //   {
  //     fallbackData: initialData,
  //     dedupingInterval: 1000,
  //   }
  // );

  //const { list, ...paginationData } = data;

  return (
    <Contents title="자료실">
      <UiTable />
    </Contents>
  );
}
