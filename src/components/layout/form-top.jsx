"use client";
import Img from "@/components/ui/img";

export default function FormTop({ text, children }) {
  return (
    <div className="px-8 py-5 border border-gray-300 rounded-[16px]">
      <div className="flex items-center gap-1 body5 font-medium">
        <Img
          src="/images/icon/ic_alarm.svg"
          width={20}
          height={20}
          alt="알림"
        />
        <p>{text}</p>
      </div>
      {children}
    </div>
  );
}
