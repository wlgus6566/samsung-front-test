"use client";

import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

function DatePicker({
  field,
  value,
  onChange,
  placeholder = "날짜 선택",
  className,
  mode = "single",
  minDate = new Date("1900-01-01"),
  maxDate = new Date(),
}) {
  // 폼 컨텍스트인지 확인
  const isControlled = !!field;

  // 실제 사용할 값과 핸들러
  const dateValue = isControlled ? field.value : value;
  const handleChange = isControlled ? field.onChange : onChange;

  // 날짜 포맷팅 함수
  const formatDate = (date) => {
    if (!date) return null;

    if (mode === "range") {
      if (!date.from) return null;
      if (!date.to) return format(date.from, "yyyy.MM.dd", { locale: ko });
      return `${format(date.from, "yyyy.MM.dd", { locale: ko })} - ${format(
        date.to,
        "yyyy.MM.dd",
        { locale: ko }
      )}`;
    }

    return format(date, "yyyy.MM.dd", { locale: ko });
  };

  // 버튼 렌더링
  const renderTrigger = () => {
    const buttonContent = (
      <>
        {formatDate(dateValue) || (
          <span className="text-muted-foreground">{placeholder}</span>
        )}
        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
      </>
    );

    const buttonProps = {
      variant: "outline",
      className: cn(
        "w-[240px] pl-3 text-left font-normal",
        !dateValue && "text-muted-foreground",
        "focus-visible:border-primary",
        "data-[state=open]:border-primary",
        className
      ),
    };

    if (isControlled) {
      return (
        <FormControl>
          <Button {...buttonProps}>{buttonContent}</Button>
        </FormControl>
      );
    }

    return <Button {...buttonProps}>{buttonContent}</Button>;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>{renderTrigger()}</PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode={mode}
          selected={dateValue}
          onSelect={handleChange}
          disabled={(date) => date > maxDate || date < minDate}
          initialFocus
          locale={ko}
          formatters={{
            formatCaption: (date) => format(date, "yyyy년 M월", { locale: ko }),
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker };
