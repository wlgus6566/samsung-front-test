"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import FormEmail from "@/components/form/form-email";
import FormSelect from "@/components/form/form-select";
import FormTextarea from "@/components/form/form-textarea";
import FormFile from "@/components/form/form-file";
import FormPhone from "@/components/form/form-phone";
import FormRadio from "@/components/form/form-radio";
import { Form } from "@/components/ui/form";
import FormPrivacyConsent from "@/components/form/form-privacy-consent";
import FormLayout from "@/components/layout/form-layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormTop from "@/components/layout/form-top";
import { useFieldArray, useWatch } from "react-hook-form";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import Img from "@/components/ui/img";
import {
  countryOptions,
  industryOptions,
  yearsOptions,
  productCategoryOptions,
  sizeOptions,
  weightOptions,
} from "@/constants/option";

// 상품 관련 옵션들
const supplyTypeOptions = [
  { label: "OEM", value: "oem" },
  { label: "ODM", value: "odm" },
  { label: "OBM", value: "obm" },
  { label: "기타", value: "other" },
];

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
  productName: z.string().max(100, "공백 포함 100자 이내 입력 가능"),
  productCategory: z.string(),
  additionalImages: z.any().optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "개인정보 수집에 동의해야 합니다.",
  }),
  // 상품 상세 정보
  supplyType: z
    .string({ required_error: "공급 유형을 선택해 주세요." })
    .min(1, "공급 유형을 선택해 주세요."),
  brandName: z.string().max(100, "공백 포함 100자 이내 입력 가능"),
  materialName: z
    .string({ required_error: "원재료명을 선택해 주세요." })
    .min(1, "원재료명을 선택해 주세요.")
    .max(100, "공백 포함 100자 이내 입력 가능"),
  origin: z
    .string({ required_error: "원산지를 선택해 주세요." })
    .min(1, "원산지를 선택해 주세요."),
  sizeUnit: z
    .string({ required_error: "단위를 선택해 주세요." })
    .min(1, "단위를 선택해 주세요."),
  sizeValue: z
    .string({ required_error: "크기를 선택해 주세요." })
    .min(1, "크기를 선택해 주세요."),
  weightUnit: z
    .string({ required_error: "단위를 선택해 주세요." })
    .min(1, "단위를 선택해 주세요."),
  weightValue: z
    .string({ required_error: "무게를 선택해 주세요." })
    .min(1, "무게를 선택해 주세요."),
  hsCode: z
    .string({ required_error: "HS코드를 입력해 주세요." })
    .min(1, "HS코드를 입력해 주세요.")
    .max(15, "HS코드는 최대 15자까지 입력 가능합니다.")
    .regex(/^[\d.-]+$/, "숫자, 점(.), 대시(-)만 입력 가능합니다."),
  productKeywords: z
    .string({ required_error: "제품 연관 단어를 입력해 주세요." })
    .min(1, "제품 연관 단어를 입력해 주세요.")
    .max(100, "제품 연관 단어는 최대 100자까지 입력 가능합니다."),
  productDescription: z
    .string({ required_error: "상품 설명을 입력해 주세요." })
    .min(1, "상품 설명을 입력해 주세요.")
    .max(1500, "상품 설명은 최대 1,500자까지 입력할 수 있어요."),
  productImage: z.any().optional(),
  youtubeUrl: z.string().optional(),
  productFile: z.any().optional(),
});

export default function FormExPage() {
  const breakpoint = useBreakpoint();
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
      productName: "",
      productCategory: "",
      privacyConsent: false,
      // 상품 상세 정보
      supplyType: "",
      brandName: "",
      materialName: "",
      origin: "",
      sizeUnit: "",
      sizeValue: "",
      weightUnit: "",
      weightValue: "",
      hsCode: "",
      productKeywords: "",
      productDescription: "",
      productImage: undefined,
      youtubeUrl: "",
      productFile: undefined,
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
            <div className="flex flex-wrap gap-5 max-md:gap-7">
              <FormInput
                control={form.control}
                name="companyName"
                label="기업명"
                className="md:flex-1 max-md:w-full"
                disabled
              />
              <FormInput
                control={form.control}
                name="representativeName"
                label="대표자명"
                placeholder="이름 입력"
                className="md:flex-1 max-md:w-full"
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
                className="md:max-w-[546px] max-md:w-full"
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
            <div className="flex flex-wrap gap-5 max-md:gap-7">
              <FormSelect
                control={form.control}
                name="country"
                label="사업장 운영 국가"
                placeholder="선택"
                required
                className="md:flex-1 max-md:w-full"
                items={countryOptions}
              />
              <FormSelect
                control={form.control}
                name="establishedYear"
                label="설립 연도"
                placeholder="선택"
                required
                className="md:flex-1 max-md:w-full"
                items={yearsOptions}
              />
            </div>

            {/* 업종 및 주요 시장 */}
            <div className="flex flex-wrap gap-5 max-md:gap-7">
              <div className="flex gap-2 md:flex-1 max-md:w-full">
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
                          className="body4 px-6 border-blue-500 text-blue-500 hover:bg-white h-12 flex items-center"
                        >
                          {breakpoint !== "pc" ? "추가" : "추가하기"}
                          <Img
                            src="/images/icon/ic_plus_blue.svg"
                            alt="추가"
                            className="ml-1"
                            width={16}
                            height={16}
                          />
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
              <FormSelect
                control={form.control}
                name="industry"
                label="업종"
                placeholder="선택"
                className="md:flex-1 max-md:w-full"
                required
                items={industryOptions}
              />
            </div>

            {/* 회사 소개 */}
            <FormTextarea
              control={form.control}
              name="companyDescription"
              label="회사 소개"
              placeholder="회사 소개 입력 (최대 1,500자)"
              required
              rows={2}
              maxLength={1500}
            />

            {/* 회사 설명 파일 첨부 */}
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
          </FormLayout>

          <FormLayout num={"02"} title="상품 상세 정보">
            {/* 제품 대표 이미지 */}
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

            {/* 제품 추가 이미지 */}
            <FormFile
              control={form.control}
              name="additionalImages"
              label="제품 추가 이미지"
              maxfilesize={1}
              maxfilecount={5}
              minwidth={400}
              minheight={400}
              wrapClassName="max-md:mt-5 max-md:pt-8 max-md:border-t max-md:border-t-solid max-md:border-t-gray-300"
              accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .webp"
              description="이미지 최소 사이즈: 가로 400px X 세로 400px / 1MB 이내의 jpg, jpeg, png, gif, bmp, tif, webp 파일 최대 5개"
            />
            {/* 제품 이름 및 제품 카테고리 */}
            <div className="flex flex-wrap gap-5 max-md:gap-7">
              <FormInput
                control={form.control}
                name="productName"
                label="제품 이름"
                className="md:flex-1 max-md:w-full"
                placeholder="제품 이름 입력"
              />
              <FormSelect
                control={form.control}
                name="productCategory"
                label="제품 카테고리"
                className="md:flex-1 max-md:w-full"
                placeholder="선택"
                required
                items={productCategoryOptions}
              />
            </div>

            {/* 공급 유형 */}
            <FormRadio
              control={form.control}
              name="supplyType"
              label="공급 유형"
              size="lg"
              items={supplyTypeOptions}
              required
            />

            {/* 브랜드 이름 */}
            <FormInput
              control={form.control}
              name="brandName"
              label="브랜드 이름"
              placeholder="브랜드 이름 입력"
            />

            {/* 원재료명 및 원산지 */}
            <div className="flex flex-wrap gap-5 max-md:gap-7">
              <FormInput
                control={form.control}
                name="materialName"
                label="원재료명"
                className="md:flex-1 max-md:w-full"
                placeholder="원재료명 입력"
                required
              />
              <FormSelect
                control={form.control}
                name="origin"
                label="원산지"
                placeholder="선택"
                className="md:flex-1 max-md:w-full"
                required
                items={countryOptions}
              />
            </div>

            {/* 단위 크기 및 단위 무게 */}
            <div className="flex gap-5">
              <div className="flex-1">
                <div className="flex gap-2 items-end">
                  <FormInput
                    control={form.control}
                    name="sizeUnit"
                    label="단위 크기"
                    className="flex-1"
                    type="number"
                    placeholder="단위 크기 입력"
                    required
                  />
                  <FormSelect
                    control={form.control}
                    name="sizeValue"
                    label=""
                    className="w-[93px] min-w-[112px]"
                    placeholder="선택"
                    required
                    items={weightOptions}
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex gap-2 items-end">
                  <FormInput
                    control={form.control}
                    name="weightUnit"
                    label="단위 무게"
                    className="flex-1"
                    type="number"
                    placeholder="단위 무게"
                    required
                  />
                  <FormSelect
                    control={form.control}
                    name="weightValue"
                    label=""
                    className="w-[93px] min-w-[112px]"
                    placeholder="선택"
                    required
                    items={weightOptions}
                  />
                </div>
              </div>
            </div>

            {/* HS 코드 */}
            <FormInput
              control={form.control}
              name="hsCode"
              label="HS 코드"
              placeholder="HS 코드 입력 (0000.00-0000)"
            />

            {/* 제품 연관 단어 */}
            <FormInput
              control={form.control}
              name="productKeywords"
              label="제품 연관 단어"
              placeholder="제품 연관 단어 입력"
            />

            {/* 상품 설명 */}
            <FormTextarea
              control={form.control}
              name="productDescription"
              label="상품설명"
              placeholder="상품 설명 입력 (최대 1,500자)"
              required
              rows={2}
              maxLength={1500}
            />

            {/* 제품 설명 이미지 */}
            <FormFile
              control={form.control}
              name="productImage"
              label="제품 설명 이미지"
              maxfilesize={10}
              minwidth={860}
              minheight={400}
              accept=".jpg, .jpeg, .png, .gif, .bmp, .tif, .webp"
              description="이미지 최소 사이즈: 가로 860px X 세로 400px / 10MB 이내의 jpg, jpeg, png, gif, bmp, tif, webp 파일 1개"
            />

            {/* 상품 설명 유튜브 */}
            <FormInput
              control={form.control}
              name="youtubeUrl"
              label="상품 설명 유튜브"
              placeholder="유튜브 링크 입력 (ex. https://www.youtube.com/watch?v=...)"
            />

            {/* 상품 설명 파일 첨부 */}
            <FormFile
              control={form.control}
              name="productFile"
              label="상품 설명 파일 첨부"
              fileType="document"
              accept=".pdf, .hwp, .doc, .docx, .ppt, .pptx, .jpg, .jpeg, .png, .zip"
              maxfilesize={10}
              maxtotalsize={10}
              description="파일 형식 제한: 10MB 이내의 pdf, hwp, doc, docx, ppt, pptx, jpg, jpeg, png, zip 파일 1개"
            />
          </FormLayout>

          <FormLayout num={"03"} title="개인정보 수집 및 이용 동의">
            <FormPrivacyConsent
              control={form.control}
              name="privacyConsent"
              required
            />
          </FormLayout>

          <div className="flex justify-center mt-10.5 min-md:mt-15 gap-2 min-md:gap-4">
            <Button
              size="lg"
              type="button"
              variant="outline"
              className="min-md:min-w-[173px] max-md:w-full"
            >
              이전으로
            </Button>
            <Button
              size="lg"
              type="submit"
              className="min-md:min-w-[173px] max-md:w-full"
            >
              제출하기
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
