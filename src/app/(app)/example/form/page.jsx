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
import FormTop from "@/components/form/form-top";
import { useFieldArray, useWatch } from "react-hook-form";

import {
  countryOptions,
  industryOptions,
  yearsOptions,
} from "@/constants/option";

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
    .array(
      z
        .string({ required_error: "주요 시장을 선택해 주세요." })
        .min(1, "주요 시장을 선택해 주세요.")
    )
    .min(1, "최소 1개 이상의 주요 시장을 선택해 주세요."),
  companyDescription: z
    .string({ required_error: "회사 소개를 입력해 주세요." })
    .min(1, "회사 소개를 입력해 주세요.")
    .max(1500, "회사 소개는 최대 1,500자까지 입력할 수 있어요."),
  companyFile: z.any().refine((file) => file !== undefined, {
    message: "파일을 첨부해 주세요.",
  }),
  mainImage: z.any().refine((file) => file !== undefined, {
    message: "제품 대표 이미지를 첨부해 주세요.",
  }),
  additionalImages: z.any().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집에 동의해야 합니다.",
  }),
});

export default function FormExPage() {
  // form 초기값
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
      mainMarket: [{ value: "none", label: "선택" }],
      companyDescription: "",
      companyFile: undefined,
      mainImage: undefined,
      additionalImages: undefined,
      privacyConsent: false,
    },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "mainMarket",
  });
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <FormTop
        text="교차협력 상품등록 참가 신청서를 작성해 주세요. 제출된 정보는 상품 등록 시 사용되며 작성된 정보는 심사에 이용됩니다."
        children={<div>123</div>}
      />
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
            {/* 대표자 연락처 */}
            <div>
              <FormPhone
                control={form.control}
                name="representativePhone"
                label="대표자 연락처"
                required
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
                  items={countryOptions}
                />
              </div>
              <div className="flex-1">
                <FormSelect
                  control={form.control}
                  name="establishedYear"
                  label="설립 연도"
                  placeholder="선택"
                  required
                  items={yearsOptions}
                />
              </div>
            </div>

            {/* 업종 및 주요 시장 */}
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-wrap gap-2 flex-1">
                {fields.map((_, index) => (
                  <div key={index} className="w-full flex gap-2 mb-3">
                    <div className="flex-1">
                      <FormSelect
                        control={form.control}
                        name={`mainMarket.${index}`}
                        label={index === 0 ? "주요 시장" : undefined}
                        placeholder="선택"
                        required
                        items={industryOptions}
                      />
                    </div>

                    <div className="self-end">
                      {index === 0 ? (
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => {
                            console.log(fields);
                            alert("click");
                            console.log(form.getValues("mainMarket"));
                            append({ value: "none", label: "선택" });
                          }}
                          className="border-blue-500 text-blue-500 hover:bg-white h-12"
                        >
                          추가하기
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => remove(index)}
                        >
                          삭제하기
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex-1">
                <FormSelect
                  control={form.control}
                  name="industry"
                  label="업종"
                  placeholder="선택"
                  required
                  items={industryOptions}
                />
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

          <FormLayout num={"02"} title="상품 상세 정보">
            {/* 제품 대표 이미지 */}
            <div>
              <FormFile
                control={form.control}
                name="mainImage"
                label="제품 대표 이미지"
                required
                maxfilesize={1}
                minwidth={400}
                minheight={400}
                accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .webp"
                description="이미지 최소 사이즈: 가로 400px X 세로 400px / 1MB 이내의 jpg, jpeg, png, gif, bmp, tif, webp 파일 1개"
              />
            </div>

            {/* 제품 추가 이미지 */}
            <div>
              <FormFile
                control={form.control}
                name="additionalImages"
                label="제품 추가 이미지"
                maxfilesize={1}
                maxfilecount={5}
                minwidth={400}
                minheight={400}
                accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .webp"
                description="이미지 최소 사이즈: 가로 400px X 세로 400px / 1MB 이내의 jpg, jpeg, png, gif, bmp, tif, webp 파일 최대 5개"
              />
            </div>
          </FormLayout>

          <FormLayout num={"03"} title="개인정보 수집 동의">
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
