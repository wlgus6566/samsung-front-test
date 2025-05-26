"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { decode } from "html-entities";
import "./post-content.css";

export default function PostContent({ children, fileList }) {
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

  // 파일 크기를 포맷하는 함수
  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)}MB`;
  };

  return (
    <>
      {/* 내용 */}
      <div
        className="prose w-full max-w-none border-t-1 border-[#eee] text-[16px] md:pt-10 md:pb-21.5"
        dangerouslySetInnerHTML={{
          __html: decodedChildren,
        }}
      />
      {/* 첨부파일 */}
      {fileList?.length > 0 && (
        <div className="pt-4 pb-10 flex flex-col gap-4">
          <h3 className="text-xs font-semibold text-black">첨부파일</h3>
          <div className="flex flex-wrap gap-2">
            {fileList.map((file, index) => (
              <button
                key={index}
                onClick={() => downloadFile(file)}
                className="flex items-center gap-2 bg-blue-50 hover:bg-blue-100 transition-colors rounded-md px-4 py-1.5"
              >
                <span className="text-xs font-semibold text-gray-800">
                  {file.fileOriginalName}
                </span>
                <span className="text-xs font-semibold text-blue-500">
                  {formatFileSize(file.fileSize)}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
