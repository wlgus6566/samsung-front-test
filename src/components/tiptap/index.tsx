"use client";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { memo } from "react";

// TiptapEditor props 타입 정의
interface TiptapWrapProps {
  value?: string | object;
  onChange?: (content: string) => void;
  readOnly?: boolean;
  [key: string]: any;
}

const Tiptap = dynamic(() => import("./tiptap"), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-[342px] rounded-md" />,
});

const TiptapWrap = memo(
  ({
    value = "",
    onChange = () => {},
    readOnly = false,
    ...props
  }: TiptapWrapProps) => {
    return (
      <Tiptap
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        {...props}
      />
    );
  }
);

TiptapWrap.displayName = "TiptapWrap";

export default TiptapWrap;
