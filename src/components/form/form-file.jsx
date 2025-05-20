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
import { File, Trash2, Plus } from "lucide-react";
import fetcher from "@/lib/fetcher";
import { toast } from "sonner";
import Img from "@/components/ui/img";

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
  maxfilesize = 20,
  maxfilecount = 1,
  maxtotalsize = 2,
  minwidth = 600,
  minheight = 400,
  action,
  required,
  accept = ".jpg, .jpeg, .gif, .png, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx",
  wrapClassName,
  fileType = "image", // 'image' 또는 'document' 중 하나를 선택
  ...props
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [fileList, setFileList] = useState([]);
        const [uploading, setUploading] = useState(false);
        const [errors, setErrors] = useState(null);
        const [previewUrls, setPreviewUrls] = useState({});
        const [imageErrors, setImageErrors] = useState({});

        // 파일 크기 검증 (MB 단위)
        const validateFileSize = (file) => {
          // 파일 크기를 MB 단위로 변환 (1MB = 1024 * 1024 바이트)
          const fileSizeInMB = file.size / (1024 * 1024);
          return fileSizeInMB <= maxfilesize;
        };
        // 허용된 확장자 리스트 생성
        const allowedExtensions = accept
          .split(",")
          .map((ext) => ext.trim().replace(".", "").toLowerCase());
        // 파일 총 크기 계산
        const getTotalSizeMB = (files) => {
          return (
            files.reduce((acc, file) => acc + (file?.size || 0), 0) /
            (1024 * 1024)
          );
        };

        const getFileExtension = (filename) =>
          filename.split(".").pop()?.toLowerCase();

        // 이미지 파일인지 확인
        const isImageFile = (filename) => {
          if (!filename) return false;
          const extension = getFileExtension(filename);
          return ["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(
            extension
          );
        };

        // 미리보기 URL 생성 함수 (FileReader 사용)
        const createPreviewUrl = (file) => {
          if (!file) return Promise.resolve(null);

          // 브라우저 환경에서만 실행
          if (typeof window === "undefined") return Promise.resolve(null);

          return new Promise((resolve) => {
            try {
              // File 객체인지 확인
              if (
                file instanceof Blob ||
                (file.name && file.type && file.size)
              ) {
                console.log("FileReader로 파일 읽기:", file.name);
                const reader = new FileReader();
                reader.onload = () => {
                  resolve(reader.result);
                };
                reader.onerror = () => {
                  console.error("FileReader 오류:", reader.error);
                  resolve(null);
                };
                reader.readAsDataURL(file);
              } else {
                resolve(null);
              }
            } catch (error) {
              console.error("미리보기 URL 생성 오류:", error);
              resolve(null);
            }
          });
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

        // 이미지 최소 크기 검사
        const checkImageDimensions = (file, minwidth, minheight) => {
          return new Promise((resolve) => {
            if (!file || typeof window === "undefined") {
              resolve({ isValid: false });
              return;
            }

            const img = new Image();
            const objectUrl = URL.createObjectURL(file);

            img.onload = () => {
              const isValid = img.width >= minwidth && img.height >= minheight;
              URL.revokeObjectURL(objectUrl); // 사용 후 메모리 해제
              resolve({ isValid, width: img.width, height: img.height });
            };

            img.onerror = () => {
              URL.revokeObjectURL(objectUrl); // 에러시에도 메모리 해제
              resolve({ isValid: false });
            };

            img.src = objectUrl;
          });
        };

        // 파일 변경 핸들러
        const handleFileChange = async (e) => {
          setErrors(null);
          const selectedFiles = Array.from(e.target.files || []).filter(
            (file) => file && file.name
          );

          if (selectedFiles.length === 0) return;

          // 확장자 검사
          for (const file of selectedFiles) {
            const extension = getFileExtension(file.name);
            if (!allowedExtensions.includes(extension)) {
              const errorMsg =
                "유효한 파일 형식이 아닙니다. 파일 형식을 다시 확인해 주세요.";
              toast.error(errorMsg);
              setErrors(errorMsg);
              return;
            }
          }

          // 개수 검사
          const currentCount = countValidFiles(field.value);
          if (currentCount + selectedFiles.length > maxfilecount) {
            const errorMsg = `최대 ${maxfilecount}개의 파일만 업로드할 수 있습니다`;
            toast.error(errorMsg);
            setErrors(errorMsg);
            return;
          }

          // 용량 검사
          for (const file of selectedFiles) {
            const fileSizeMB = file.size / (1024 * 1024);
            if (fileSizeMB > maxfilesize) {
              const errorMsg = `파일은 1개당 ${maxfilesize}MB를 초과할 수 없습니다.`;
              toast.error(errorMsg);
              setErrors(errorMsg);
              return;
            }
          }

          // 총 용량 검사
          const currentFiles = getValidFiles(field.value);
          const totalSizeMB = getTotalSizeMB([
            ...currentFiles,
            ...selectedFiles,
          ]);
          if (totalSizeMB > maxtotalsize) {
            const errorMsg = `총 업로드 용량은 ${maxtotalsize}MB를 초과할 수 없습니다.`;
            toast.error(errorMsg);
            setErrors(errorMsg);
            return;
          }

          // 이미지 타입인 경우 이미지 크기 검사
          if (fileType === "image") {
            for (const file of selectedFiles) {
              if (isImageFile(file.name)) {
                const { isValid, width, height } = await checkImageDimensions(
                  file,
                  minwidth || 0,
                  minheight || 0
                );

                if (!isValid) {
                  const errorMsg = `이미지 최소 크기는 ${minwidth}x${minheight}px 이상이어야 합니다. 현재: ${width}x${height}`;
                  toast.error(errorMsg);
                  setErrors(errorMsg);
                  return;
                }
              }
            }
          }

          // 이미지 파일 미리보기 생성
          if (fileType === "image") {
            try {
              const previewPromises = selectedFiles.map(async (file) => {
                const fileId = file.name;
                return { fileId, dataUrl: await createPreviewUrl(file) };
              });

              // 모든 미리보기 처리 완료 후 한 번에 상태 업데이트
              const results = await Promise.all(previewPromises);

              setPreviewUrls((prevUrls) => {
                const newUrls = { ...prevUrls };
                results.forEach(({ fileId, dataUrl }) => {
                  if (dataUrl) {
                    newUrls[fileId] = dataUrl;
                  }
                });
                return newUrls;
              });
            } catch (error) {
              console.error("미리보기 생성 오류:", error);
            }
          }

          // 통과 시 업로드
          const uploadedFiles = await uploadFiles(selectedFiles);
          const newFiles = [...currentFiles, ...uploadedFiles];
          field.onChange(newFiles.length > 0 ? newFiles : undefined);
          setFileList(newFiles);
        };

        // 파일 삭제 핸들러
        const handleRemoveFile = (index) => {
          // 오류 상태 초기화
          setErrors(null);

          const newFiles = [...fileList];
          const fileToRemove = newFiles[index];

          // 파일 미리보기 URL 정리
          if (fileType === "image" && fileToRemove) {
            const fileId = fileToRemove.name || `file-${index}`;
            if (previewUrls[fileId]) {
              // blob URL인 경우에만 메모리 해제
              if (previewUrls[fileId].startsWith("blob:")) {
                URL.revokeObjectURL(previewUrls[fileId]);
              }
              const newPreviewUrls = { ...previewUrls };
              delete newPreviewUrls[fileId];
              setPreviewUrls(newPreviewUrls);
              console.log("previewUrls:", newPreviewUrls);
            }
          }

          // 모든 파일을 delYn으로 표시하도록 변경 (실제 배열에서 제거하지 않음)
          newFiles[index] = {
            ...newFiles[index],
            delYn: true,
          };

          console.log("newFiles:", newFiles);

          // 전체 파일 목록을 유지하면서 form value 업데이트 (삭제된 파일도 포함)
          field.onChange(newFiles.length > 0 ? newFiles : undefined);

          // UI 표시를 위해 fileList 업데이트
          setFileList(newFiles);
        };

        // 파일 구분 식별자 생성 - 간소화
        const getFileIdentifier = (file, index) => {
          if (!file) return `empty-${index}`;

          // 파일 이름이 있으면 이름 사용
          if (file.name) {
            return file.name;
          }

          // 서버 파일 객체인 경우
          if (file.fileOriginalName) {
            return file.fileOriginalName;
          }

          // 식별자가 없는 경우 인덱스 기반으로 생성
          return `file-${index}`;
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

        // 이미지 오류 처리 함수 (수정)
        const handleImageError = (fileId) => {
          console.log("이미지 로드 실패:", fileId);

          setImageErrors((prev) => ({
            ...prev,
            [fileId]: true,
          }));
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
              const filteredFiles = files.filter(
                (file) =>
                  file !== null &&
                  file !== undefined &&
                  typeof file === "object" &&
                  (("name" in file && file.name) ||
                    ("fileOriginalName" in file && file.fileOriginalName))
              );

              setFileList(filteredFiles);

              // 이미지 파일 미리보기 생성
              if (fileType === "image") {
                const validFilesForPreview = filteredFiles.filter(
                  (file) => !file.delYn
                );

                // 모든 미리보기 요청을 비동기로 생성
                const loadPreviews = async () => {
                  try {
                    const previewPromises = validFilesForPreview.map(
                      async (file) => {
                        const fileId = getFileIdentifier(file, 0);
                        return {
                          fileId,
                          dataUrl: await createPreviewUrl(file),
                        };
                      }
                    );

                    // 모든 미리보기 처리 완료 후 한 번에 상태 업데이트
                    const results = await Promise.all(previewPromises);

                    // 기존 상태를 유지하면서 새 미리보기 추가
                    setPreviewUrls((prevUrls) => {
                      const newUrls = { ...prevUrls };
                      results.forEach(({ fileId, dataUrl }) => {
                        if (dataUrl) {
                          newUrls[fileId] = dataUrl;
                        }
                      });
                      return newUrls;
                    });
                  } catch (error) {
                    console.error("미리보기 로드 오류:", error);
                  }
                };

                loadPreviews();
              }
            } else {
              setFileList([]);
              setPreviewUrls({});
            }
          } catch (error) {
            console.error("파일 목록 처리 중 오류:", error);
            setFileList([]);
          }
        }, [field.value, fileType]);

        // URL 메모리 해제 로직은 Data URL 사용으로 필요 없어짐
        useEffect(() => {
          return () => {
            // FileReader는 자동으로 가비지 컬렉션되므로 명시적인 정리가 필요 없음
          };
        }, []);

        // 필터링된 유효한 파일 목록
        const validFiles = fileList.filter((file) => !file.delYn);

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

            <FormControl>
              <div>
                <Input
                  id={`file-input-${name}`}
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  multiple={maxfilecount > 1}
                  disabled={uploading}
                  {...props}
                  accept={accept}
                />

                {/* 이미지 업로드 UI */}
                {fileType === "image" && (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {validFiles.length < maxfilecount && (
                      <div
                        className="w-[120px] h-[120px] relative overflow-hidden bg-blue-50 aspect-square border border-gray-300 border-dashed rounded-[8px] flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          document.getElementById(`file-input-${name}`).click()
                        }
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Plus className="h-6 w-6 text-gray-400 mb-1" />
                          <span className="text-xs text-gray-500">
                            이미지 업로드
                          </span>
                        </div>
                      </div>
                    )}

                    {validFiles.map((file, index) => {
                      const fileId = getFileIdentifier(file, index);
                      const previewUrl = previewUrls[fileId];
                      const hasError = imageErrors[fileId];

                      return (
                        <div
                          key={`${fileId}-${index}`}
                          className="w-[120px] h-[120px] relative overflow-hidden bg-gray-100 aspect-square border border-gray-300 rounded-[8px] flex items-center justify-center"
                        >
                          {previewUrl && !hasError ? (
                            <img
                              src={previewUrl}
                              alt={getFileName(file)}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(fileId)}
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                              <File className="h-6 w-6 text-gray-400 mb-1" />
                              <span className="text-xs text-gray-500 line-clamp-2 max-w-full">
                                {getFileName(file)}
                              </span>
                            </div>
                          )}

                          <button
                            type="button"
                            className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-1"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 4L4 12"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 4L12 12"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 문서 파일 업로드 UI */}
                {fileType === "document" && (
                  <div className="mt-2">
                    <div
                      className={cn(
                        "flex items-center py-3 px-4 border border-gray-300 rounded-[8px] cursor-pointer",
                        validFiles.length >= maxfilecount &&
                          "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => {
                        if (validFiles.length < maxfilecount) {
                          document.getElementById(`file-input-${name}`).click();
                        }
                      }}
                    >
                      <Img
                        src="/images/icon/ic_default_search.svg"
                        alt="파일 첨부"
                        width={24}
                        height={24}
                      />
                      <span className="ml-2 text-gray-500">파일 찾기</span>
                    </div>

                    {validFiles.length > 0 && (
                      <ul className="mt-2 border border-gray-300 rounded-[8px] divide-y divide-gray-300">
                        {validFiles.map((file, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between p-3 text-sm"
                          >
                            <div className="flex items-center gap-2 overflow-hidden">
                              <File className="h-5 w-5 text-gray-400 flex-shrink-0" />
                              <span className="truncate">
                                {getFileName(file)}
                              </span>
                              {file &&
                              typeof file === "object" &&
                              "fileSize" in file ? (
                                <span className="text-xs text-gray-500 flex-shrink-0">
                                  ({formatFileSize(file.fileSize)})
                                </span>
                              ) : file &&
                                typeof file === "object" &&
                                "size" in file ? (
                                <span className="text-xs text-gray-500 flex-shrink-0">
                                  ({formatFileSize(file.size)})
                                </span>
                              ) : null}
                            </div>
                            <button
                              type="button"
                              className="ml-2 p-1"
                              onClick={() =>
                                handleRemoveFile(
                                  fileList.findIndex(
                                    (f) =>
                                      (f.name === file.name &&
                                        f.size === file.size) ||
                                      (f.fileOriginalName ===
                                        file.fileOriginalName &&
                                        f.fileSize === file.fileSize)
                                  )
                                )
                              }
                            >
                              <Img
                                src="/images/icon/ic_default_close.svg"
                                alt="삭제"
                                width={16}
                                height={16}
                              />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </FormControl>

            {errors && (
              <p className="text-sm font-medium text-destructive mt-1">
                {errors}
              </p>
            )}

            {description && (
              <FormDescription className={cn("mt-1", descriptionClassName)}>
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
