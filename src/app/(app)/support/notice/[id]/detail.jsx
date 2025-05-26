export const revalidate = 60;
import PostState from "@/components/post/post-state";
import PostHeader from "@/components/post/post-header";
import PostContent from "@/components/post/post-content";
import PostNavigation from "@/components/post/post-navigation";
export default async function NoticeDetailPage({ id, initialData }) {
  const data = {
    registerSeq: 65,
    registrationDt: "2025-05-14T15:52:05.068",
    registerIp: "121.165.154.175, 172.17.0.6",
    updaterSeq: 65,
    updateDt: "2025-05-14T15:52:05.068",
    updaterIp: "121.165.154.175, 172.17.0.6",
    useYn: true,
    registerName: "대한요가회",
    updaterName: "대한요가회",
    boardSeq: 438,
    prev: {
      boardSeq: 437,
      title: "대한요가회 제5대 대한요가회장 선거 일정 공고",
    },
    next: {
      boardSeq: 439,
      title: "(사)대한요가회 사무처 정규직 직원 공개 채용 서류전형 합격자 공고",
    },
    sectionCd: "NOTICE",
    category: "RECRUITMENT",
    categoryName: "채용",
    title: "(사)대한요가회 사무처 정규직 직원 공개 채용",
    contents:
      "&lt;p&gt;[대한요가회] 정규직(사무행정) 공개채용&lt;/p&gt;&lt;p&gt;대한요가회는 정규직(사무행정)의 대한민국 요가의 진흥을 위해 행정/대회 업무를 담당할 직원을 아래와 같이 공개모집합니다.&lt;/p&gt;&lt;p&gt;1. 채용분야&lt;/p&gt;&lt;p&gt;가. 채용분야: 사무행정&lt;/p&gt;&lt;p&gt;나. 채용인원: 02명&lt;/p&gt;&lt;p&gt;다. 주요업무: 사무행정 및 대회(업무 분장 예정)&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;2. 근무형태 및 조건&lt;/p&gt;&lt;p&gt;가. 근무부서: 사무처&lt;/p&gt;&lt;p&gt;나. 근무지: 올림픽회관 신관 321호(서울특별시 송파구 올림픽로424)&lt;/p&gt;&lt;p&gt;다. 근로계약기간: 채용일~&lt;/p&gt;&lt;p&gt;라. 연봉(세전): 2,800천원-3,300천원 (면접 후 결정) * 퇴직금 별도&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;3. 전형절차 : 서류전형(5배수) - 면접전형 - 최종선발&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;4. 서류접수기간 : 2024.11.29.(금요일) ~ 2024.12.11.(수요일) 18:00까지&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;5. 접수방법 : 제공된 ①입사지원서와 ②개인정보제공동의서를 작성하여 이메일(&lt;a href=&quot;mailto:yoga@sports.or.kr&quot; target=&quot;_blank&quot; rel=&quot;noopener noreferrer nofollow&quot;&gt;yoga@sports.or.kr&lt;/a&gt;)로 송부&lt;/p&gt;&lt;p&gt;  ㅇ 메일 및 입사지원서 제목: 입사지원서_채용분야(성명)&lt;/p&gt;&lt;p&gt;  * 자격요건 등 자세한 내용은 붙임의 채용공고 문서를 참조하여주시기 바랍니다.&lt;/p&gt;&lt;p&gt;&lt;/p&gt;&lt;p&gt;붙임. 채용공고 및 관련서류 각 1부. 끝.&lt;/p&gt;&lt;p&gt; &lt;/p&gt;&lt;p&gt;2024.11.29.(금)&lt;/p&gt;&lt;p&gt;대한요가회&lt;/p&gt;",
    inquiryCount: 2,
    fixingYn: false,
    fileList: [
      {
        attachingFileSeq: 528,
        targetSeq: 438,
        fileOriginalName: "입사지원서 등 제출 서류 양식.zip",
        filePath:
          "http://new-www.kyoga.or.kr/upload/notice/2025/05/14/b71d302d-4823-44b4-b80c-18cf2f341677.zip",
        fileSize: 29623,
        delYn: false,
        openFileYn: null,
      },
      {
        attachingFileSeq: 529,
        targetSeq: 438,
        fileOriginalName: "대한요가회 정규직 채용공고문.pdf",
        filePath:
          "http://new-www.kyoga.or.kr/upload/notice/2025/05/14/337a627f-01a5-41ae-866f-855025d2472d.pdf",
        fileSize: 270366,
        delYn: false,
        openFileYn: null,
      },
    ],
    mobileThumbnailFileList: null,
    pcThumbnailFileList: null,
    mainThumbnailFileList: null,
  };
  // const {
  //     data: result,
  //     error,
  //     isLoading,
  //   } = useSWR(`/api/v1/competition/result/${id}`, {
  //     fallbackData: initialData,
  //     dedupingInterval: 1000,
  //   });
  return (
    <PostState
      //isLoading={isLoading}
      // error={error}
      data={data}
      renderData={(data) => (
        <>
          <PostHeader
            title={data.title}
            registerName={data.registerName}
            registrationDt={data.registrationDt}
            inquiryCount={data.inquiryCount}
          />

          <PostContent download={true} fileList={data.fileList}>
            {data.contents}
          </PostContent>

          <PostNavigation
            prevPost={
              data.prev
                ? {
                    title: data.prev.title,
                    url: `/conference/results/${data.prev.competitionresultSeq}`,
                  }
                : null
            }
            nextPost={
              data.next
                ? {
                    title: data.next.title,
                    url: `/conference/results/${data.next.competitionresultSeq}`,
                  }
                : null
            }
          />
        </>
      )}
    />
  );
}
