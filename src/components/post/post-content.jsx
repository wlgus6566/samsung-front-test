"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { decode } from "html-entities";
import "./post-content.css";

export default function PostContent({ children, fileList, download }) {
  const deepDecode = (input) => {
    if (!input) return "";
    let result = input;
    let prevResult = "";

    while (prevResult !== result) {
      prevResult = result;
      result = decode(result);
    }

    return result;
  };
  const decodedChildren = useMemo(() => {
    return typeof children === "string" ? deepDecode(children) : "";
  }, [children]);

  const downloadFile = async (link) => {
    try {
      if (fileList?.length === 0) {
        alert("다운로드할 파일이 없습니다.");
        return;
      }

      const fileUrl = `/api/file/download/${link.attachingFileSeq}`;
      const fileName = link.fileOriginalName;

      const response = await fetch(fileUrl);
      if (!response.ok) throw new Error("다운로드 실패");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("다운로드 오류:", error);
      alert(error.message);
    }
  };

  return (
    <>
      {/* 링크 */}
      {fileList?.length > 0 && (
        <div className="pt-[30px] pb-[40px] text-[15px]">
          <div className="flex items-start gap-[40px]">
            <span className="font-bold">{download ? "첨부파일" : "링크"}</span>
            <div className="space-y-[12px] flex-1">
              {fileList.map((link, index) => (
                <button
                  key={index}
                  onClick={() => downloadFile(link)}
                  className="text-black underline break-words flex w-full items-center justify-between whitespace-normal text-left"
                >
                  {link.fileOriginalName}
                  {download && (
                    <Image
                      src="/images/icon/ic_download.svg"
                      alt="download"
                      width={24}
                      height={24}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* 내용 */}
      <div>
        <div
          className="prose w-full max-w-none border-t-1 border-[#eee] text-[16px] pt-[40px] pb-[80px]"
          dangerouslySetInnerHTML={{
            __html: decodedChildren,
          }}
        />
      </div>
    </>
  );
}
