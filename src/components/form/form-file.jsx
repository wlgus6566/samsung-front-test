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
import { File, Check } from "lucide-react";
import Img from "@/components/ui/img";
import { toast } from "sonner";

const formatFileSize = (size) => {
  if (!size || typeof size !== "number") return "";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
  return `${(size / (1024 * 1024)).toFixed(2)} MB`;
};

const getFileExtension = (filename) => filename.split(".").pop()?.toLowerCase();

const isImageFile = (filename) => {
  if (!filename) return false;
  const extension = getFileExtension(filename);
  return ["jpg", "jpeg", "png", "gif", "bmp", "tif", "webp"].includes(
    extension
  );
};

const validateImageDimensions = (file, minwidth, minheight) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (img.width >= minwidth && img.height >= minheight) {
        resolve(true);
      } else {
        reject();
      }
    };
    img.onerror = () => reject();
    img.src = URL.createObjectURL(file);
  });
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
  maxfilecount = 4,
  required,
  accept = ".jpg, .jpeg, .png, .gif, .bmp, .tif, .webp",
  allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp", "tif", "webp"],
  wrapClassName,
  fileType = "image",
  minwidth = 600,
  minheight = 600,
  maxfilesize = 1,
  maxtotalsize = 3,
  ...props
}) => {
  const isImageType = fileType === "image";
  const isDocumentType = fileType === "document";

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const [fileList, setFileList] = useState([]);
        const [previewUrls, setPreviewUrls] = useState({});

        const handleFileChange = async (e) => {
          const selectedFiles = Array.from(e.target.files || []).filter(
            (file) => file && file.name
          );

          const currentFiles = Array.isArray(field.value)
            ? field.value
            : field.value
            ? [field.value]
            : [];

          // 🔸 중복 파일 제거
          const isDuplicate = (file) => {
            return currentFiles.some(
              (existingFile) =>
                existingFile.name === file.name &&
                existingFile.size === file.size
            );
          };

          const filteredFiles = selectedFiles.filter(
            (file) => !isDuplicate(file)
          );

          if (filteredFiles.length !== selectedFiles.length) {
            toast.error("이미 업로드된 파일이 포함되어 있습니다.");
          }

          // 🔸 병합 후 개수 검사
          const newFiles = [...currentFiles, ...filteredFiles];
          if (newFiles.length > maxfilecount) {
            toast.error(
              `파일은 최대 ${maxfilecount}개까지 업로드할 수 있습니다.`
            );
            return;
          }

          // 🔸 확장자 유효성 검사
          for (const file of filteredFiles) {
            const extension = getFileExtension(file.name);
            if (!allowedExtensions.includes(extension)) {
              toast.error(
                "유효한 파일 형식이 아닙니다. 파일 형식을 다시 확인해 주세요."
              );
              return;
            }
          }

          // 🔸 파일당 용량 검사 (MB → Byte)
          const maxFileSizeBytes = maxfilesize * 1024 * 1024;
          for (const file of filteredFiles) {
            if (file.size > maxFileSizeBytes) {
              toast.error(
                `파일은 1개당 ${maxfilesize}MB를 초과할 수 없습니다.`
              );
              return;
            }
          }

          // 🔸 총 용량 검사 (MB → Byte)
          const maxTotalSizeBytes = maxtotalsize * 1024 * 1024;
          const totalSizeBytes = newFiles.reduce(
            (sum, file) => sum + file.size,
            0
          );
          if (totalSizeBytes > maxTotalSizeBytes) {
            toast.error(
              `총 업로드 용량은 ${maxtotalsize}MB를 초과할 수 없습니다.`
            );
            return;
          }

          // 🔸 이미지일 경우 사이즈 검사
          if (isImageType) {
            for (const file of filteredFiles) {
              try {
                await validateImageDimensions(file, minwidth, minheight);
              } catch {
                toast.error(
                  "알맞은 이미지 사이즈가 아닙니다. 이미지 사이즈를 다시 확인해 주세요."
                );
                return;
              }
            }
          }

          // 🔸 업데이트
          field.onChange(newFiles);
          setFileList(newFiles);

          const newPreviewUrls = {};
          filteredFiles.forEach((file, index) => {
            newPreviewUrls[currentFiles.length + index] =
              URL.createObjectURL(file);
          });
          setPreviewUrls((prev) => ({ ...prev, ...newPreviewUrls }));
        };

        const handleRemoveFile = (index) => {
          const newFiles = [...fileList];
          newFiles.splice(index, 1);
          field.onChange(newFiles);
          setFileList(newFiles);

          if (previewUrls[index]) {
            URL.revokeObjectURL(previewUrls[index]);
            const newPreviewUrls = { ...previewUrls };
            delete newPreviewUrls[index];
            setPreviewUrls(newPreviewUrls);
          }
        };

        useEffect(() => {
          if (field.value) {
            const files = Array.isArray(field.value)
              ? field.value
              : [field.value];
            setFileList(files);
            const newPreviewUrls = {};
            files.forEach((file, index) => {
              if (
                typeof window !== "undefined" &&
                window.File &&
                file instanceof window.File
              ) {
                newPreviewUrls[index] = URL.createObjectURL(file);
              }
            });
            setPreviewUrls(newPreviewUrls);
          } else {
            setFileList([]);
            setPreviewUrls({});
          }

          return () => {
            Object.values(previewUrls).forEach((url) => {
              if (url && url.startsWith("blob:")) URL.revokeObjectURL(url);
            });
          };
        }, [field.value]);

        const getFileName = (file) =>
          file.name || file.fileOriginalName || "파일";
        const validFiles = fileList;
        const currentFileCount = validFiles.length;

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
                  {...props}
                  accept={accept}
                />

                {/* 이미지 업로드 UI */}
                {isImageType && (
                  <div className="flex flex-wrap gap-4 mt-2">
                    {fileList.length < maxfilecount && (
                      <div
                        className="w-30 h-30 relative overflow-hidden bg-blue-50 aspect-square border-1 border-gray-300 border-dashed rounded-[16px] flex items-center justify-center cursor-pointer"
                        onClick={() =>
                          document.getElementById(`file-input-${name}`).click()
                        }
                      >
                        <Img
                          src="/images/icon/ic_image_plus.png"
                          alt="파일 추가"
                          width={60}
                          height={60}
                        />
                      </div>
                    )}

                    {fileList.map((file, index) => {
                      const fileName = getFileName(file);
                      const previewUrl = previewUrls[index];
                      return (
                        <div
                          key={index}
                          className="w-30 h-30 relative overflow-hidden bg-blue-50 aspect-square border-1 border-gray-300 border-dashed rounded-[16px] flex items-center justify-center cursor-pointer"
                        >
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt={fileName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center">
                              <File className="h-10 w-10 text-gray-400 mb-2" />
                              <span className="text-xs text-gray-500 line-clamp-2 max-w-full">
                                {fileName}
                              </span>
                              <span className="text-xs text-gray-400 mt-1">
                                ({formatFileSize(file.size || file.fileSize)})
                              </span>
                            </div>
                          )}

                          <button
                            type="button"
                            className="absolute top-1 right-1 rounded-full"
                            onClick={() => handleRemoveFile(index)}
                          >
                            <Img
                              src="/images/icon/ic_x_circle.svg"
                              alt="파일 삭제"
                              width={20}
                              height={20}
                            />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 문서 업로드 UI */}
                {isDocumentType && (
                  <div className="mt-2">
                    <div
                      className={cn(
                        "flex items-center py-3.25 px-4 border border-gray-300 rounded-[16px] cursor-pointer",
                        currentFileCount >= maxfilecount &&
                          "opacity-50 cursor-not-allowed"
                      )}
                      onClick={() => {
                        if (currentFileCount < maxfilecount) {
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
                      <span className="body-5 font-medium text-gray-500 ml-2">
                        파일 첨부
                      </span>
                    </div>

                    {validFiles.length > 0 && (
                      <div className="space-y-1 border border-gray-300 rounded-[16px] mt-2">
                        {validFiles.map((file, index) => {
                          const fileName = getFileName(file);
                          return (
                            <div
                              key={index}
                              className="flex items-center justify-between py-3.25 px-4 border-b last:border-b-0"
                            >
                              <div className="flex items-center gap-1 overflow-hidden">
                                <Img
                                  src="/images/icon/ic_close_circle_24.svg"
                                  alt="파일 첨부"
                                  width={24}
                                  height={24}
                                />
                                <span className="body-5 font-medium text-black">
                                  {fileName}
                                </span>
                              </div>
                              <button
                                type="button"
                                className="ml-2 flex-shrink-0 text-gray-500 hover:text-gray-700"
                                onClick={() => handleRemoveFile(index)}
                              >
                                <Img
                                  src="/images/icon/ic_default_close.svg"
                                  alt="파일 삭제"
                                  width={16}
                                  height={16}
                                />
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </FormControl>

            {description && (
              <FormDescription className={cn("mt-2", descriptionClassName)}>
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
