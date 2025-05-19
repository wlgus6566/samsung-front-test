"use client";

export default function MediaResultsList({ initialData }) {
  //   const router = useRouter();
  //   const searchParams = useSearchParams();

  //   const searchWord = searchParams.get("searchWord") || "";
  //   const currentPage = parseInt(searchParams.get("currentPage") || "1", 10);

  //   const [input, setInput] = useState(searchWord);

  //   useEffect(() => {
  //     setInput(searchWord);
  //   }, [searchWord]);
  //   const { data, error, isLoading } = useSWR(
  //     `/api/v1/bbs/NEWS?searchWord=${encodeURIComponent(searchWord)}&currentPage=${currentPage}&size=10`,
  //     fetcher,
  //     {
  //       fallbackData: initialData,
  //       dedupingInterval: 1000,
  //     }
  //   );

  //const { list, ...paginationData } = data;

  return (
    <div>
      <h2>미디어&우수사례</h2>
    </div>
  );
}
