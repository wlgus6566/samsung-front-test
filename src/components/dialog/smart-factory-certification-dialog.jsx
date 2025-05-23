"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DialogBase from "@/components/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/form-input";
import { useDialogStore } from "@/store/dialog";

const certificationSchema = z.object({
  companyName: z.string().min(1, "기업명을 입력해주세요."),
  businessNumber: z
    .string()
    .length(10, "사업자등록번호는 10자리여야 합니다.")
    .regex(/^[0-9]+$/, "사업자등록번호는 숫자만 입력해주세요."),
});

export function SmartFactoryCertificationDialog() {
  const dialogName = "smartFactoryCertification";
  const { dialogClose, dialogList } = useDialogStore();

  const currentDialog = React.useMemo(
    () => dialogList.find((dialog) => dialog.name === dialogName),
    [dialogList, dialogName]
  );

  const isOpen = !!currentDialog?.isOpen;
  const payload = currentDialog?.payload;
  const onConfirm = payload?.onConfirm;

  const form = useForm({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      companyName: "",
      businessNumber: "",
    },
    mode: "onChange",
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = form;

  const handleDialogSubmit = (data) => {
    if (onConfirm) {
      onConfirm(data);
    }
    dialogClose(dialogName);
  };

  React.useEffect(() => {
    if (isOpen && payload?.defaultValues) {
      reset(payload.defaultValues);
    } else if (!isOpen) {
      reset({ companyName: "", businessNumber: "" });
    }
  }, [isOpen, payload, reset]);

  return (
    <DialogBase
      name={dialogName}
      title="스마트공장 참여 기업 인증"
      contentClassName="pt-1 pb-6"
      footer={
        <Button
          type="submit"
          form="smart-factory-certification-form"
          disabled={!isValid}
          className="w-full"
          size="lg"
        >
          인증하기
        </Button>
      }
    >
      <div className="body2 text-gray-900 pt-2">
        스마트공장 사업에 참여한 기업만 신청할 수 있습니다. 아래 정보를 입력해
        인증해 주세요.
      </div>
      <form
        onSubmit={handleSubmit(handleDialogSubmit)}
        id="smart-factory-certification-form"
      >
        <div className="grid gap-6 pt-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormInput
              control={control}
              name="companyName"
              label="기업명"
              placeholder="기업명 입력"
              required
              error={errors.companyName?.message}
            />
            <FormInput
              control={control}
              name="businessNumber"
              label="사업자등록번호"
              placeholder="숫자 10자리 입력"
              required
              maxLength={10}
              error={errors.businessNumber?.message}
            />
          </div>
        </div>
      </form>
    </DialogBase>
  );
}
