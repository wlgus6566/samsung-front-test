"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Img from "@/components/ui/img";

// 이메일 유효성 검사를 위한 함수
const isValidLocalPart = (localPart) => {
  const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/;
  return regex.test(localPart);
};

const isValidDomain = (domain) => {
  const regex =
    /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return regex.test(domain);
};

const FormEmail = ({
  control,
  name,
  label,
  description = "",
  placeholder = "이메일 입력",
  domainPlaceholder = "도메인 입력",
  required = false,
  className,
  inputClassName,
  labelClassName,
  descriptionClassName,
  size = "md",
  ...props
}) => {
  const [localPart, setLocalPart] = useState("");
  const [domain, setDomain] = useState("");

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => {
        // 로컬 파트와 도메인 값이 변경될 때 전체 이메일 값을 업데이트
        useEffect(() => {
          if (localPart || domain) {
            field.onChange(localPart + (domain ? "@" + domain : ""));
          } else {
            field.onChange("");
          }
        }, [localPart, domain, field]);

        // 초기값이 있는 경우 파싱
        useEffect(() => {
          if (
            field.value &&
            typeof field.value === "string" &&
            field.value.includes("@")
          ) {
            const [initLocalPart, initDomain] = field.value.split("@");
            setLocalPart(initLocalPart);
            setDomain(initDomain);
          }
        }, []);

        return (
          <FormItem className={cn(className)}>
            {label && (
              <FormLabel required={required} className={cn(labelClassName)}>
                {label}
              </FormLabel>
            )}
            <div className="flex items-center w-[680px]">
              <div className="relative flex-1">
                <FormControl>
                  <Input
                    type="text"
                    placeholder={placeholder}
                    className={cn(inputClassName)}
                    size={size}
                    value={localPart}
                    onChange={(e) => setLocalPart(e.target.value)}
                    {...props}
                  />
                </FormControl>
              </div>
              <div className="px-1 text-black body-2 font-semibold">@</div>
              <div className="relative flex-1">
                <FormControl>
                  <Input
                    type="text"
                    className={cn(inputClassName)}
                    size={size}
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    {...props}
                  />
                </FormControl>
              </div>
            </div>
            {description && !error && (
              <FormDescription className={cn(descriptionClassName)}>
                {description}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormEmail;
