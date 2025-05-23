"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import FormTextarea from "@/components/form/form-textarea";
import FormSelect from "@/components/form/form-select";
import FormRadio from "@/components/form/form-radio";
import FormCheckbox from "@/components/form/form-checkbox";
import FormFile from "@/components/form/form-file";
import FormEmail from "@/components/form/form-email";
import { Switch } from "@/components/ui/switch";
import { useDialogStore } from "@/store/dialog";
import { SmartFactoryCertificationDialog } from "@/components/dialog/smart-factory-certification-dialog";
import SearchBar from "@/components/search-bar";
import { Badge } from "@/components/ui/badge";
import BoardTable from "@/components/ui/board-table";
import Pagination from "@/components/ui/pagination";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tag } from "@/components/ui/tag";

const categoryItems = [
  { label: "일반", value: "general" },
  { label: "기술", value: "tech" },
  { label: "질문", value: "question" },
  { label: "기타", value: "etc" },
  { label: "비활성화된 옵션", value: "disabled_option", disabled: true },
];

const radioItems = [
  { label: "옵션 1", value: "option1", disabled: false },
  { label: "옵션 2", value: "option2", disabled: false },
  { label: "옵션 3", value: "option3", disabled: false },
];

const radioItems2 = [
  { label: "옵션 1", value: "option1", disabled: true },
  { label: "옵션 2", value: "option2", disabled: true },
  { label: "옵션 3", value: "option3", disabled: true },
];

const checkboxItems = [
  { label: "옵션 1", value: "option1" },
  { label: "옵션 2", value: "option2" },
  { label: "옵션 3", value: "option3" },
  { label: "옵션 4", value: "option4", disabled: true },
];

// Zod 스키마 정의
const createFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: "제목을 입력해 주세요." })
    .max(100, { message: "제목은 100자 이내로 입력해주세요." }),
  category: z.string().min(1, { message: "카테고리를 선택해주세요." }),
  contents: z
    .string()
    .min(1, { message: "내용을 입력해 주세요." })
    .max(5000, { message: "내용은 5000자 이내로 입력해주세요." }),
  radio: z.string().min(1, { message: "라디오 그룹을 선택해주세요." }),
  radio_disabled_example: z
    .string()
    .min(1, { message: "라디오 그룹을 선택해주세요." }),
  email: z
    .string()
    .email({ message: "올바른 이메일 주소를 입력해주세요." })
    .optional()
    .or(z.literal("")),
  checkbox: z.array(z.string()).min(1, { message: "체크박스를 선택해주세요." }),
  checkbox_disabled_example: z
    .array(z.string())
    .min(1, { message: "체크박스를 선택해주세요." }),
  category_black_theme: z
    .string()
    .min(1, { message: "카테고리를 선택해주세요." }),
  files: z.array(z.string()).optional(),
  imagesOnly: z.array(z.string()).optional(),
});

const categoryItems1 = [
  { label: "일반", value: "general" },
  { label: "기술", value: "tech" },
  { label: "질문", value: "question" },
];

export default function HomeContentsForm() {
  const { dialogOpen } = useDialogStore();
  const device = useBreakpoint();
  // 1. 폼 정의
  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "",
      category: "",
      contents: "",
      email: "",
      radio: "option1",
      radio_disabled_example: "option3",
      checkbox: ["option1"],
      checkbox_disabled_example: ["option1"],
      files: undefined,
      imagesOnly: undefined,
    },
    mode: "onChange",
  });

  // 2. 제출 핸들러 정의
  function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("Form Submitted!", values);
    // 예: alert(JSON.stringify(values, null, 2));
    // 여기에 실제 API 호출 등의 로직을 추가할 수 있습니다.
  }

  const handleCertification = (data) => {
    console.log("인증 데이터:", data);
    // 실제 인증 API 호출 로직
  };

  const fieldOptions = [
    { id: "name", label: "이름" },
    { id: "email", label: "이메일" },
    { id: "phone", label: "연락처" },
  ];

  const handleSearch = (params) => {
    console.log("검색 파라미터:", params);
    // 여기에 실제 검색 API 호출 로직을 추가
  };

  const handleReset = () => {
    console.log("검색 조건 초기화됨");
    // 초기화 후 추가 작업이 필요한 경우
  };

  // 게시판 데이터 예시
  const boardData = [
    {
      id: 10,
      category: "신청양식",
      title: "[공지] 2025 스마트공장 신청 접수 시작 안내",
      date: "2024.01.03",
      href: "#",
    },
    {
      id: 9,
      category: "우수사례집",
      title: "삼성스마트공장 홈페이지 서비스 중단 안내: 4.6(일) 09시~22시",
      date: "2024.01.03",
      href: "#",
    },
    {
      id: 8,
      category: "성과보고서",
      title: "[안내] 금융감독원 주관 불법사금융 피해 예방",
      date: "2023.11.15",
      href: "#",
    },
    {
      id: 7,
      category: "성과보고서",
      title:
        "[알림] 신용정보법 제32조제7항에 따른 개인신용정보 이용·제공 내역의 공지(김*호)",
      date: "2023.11.15",
      href: "#",
    },
    {
      id: 6,
      category: "성과보고서",
      title: "[알림] 삼성화재 홈페이지 서비스 중단 안내: 11.17(일) 00시~08시",
      date: "2023.11.15",
      href: "#",
    },
  ];

  const handleRowClick = (item) => {
    console.log("선택된 항목:", item);
    // 실제로는 해당 게시물 상세 페이지로 이동하는 로직 구현
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h2 className="heading2 mb-4 font-bold">타이포그래피 예시</h2>
      <table className="table-auto border-collapse w-full text-left text-sm text-gray-800">
        <thead>
          <tr>
            <th className="border-b pb-2">클래스명</th>
            <th className="border-b pb-2">PC (md)</th>
            <th className="border-b pb-2">Tablet (sm)</th>
            <th className="border-b pb-2">Mobile</th>
          </tr>
        </thead>
        <tbody className="align-top">
          <tr>
            <td className="py-2 font-semibold display">.display</td>
            <td>4xl (60px)</td>
            <td>3xl (52px)</td>
            <td>2xl (40px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold heading1">.heading1</td>
            <td>3xl (52px)</td>
            <td>2xl (40px)</td>
            <td>ml (24px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold heading2">.heading2</td>
            <td>2xl (40px)</td>
            <td>xl (36px)</td>
            <td>md (20px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold heading3">.heading3</td>
            <td>xl (36px)</td>
            <td>lg (32px)</td>
            <td>md (20px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold body1">.body1</td>
            <td>ml (24px)</td>
            <td>md (20px)</td>
            <td>sm (18px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold body2">.body2</td>
            <td>md (20px)</td>
            <td>sm (18px)</td>
            <td>xs (16px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold body3">.body3</td>
            <td>sm (18px)</td>
            <td>xs (16px)</td>
            <td>2xs (14px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold body4">.body4</td>
            <td>sm (16px)</td>
            <td>xs (14px)</td>
            <td>3xs (12px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold body5">.body5</td>
            <td>2xs (14px)</td>
            <td>3xs (12px)</td>
            <td>3xs (12px)</td>
          </tr>
          <tr>
            <td className="py-2 font-semibold caption">.caption</td>
            <td>3xs (12px)</td>
            <td>3xs (12px)</td>
            <td>3xs (12px)</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-8 mb-4">
        {device === "mobile" && <p>📱 모바일 환경입니다!</p>}
        {device === "tablet" && <p>💻 태블릿 환경입니다!</p>}
        {device === "pc" && <p>🖥 데스크탑 환경입니다!</p>}
      </h2>
      {/* 탭 예시 */}
      <div className="mb-8">
        <div className="mt-8">
          <h4 className="text-md font-medium mb-3 text-gray-700">
            자동 반응형 탭 예시
          </h4>
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="tab1">제품 소개</TabsTrigger>
              <TabsTrigger value="tab2">기술 명세</TabsTrigger>
              <TabsTrigger value="tab3">FAQ</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1" className="p-4 border rounded-md">
              <h4 className="font-bold mb-2">제품 소개</h4>
              <p>
                스마트공장 솔루션은 최신 기술을 활용하여 제조 공정을 자동화하고
                데이터 기반 의사결정을 지원합니다. 생산성 향상과 품질 개선을
                위한 최적의 선택입니다.
              </p>
            </TabsContent>
            <TabsContent value="tab2" className="p-4 border rounded-md">
              <h4 className="font-bold mb-2">기술 명세</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>AI 기반 생산 최적화 알고리즘</li>
                <li>실시간 모니터링 시스템</li>
                <li>클라우드 기반 데이터 저장 및 분석</li>
                <li>모바일 앱 연동 지원</li>
              </ul>
            </TabsContent>
            <TabsContent value="tab3" className="p-4 border rounded-md">
              <h4 className="font-bold mb-2">자주 묻는 질문</h4>
              <div className="space-y-3">
                <div>
                  <p className="font-semibold">
                    Q: 설치 기간은 얼마나 걸리나요?
                  </p>
                  <p>A: 일반적으로 2-4주 정도 소요됩니다.</p>
                </div>
                <div>
                  <p className="font-semibold">Q: 직원 교육도 제공되나요?</p>
                  <p>A: 네, 기본 교육 프로그램이 포함되어 있습니다.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="stack-slide">
        <img src="/temp/main_slide_00.jpg" alt="유플라이마®" />
        <span className="btn-point">
          <span></span>
          <span></span>
        </span>
      </div>

      <h2 className="text-xl font-bold mt-8 mb-4">SearchBar 컴포넌트 예시</h2>
      <SearchBar defaultSearchField="searchWord">
        <div className="flex gap-2 items-end">
          <SearchBar.Status
            label="구분"
            wrapClassName="w-[calc((100%-24px)/4)]"
            field="category"
            placeholder="구분 선택"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.SearchInput placeholder="검색어를 입력하세요 (예 : 금형, AI, 자동차부품, 생산성 향상)" />
        </div>
        <div className="flex gap-2 items-end mt-3.5">
          <SearchBar.Status
            label="업종"
            wrapClassName="flex-1"
            field="status1"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.Status
            label="기술 분야"
            wrapClassName="flex-1"
            field="status2"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.Status
            label="기업 규모"
            wrapClassName="flex-1"
            field="status3"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
          <SearchBar.Status
            label="성과 유형"
            wrapClassName="flex-1"
            field="status4"
            placeholder="전체"
            options={[
              { value: "all", label: "전체" },
              { value: "active", label: "활성" },
              { value: "inactive", label: "비활성" },
            ]}
          />
        </div>
        <SearchBar.Actions />
      </SearchBar>
      <h2 className="text-lg font-bold my-8">Badge 컴포넌트 예시</h2>
      <div className="border rounded p-6 bg-white shadow mb-8">
        <div className="flex flex-wrap gap-3 mb-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Medium 사이즈</p>
            <div className="flex gap-2">
              <Badge color="blue">blue</Badge>
              <Badge color="green">green</Badge>
              <Badge color="red">red</Badge>
              <Badge color="gray">gray</Badge>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-2">Small 사이즈</p>
            <div className="flex gap-2">
              <Badge color="blue" size="small">
                blue
              </Badge>
              <Badge color="green" size="small">
                green
              </Badge>
              <Badge color="red" size="small">
                red
              </Badge>
              <Badge color="gray" size="small">
                gray
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold my-8">Label 컴포넌트 예시</h2>
      <div className="border rounded p-6 bg-white shadow mb-8">
        <div className="flex flex-wrap gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">기본 타입</p>
            <div className="flex flex-wrap gap-2">
              <Tag color="black">black</Tag>
              <Tag color="white">white</Tag>
              <Tag color="blue">blue</Tag>
              <Tag color="gray">gray</Tag>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">활용 예시</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Tag color="black">신규</Tag>
              <Tag color="white">진행중</Tag>
              <Tag color="blue">완료</Tag>
              <Tag color="gray">마감</Tag>
            </div>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">콘텐츠 작성 예시</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            control={form.control}
            name="title"
            label="제목"
            placeholder="제목을 입력하세요"
            required
          />
          <FormEmail
            control={form.control}
            name="email"
            label="대표자 이메일"
            placeholder="이메일 입력"
            required
            description="입력하신 이메일로 상품 증정 정보와 해당 상품의 고객 문의이 내용이 발송됩니다. 정확한 이메일 주소를 입력해 주세요."
          />
          <FormSelect
            control={form.control}
            name="category"
            label="카테고리"
            placeholder="카테고리를 선택하세요"
            items={categoryItems}
            required
            description="글의 성격에 맞는 카테고리를 선택해주세요."
          />
          <FormTextarea
            control={form.control}
            name="contents"
            label="내용"
            placeholder="내용을 입력하세요"
            required
            maxLength={5000}
          />
          <FormSelect
            control={form.control}
            name="category_disabled_example"
            label="카테고리 (Disabled 예시)"
            placeholder="선택 불가"
            items={categoryItems}
            disabled={true}
          />
          <FormSelect
            control={form.control}
            name="category_black_theme"
            label="카테고리 (블랙 테마)"
            placeholder="선택해주세요."
            items={categoryItems1}
            theme="dark"
          />
          <FormRadio
            control={form.control}
            name="radio"
            label="라디오 그룹"
            items={radioItems}
          />
          <FormRadio
            control={form.control}
            size="lg"
            name="radio_disabled_example"
            label="라디오 그룹 (Disabled 예시)"
            items={radioItems2}
            disabled={true}
          />
          <FormCheckbox
            control={form.control}
            name="checkbox"
            label="체크박스"
            items={checkboxItems}
            required
            size="lg"
          />
          <FormCheckbox
            control={form.control}
            name="checkbox_disabled_example"
            label="체크박스 (Disabled 예시)"
            items={checkboxItems}
            required
            disabled={true}
          />
          <FormFile
            control={form.control}
            maxfilesize={1}
            maxtotalsize={3}
            maxfilecount={3}
            minwidth={200}
            minheight={200}
            name="files"
            label="이미지 업로드"
            description="이미지 최소 사이즈: 가로 200px X 세로 200px / 1MB 이내의 jpg, jpeg, png, gif, bmp, tif, webp 파일 3개"
          />

          <FormFile
            control={form.control}
            maxfilecount={2}
            maxtotalsize={2}
            name="files2"
            label="상품 설명 파일 첨부"
            fileType="document"
            description="파일 형식 제한:  2MB 이내의 pdf, hwp, doc, docx, ppt, pptx, jpg, jpeg, png, zip 파일 최대 2개"
          />

          <div className="flex gap-2">
            <Switch />
            <Switch size="lg" />
          </div>
          <SmartFactoryCertificationDialog />
          <Button
            type="button"
            size="lg"
            onClick={() =>
              dialogOpen("smartFactoryCertification", {
                onConfirm: handleCertification,
              })
            }
          >
            스마트공장 참여 기업 인증하기
          </Button>
          <Button type="submit" size="lg" className="w-full md:w-auto">
            제출하기
          </Button>
        </form>
      </Form>

      <h2 className="text-2xl font-bold mt-8 mb-6">
        게시판 테이블 컴포넌트 예시
      </h2>
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="text-sm text-gray-600">총 1,998 건</div>
        </div>

        <BoardTable
          data={boardData}
          onRowClick={handleRowClick}
          className="mb-6"
        />
      </div>
      <Pagination
        pageNum={1}
        pageSize={10}
        totalCount={1}
        goToPage={() => {}}
      />
    </div>
  );
}
