"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import FormEmail from "@/components/form/form-email";
import FormAddress from "@/components/form/form-address";
import FormSelect from "@/components/form/form-select";
import FormTextarea from "@/components/form/form-textarea";
import FormFile from "@/components/form/form-file";
import { Form } from "@/components/ui/form";
import Col, { LeftCont, RightCont } from "@/components/layout/col-layout";
export default function FormExPage() {
  const form = useForm({
    defaultValues: {
      companyName: "이모션",
      representativeName: "",
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
    <Col>
      <LeftCont>
        <span className="block text-primary-blue font-semibold body-2 font-poppins">
          01
        </span>
        <h3 className="heading-4 font-bold text-black">기업 기본 정보</h3>
      </LeftCont>
      <RightCont>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-11">
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

            {/* 대표자 이메일 */}
            <div>
              <FormEmail
                control={form.control}
                name="email"
                label="대표자 이메일"
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
                    className="border-blue-500 text-blue-500 h-12 mt-8"
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

            <div className="flex justify-center gap-4">
              <Button
                size="lg"
                type="button"
                variant="outline"
                className="px-14"
              >
                이전으로
              </Button>
              <Button size="lg" type="submit" className="px-14">
                제출하기
              </Button>
            </div>
          </form>
        </Form>
      </RightCont>
    </Col>
  );
}
