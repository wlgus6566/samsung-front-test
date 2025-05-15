"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDaumPostcodePopup } from "react-daum-postcode";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useRef, useCallback } from "react";

const FormAddress = ({
  control,
  zipCodeName = "zipCode",
  addressName = "address",
  detailAddressName = "detailAddress",
  label = "주소",
  className,
  labelClassName,
  required,
}) => {
  const fieldsRef = useRef({});

  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );

  const handleComplete = useCallback((data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    fieldsRef.current.zipField?.onChange(data.zonecode || "");
    fieldsRef.current.addressField?.onChange(fullAddress || "");
    fieldsRef.current.detailField?.onChange("");
  }, []);

  const handleAddressSearch = useCallback(() => {
    open({
      onComplete: handleComplete,
    });
  }, [open, handleComplete]);

  return (
    <FormItem className={cn("flex flex-col gap-2", className)}>
      {label && (
        <FormLabel
          className={cn(
            "text-sm font-medium",
            required &&
              "after:content-['*'] after:text-destructive after:ml-0.5",
            labelClassName
          )}
        >
          {label}
        </FormLabel>
      )}
      <div className="flex gap-2">
        <FormField
          control={control}
          name={zipCodeName}
          render={({ field }) => {
            // 현재 field 객체를 ref에 저장
            fieldsRef.current.zipField = field;

            return (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    placeholder="우편번호"
                    readOnly
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <Button type="button" variant="outline" onClick={handleAddressSearch}>
          주소 찾기
        </Button>
      </div>
      <FormField
        control={control}
        name={addressName}
        render={({ field }) => {
          // 현재 field 객체를 ref에 저장
          fieldsRef.current.addressField = field;

          return (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="기본 주소"
                  readOnly
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        control={control}
        name={detailAddressName}
        render={({ field }) => {
          // 현재 field 객체를 ref에 저장
          fieldsRef.current.detailField = field;

          return (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  value={field.value || ""}
                  placeholder="상세 주소"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </FormItem>
  );
};

export default FormAddress;
