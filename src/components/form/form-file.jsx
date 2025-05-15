"use client";

import { useEffect, useState } from "react";
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
import { Button } from "@/components/ui/button";
import { File, Trash2 } from "lucide-react";
import fetcher from "@/lib/fetcher";
import { toast } from "sonner";

// 파일 사이즈 포맷팅 함수
const formatFileSize = (size) => {
  if (!size || typeof size !== "number") return "";

  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  }
};

const FormFile = ({
  control,
  name,
  label,
  description = "",
  labelSide,
  className,
  labelClassName,
  descriptionClassName,
  maxFileSize = 20,
  maxFileCount = 1,
  action,
  required,
  accept = ".jpg, .jpeg, .gif, .png",
  wrapClassName,
  ...props
}) => {
  console.log(maxFileCount);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [fileList, setFileList] = useState([]);
        const [uploading, setUploading] = useState(false);
        const [errors, setErrors] = useState(null);

        // 파일 크기 검증 (MB 단위)
        const validateFileSize = (file) => {
          // 파일 크기를 MB 단위로 변환 (1MB = 1024 * 1024 바이트)
          const fileSizeInMB = file.size / (1024 * 1024);
          return fileSizeInMB <= maxFileSize;
        };

        // 파일 업로드 함수
        const uploadFiles = async (files) => {
          if (!files || files.length === 0) return [];

          try {
            setUploading(true);

            const formData = new FormData();
            for (const file of files) {
              // 이미 서버에서 받은 파일이 아닌 경우만 추가
              if (!file.fileOriginalName) {
                formData.append("files", file);
              }
            }

            // 새 파일이 없는 경우 업로드 생략
            if (formData.getAll("files").length === 0) {
              return [];
            }

            // API 호출하여 파일 업로드
            const uploadedFiles = await fetcher("/api/file/uploads", {
              method: "POST",
              body: formData,
            });

            return uploadedFiles;
          } catch (error) {
            console.error("파일 업로드 중 오류 발생:", error);
            toast.error("파일 업로드에 실패했습니다");
            return [];
          } finally {
            setUploading(false);
          }
        };

        // 유효한 파일만 필터링하는 함수
        const getValidFiles = (files) => {
          if (!files) return [];

          const filesArray = Array.isArray(files) ? files : [files];
          return filesArray.filter(
            (file) =>
              file &&
              typeof file === "object" &&
              (("name" in file && file.name) ||
                ("fileOriginalName" in file && file.fileOriginalName)) &&
              (!("delYn" in file) || file.delYn !== true)
          );
        };

        // 현재 파일 수 계산 (실제 유효한 파일만)
        const countValidFiles = (files) => {
          return getValidFiles(files).length;
        };

        // 파일 변경 핸들러
        const handleFileChange = async (e) => {
          // 오류 상태 초기화
          setErrors(null);

          const selectedFiles = Array.from(e.target.files || []).filter(
            (file) => file && file.name
          ); // 유효한 파일만 필터링

          if (selectedFiles.length === 0) return;

          // 현재 유효한 파일 수 계산 (삭제되지 않은 파일)
          const currentCount = countValidFiles(field.value);

          // 파일 수 검증
          if (currentCount + selectedFiles.length > maxFileCount) {
            const errorMsg = `최대 ${maxFileCount}개의 파일만 업로드할 수 있습니다`;
            setErrors(errorMsg);
            toast.error(errorMsg);
            return;
          }

          // 파일 크기 검증
          const oversizedFiles = selectedFiles.filter(
            (file) => !validateFileSize(file)
          );
          if (oversizedFiles.length > 0) {
            const errorMsg = `파일 크기는 ${maxFileSize}MB 이하여야 합니다`;
            setErrors(errorMsg);
            toast.error(errorMsg);
            return;
          }

          // 파일 업로드 API 호출
          const uploadedFiles = await uploadFiles(selectedFiles);

          // 현재 전체 파일 목록 가져오기 (삭제된 파일 포함)
          const currentFiles = Array.isArray(field.value)
            ? field.value
            : field.value
            ? [field.value]
            : [];

          // 새 파일 목록 생성
          let newFiles;

          newFiles = [...currentFiles, ...uploadedFiles];

          field.onChange(newFiles.length > 0 ? newFiles : undefined);
          setFileList(newFiles);
        };

        // 파일 삭제 핸들러
        const handleRemoveFile = (index) => {
          // 오류 상태 초기화
          setErrors(null);

          const newFiles = [...fileList];

          // 모든 파일을 delYn으로 표시하도록 변경 (실제 배열에서 제거하지 않음)
          newFiles[index] = {
            ...newFiles[index],
            delYn: true,
          };

          // 전체 파일 목록을 유지하면서 form value 업데이트 (삭제된 파일도 포함)
          field.onChange(newFiles.length > 0 ? newFiles : undefined);

          // UI 표시를 위해 fileList 업데이트
          setFileList(newFiles);
        };

        // 파일 이름 표시 함수
        const getFileName = (file) => {
          // File 객체인 경우 (안전하게 체크)
          if (
            file &&
            typeof file === "object" &&
            "name" in file &&
            typeof file.name === "string"
          ) {
            return file.name;
          }
          // 서버에서 받은 파일 객체인 경우
          if (file && typeof file === "object" && "fileOriginalName" in file) {
            return file.fileOriginalName || "파일";
          }
          return "파일";
        };

        // 필드 값이 변경되면 fileList 상태 업데이트
        useEffect(() => {
          try {
            if (field.value) {
              // 배열이 아닌 경우 배열로 변환
              const files = Array.isArray(field.value)
                ? field.value
                : [field.value];

              // fileList는 모든 파일 포함 (삭제 표시된 파일도 포함)
              setFileList(
                files.filter(
                  (file) =>
                    file !== null &&
                    file !== undefined &&
                    typeof file === "object" &&
                    (("name" in file && file.name) ||
                      ("fileOriginalName" in file && file.fileOriginalName))
                )
              );
            } else {
              setFileList([]);
            }
          } catch (error) {
            console.error("파일 목록 처리 중 오류:", error);
            setFileList([]);
          }
        }, [field.value]);

        return (
          <FormItem className={cn(wrapClassName)}>
            {label && (
              <div className="flex items-center">
                <FormLabel
                  className={cn(
                    required &&
                      "after:content-['*'] after:text-destructive after:ml-0.5",
                    labelClassName
                  )}
                >
                  {label}
                </FormLabel>
                {labelSide && labelSide}
              </div>
            )}
            <div className="flex items-center gap-2">
              <FormControl>
                <Input
                  type="file"
                  className={cn("cursor-pointer", className)}
                  onChange={handleFileChange}
                  value="" // 항상 빈 값으로 설정하여 같은 파일 재선택 가능
                  disabled={uploading}
                  {...props}
                  accept={accept}
                />
              </FormControl>
              {action && action}
            </div>

            {fileList.length > 0 && (
              <ul className="space-y-2 rounded-md border px-2 py-1">
                {fileList.map((file, index) => {
                  // 파일이 삭제 표시되었는지 확인
                  const isDeleted =
                    file &&
                    typeof file === "object" &&
                    "delYn" in file &&
                    file.delYn === true;

                  return (
                    <li
                      key={index}
                      className={cn(
                        "flex items-center justify-between gap-2 text-sm w-full",
                        isDeleted &&
                          "text-muted-foreground line-through opacity-70"
                      )}
                    >
                      <div className="flex items-center gap-2 overflow-hidden w-full">
                        <File className="h-4 w-4 shrink-0" />

                        {file && file.filePath && !isDeleted ? (
                          <a
                            href={file.filePath}
                            download={getFileName(file)}
                            target="_blank"
                            className="truncate w-0 flex-1 cursor-pointer hover:underline"
                          >
                            {getFileName(file)}
                          </a>
                        ) : (
                          <span className="truncate w-0 flex-1">
                            {getFileName(file)}
                          </span>
                        )}
                        {file &&
                        typeof file === "object" &&
                        "fileSize" in file ? (
                          <span className="text-xs text-muted-foreground">
                            ({formatFileSize(file.fileSize)})
                          </span>
                        ) : file &&
                          typeof file === "object" &&
                          "size" in file ? (
                          <span className="text-xs text-muted-foreground">
                            ({formatFileSize(file.size)})
                          </span>
                        ) : null}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => {
                          if (isDeleted) {
                            // 삭제된 파일 복구
                            const newFiles = [...fileList];
                            newFiles[index] = {
                              ...newFiles[index],
                              delYn: false,
                            };

                            // 전체 파일 목록 업데이트 (복구된 파일 포함)
                            field.onChange(newFiles);
                            setFileList(newFiles);
                          } else {
                            // 파일 삭제
                            handleRemoveFile(index);
                          }
                        }}
                        type="button"
                      >
                        {isDeleted ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-rotate-ccw"
                          >
                            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                            <path d="M3 3v5h5" />
                          </svg>
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )}

            {errors && (
              <p className="text-sm font-medium text-destructive">{errors}</p>
            )}

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

export default FormFile;
