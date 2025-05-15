"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/form/form-input";
import FormTextarea from "@/components/form/form-textarea";
import FormSelect from "@/components/form/form-select";

// 카테고리 옵션
const categoryItems = [
  { label: "일반", value: "general" },
  { label: "기술", value: "tech" },
  { label: "질문", value: "question" },
  { label: "기타", value: "etc" },
  { label: "비활성화된 옵션", value: "disabled_option", disabled: true },
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
  email: z
    .string()
    .email({ message: "올바른 이메일 주소를 입력해주세요." })
    .optional()
    .or(z.literal("")),
});

export default function HomeContentsForm() {
  // 1. 폼 정의
  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "",
      category: "",
      contents: "",
      email: "",
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

  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-6">콘텐츠 작성 예시</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            control={form.control}
            name="title"
            label="제목"
            size="lg"
            placeholder="제목을 입력하세요"
            required
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

          <FormInput
            control={form.control}
            name="email"
            label="이메일 (선택)"
            placeholder="example@example.com"
            type="email"
          />

          <FormSelect
            control={form.control}
            name="category_disabled_example"
            label="카테고리 (Disabled 예시)"
            placeholder="선택 불가"
            items={categoryItems}
            disabled={true}
          />

          <Button type="submit" className="w-full md:w-auto">
            제출하기
          </Button>
        </form>
      </Form>
    </div>
  );
}
