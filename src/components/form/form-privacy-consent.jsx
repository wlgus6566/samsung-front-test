"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const FormPrivacyConsent = ({
  control,
  name,
  label,
  description = "",
  consentText = "귀사(또는 귀하)의 상품 등록 신청과 관련하여, 아래와 같이 개인정보를 수집·이용하고자 합니다.\n내용을 확인하신 후 동의 여부를 선택해 주시기 바랍니다.\n\n수집 항목: 담당자 성명, 직책, 연락처(전화번호, 이메일), 회사명, 사업자등록번호, 상품 관련 정보 등\n수집 목적: 상품 등록 접수 및 확인, 참가자 식별, 행사 운영 및 관련 안내사항 전달\n보유 및 이용 기간: 수집일로부터 1년간 보관 후 지체 없이 파기\n(단, 관계 법령에 따라 보존이 필요한 경우 해당 법령에서 정한 기간 동안 보관)\n귀하는 개인정보 수집 및 이용에 대한 동의를 거부하실 수 있으며, 이 경우 상품 등록 신청이 제한될 수 있습니다.\n※ 자세한 사항은 개인정보처리방침을 참조하시기 바랍니다.",
  consentLabel = "개인정보 수집 및 이용에 동의합니다",
  className,
  labelClassName,
  descriptionClassName,
  required = true,
  disabled = false,
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-5", className)}>
          {label && (
            <div className="flex items-center mb-2">
              <FormLabel
                className={cn(
                  "text-lg font-medium",
                  labelClassName,
                  required &&
                    "after:content-['*'] after:text-destructive after:ml-0.5 after:text-red-600"
                )}
              >
                {label}
              </FormLabel>
            </div>
          )}

          {/* 개인정보 수집 동의 텍스트 박스 */}
          <div
            className={cn(
              "border border-gray-300 rounded-[20px] p-8 bg-white h-[200px] overflow-y-auto"
            )}
          >
            <div className="whitespace-pre-line text-gray-700 body-5">
              {consentText}
            </div>
          </div>

          {/* 동의 체크박스 */}
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                size={"lg"}
                disabled={disabled}
              />
            </FormControl>
            <div className="flex items-center font-medium body-3">
              <span>{consentLabel}</span>
              {required && (
                <span className="text-primary-blue ml-2">(필수)</span>
              )}
            </div>
          </div>

          {description && (
            <FormDescription className={cn(descriptionClassName)}>
              {description}
            </FormDescription>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormPrivacyConsent;
