"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import TiptapEditor from "@/components/tiptap";
import { cn } from "@/lib/utils";
import { useEffect, useState, useRef } from "react";
import { decode } from "html-entities";

// 반복적으로 디코딩하는 함수
const deepDecode = (input) => {
  if (!input) return "";
  let result = input;
  let prevResult = "";

  // 더 이상 변화가 없을 때까지 디코딩 반복
  while (prevResult !== result) {
    prevResult = result;
    result = decode(result);
  }

  return result;
};

const FormTiptap = ({
  control,
  name,
  label,
  description = "",
  placeholder,
  className,
  labelClassName,
  descriptionClassName,
  required = false,
  initialValue = "",
}) => {
  // 초기값이 설정되었는지 추적하는 ref
  const initialValueSetRef = useRef(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // HTML 값을 디코딩하여 사용
        const [decodedValue, setDecodedValue] = useState("");
        // 사용자가 편집 중인지 여부를 추적
        const isEditingRef = useRef(false);
        // 마지막으로 디코딩된 값
        const lastDecodedValueRef = useRef("");

        // 초기값 설정 로직 - 컴포넌트가 마운트될 때와 initialValue가 변경될 때만 실행
        useEffect(() => {
          // 이미 초기값이 설정되었고 사용자가 편집 중이면 값을 업데이트하지 않음
          if (initialValueSetRef.current && isEditingRef.current) {
            return;
          }

          // 초기값이 있을 때만 설정
          if (initialValue && !initialValueSetRef.current) {
            const decoded = deepDecode(initialValue);
            setDecodedValue(decoded);
            lastDecodedValueRef.current = decoded;

            // 폼 필드 값이 없을 때만 onChange 호출
            if (!field.value) {
              field.onChange(initialValue);
            }

            initialValueSetRef.current = true;
          }
        }, [initialValue, field]);

        // 필드 값이 변경될 때 디코딩 로직
        useEffect(() => {
          // 편집 중인 경우 값 업데이트 스킵
          if (isEditingRef.current) {
            return;
          }

          // 필드에 값이 있고, 마지막으로 디코딩된, 값과 다를 때만 업데이트
          if (field.value && field.value !== lastDecodedValueRef.current) {
            const decoded = deepDecode(field.value);

            // 이전 디코딩 값과 다를 때만 상태 업데이트
            if (decoded !== lastDecodedValueRef.current) {
              lastDecodedValueRef.current = decoded;
              setDecodedValue(decoded);
            }
          } else if (!field.value) {
            lastDecodedValueRef.current = "";
            setDecodedValue("");
          }
        }, [field.value]);

        // Tiptap에서 변경된 값을 폼에 전달
        const handleChange = (html) => {
          // 편집 중임을 표시
          isEditingRef.current = true;

          // 폼 필드 값 업데이트
          field.onChange(html);

          // 편집 완료 후 일정 시간 후에 편집 상태 해제
          setTimeout(() => {
            isEditingRef.current = false;
          }, 500);
        };

        // 포커스 아웃 시 편집 상태 해제
        const handleBlur = (e) => {
          field.onBlur(e);
          isEditingRef.current = false;
        };

        return (
          <FormItem className="flex flex-col">
            {label && (
              <FormLabel
                className={cn(
                  labelClassName,
                  required &&
                    "after:content-['*'] after:text-destructive after:ml-0.5"
                )}
              >
                {label}
              </FormLabel>
            )}
            <FormControl>
              <TiptapEditor
                value={decodedValue}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(className)}
                placeholder={placeholder}
              />
            </FormControl>
            {description && (
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

export default FormTiptap;
