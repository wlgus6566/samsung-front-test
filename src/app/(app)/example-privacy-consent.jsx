"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormPrivacyConsent from "@/components/form/form-privacy-consent";

export default function ExamplePrivacyConsentPage() {
  const form = useForm({
    defaultValues: {
      privacyConsent: false,
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    alert(
      data.privacyConsent
        ? "개인정보 수집에 동의하셨습니다."
        : "개인정보 수집에 동의하지 않으셨습니다."
    );
  };

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-2xl font-bold mb-6">개인정보 수집 동의 예시</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormPrivacyConsent
            control={form.control}
            name="privacyConsent"
            label="개인정보 수집 동의"
            required
          />

          <div className="flex justify-end">
            <Button type="submit">제출하기</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
