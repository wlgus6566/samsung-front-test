import NoticeDetail from "./detail";

export default function NoticeDetailPage() {
  //const { id } = await params;
  const id = "123";
  const initialData = [];
  //const initialData = await fetcher(`/api/v1/competition/result/${id}`);
  //console.log("server", initialData);
  return <NoticeDetail initialData={initialData} id={id} />;
}
