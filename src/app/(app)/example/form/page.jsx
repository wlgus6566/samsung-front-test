"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import FormEmail from "@/components/form/form-email";
import FormSelect from "@/components/form/form-select";
import FormTextarea from "@/components/form/form-textarea";
import FormFile from "@/components/form/form-file";
import FormPhone from "@/components/form/form-phone";
import { Form } from "@/components/ui/form";
import FormPrivacyConsent from "@/components/form/form-privacy-consent";
import FormLayout from "@/components/layout/form-layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  companyName: z.string(),
  representativeName: z
    .string({ required_error: "대표자명을 입력해 주세요." })
    .min(1, "대표자명을 입력해 주세요."),
  representativePhone: z.object({
    phone1: z.string().min(2, "전화번호를 입력해 주세요."),
    phone2: z.string().min(3, "전화번호를 입력해 주세요."),
    phone3: z.string().min(4, "전화번호를 입력해 주세요."),
  }),
  email: z
    .string({ required_error: "이메일을 입력해 주세요." })
    .email("유효한 이메일 주소를 입력해 주세요."),
  zipCode: z.string().optional(),
  address: z.string(),
  detailAddress: z.string().optional(),
  country: z
    .string({ required_error: "사업장 운영 국가를 선택해 주세요." })
    .min(1, "사업장 운영 국가를 선택해 주세요."),
  establishedYear: z
    .string({ required_error: "설립 연도를 선택해 주세요." })
    .min(1, "설립 연도를 선택해 주세요."),
  industry: z
    .string({ required_error: "업종을 선택해 주세요." })
    .min(1, "업종을 선택해 주세요."),
  mainMarket: z
    .string({ required_error: "주요 시장을 선택해 주세요." })
    .min(1, "주요 시장을 선택해 주세요."),
  companyDescription: z
    .string({ required_error: "회사 소개를 입력해 주세요." })
    .min(1, "회사 소개를 입력해 주세요.")
    .max(1500, "회사 소개는 최대 1,500자까지 입력할 수 있어요."),
  companyFile: z.any().refine((file) => file !== undefined, {
    message: "파일을 첨부해 주세요.",
  }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집에 동의해야 합니다.",
  }),
});

export default function FormExPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: "이모션",
      representativePhone: {
        phone1: "010",
        phone2: "",
        phone3: "",
      },
      email: "",
      zipCode: "",
      address: "서울특별시 강남구 언주로 637 싸이칸홀딩스타워",
      detailAddress: "",
      country: "",
      establishedYear: "2025",
      industry: "",
      mainMarket: "",
      companyDescription: "",
      companyFile: undefined,
      privacyConsent: false,
    },
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  const years = Array.from({ length: 100 }, (_, i) => ({
    value: `${2025 - i}`,
    label: `${2025 - i}`,
  }));

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormLayout num={"01"} title="기업 기본 정보">
            {/* 기업명 및 대표자명 */}
            <div className="flex gap-5">
              <div className="flex-1">
                <FormInput
                  control={form.control}
                  name="companyName"
                  label="기업명"
                  placeholder="기업명 입력"
                  disabled
                />
              </div>
              <div className="flex-1">
                <FormInput
                  control={form.control}
                  name="representativeName"
                  label="대표자명"
                  placeholder="이름 입력"
                  required
                />
              </div>
            </div>
            {/* 대표자 연락처 */}
            <div>
              <FormPhone
                control={form.control}
                name="representativePhone"
                label="대표자 연락처"
                required
              />
            </div>
            {/* 대표자 이메일 */}
            <div>
              <FormInput
                control={form.control}
                name="email"
                label="대표자 이메일"
                type="email"
                className="max-w-[546px]"
                placeholder="이메일 입력"
                required
                description="입력하신 이메일로 상품 등록 신청 결과와 해당 상품의 고객 문의 내용이 발송됩니다. 정확한 이메일 주소를 입력해 주세요."
              />
            </div>

            {/* 주소 */}
            <div>
              <FormInput
                control={form.control}
                className="flex-1"
                name="address"
                label="주소"
                required
                placeholder="주소 입력"
                value={form.getValues("address")}
                disabled
              />
              <FormInput
                control={form.control}
                className="flex-1 mt-2"
                name="detailAddress"
                placeholder="상세 주소"
                value={form.getValues("detailAddress")}
              />
            </div>

            {/* 사업장 운영 국가 및 설립 연도 */}
            <div className="flex gap-5">
              <div className="flex-1">
                <FormSelect
                  control={form.control}
                  name="country"
                  label="사업장 운영 국가"
                  placeholder="선택"
                  required
                  items={[
                    { value: "korea", label: "대한민국" },
                    { value: "usa", label: "미국" },
                    { value: "japan", label: "일본" },
                    { value: "china", label: "중국" },
                  ]}
                />
              </div>
              <div className="flex-1">
                <FormSelect
                  control={form.control}
                  name="establishedYear"
                  label="설립 연도"
                  placeholder="선택"
                  required
                  items={years}
                />
              </div>
            </div>

            {/* 업종 및 주요 시장 */}
            <div className="flex gap-5">
              <div className="flex-1">
                <FormSelect
                  control={form.control}
                  name="industry"
                  label="업종"
                  placeholder="선택"
                  required
                  items={[
                    { value: "it", label: "IT" },
                    { value: "manufacturing", label: "제조업" },
                    { value: "finance", label: "금융" },
                    { value: "service", label: "서비스" },
                  ]}
                />
              </div>
              <div className="flex gap-2 flex-1">
                <div className="flex-1">
                  <FormSelect
                    control={form.control}
                    name="mainMarket"
                    label="주요 시장"
                    placeholder="선택"
                    required
                    items={[
                      { value: "domestic", label: "국내" },
                      { value: "global", label: "해외" },
                      { value: "both", label: "국내외" },
                    ]}
                  />
                </div>
                <div className="self-end">
                  <Button
                    variant="outline"
                    type="button"
                    className="border-blue-500 text-blue-500 hover:bg-white md:px-6"
                  >
                    추가하기
                  </Button>
                </div>
              </div>
            </div>

            {/* 회사 소개 */}
            <div>
              <FormTextarea
                control={form.control}
                name="companyDescription"
                label="회사 소개"
                placeholder="회사 소개 입력 (최대 1,500자)"
                required
                rows={6}
                maxLength={1500}
              />
            </div>

            {/* 회사 설명 파일 첨부 */}
            <div>
              <FormFile
                control={form.control}
                name="companyFile"
                label="회사 설명 파일 첨부"
                fileType="document"
                accept=".pdf, .hwp, .doc, .docx, .ppt, .pptx, .jpg, .jpeg, .png, .zip"
                maxfilesize={10}
                maxtotalsize={10}
                description="파일 형식 제한: 10MB 이내의 pdf, hwp, doc, docx, ppt, pptx, jpg, jpeg, png, zip 파일 1개"
              />
            </div>
          </FormLayout>
          <FormLayout num={"02"} title="개인정보 수집 동의">
            <FormPrivacyConsent
              control={form.control}
              name="privacyConsent"
              required
            />
          </FormLayout>

          <div className="flex justify-center gap-4">
            <Button
              size="lg"
              type="button"
              variant="outline"
              className="md:min-w-[173px]"
            >
              이전으로
            </Button>
            <Button size="lg" type="submit" className="md:min-w-[173px]">
              제출하기
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
