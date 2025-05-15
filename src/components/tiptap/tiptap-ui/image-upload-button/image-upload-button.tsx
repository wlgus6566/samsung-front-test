import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import { ImagePlusIcon } from "@/components/tiptap/tiptap-icons/image-plus-icon";

// --- UI Primitives ---
import {
  Button,
  ButtonProps,
} from "@/components/tiptap/tiptap-ui-primitive/button";

// --- Utils ---
import { handleImageUpload } from "@/lib/tiptap-utils";

export interface ImageUploadButtonProps extends ButtonProps {
  editor?: Editor | null;
  text?: string;
}

export function insertImageNode(editor: Editor | null, url: string): boolean {
  if (!editor) return false;

  return editor.chain().focus().setImage({ src: url }).run();
}

export const ImageUploadButton = React.forwardRef<
  HTMLButtonElement,
  ImageUploadButtonProps
>(
  (
    {
      editor: providedEditor,
      text,
      className = "",
      disabled,
      onClick,
      children,
      ...buttonProps
    },
    ref
  ) => {
    const editor = useTiptapEditor(providedEditor);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        // 기본 onClick 핸들러 호출
        onClick?.(e);

        if (!e.defaultPrevented && !disabled) {
          // 파일 선택 창 열기
          fileInputRef.current?.click();
        }
      },
      [onClick, disabled]
    );

    const handleFileChange = React.useCallback(
      async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || !files.length || !editor) return;

        const file = files[0];

        try {
          // 파일 업로드 시작
          const url = await handleImageUpload(file, (event) => {
            // 업로드 진행 상태 처리 (필요하면)
            console.log("Upload progress:", event.progress);
          });

          if (url) {
            // 업로드 성공 시 에디터에 이미지 삽입
            insertImageNode(editor, url);
          }
        } catch (error) {
          console.error("Image upload failed:", error);
        }

        // 파일 입력 필드 초기화 (같은 파일 다시 선택 가능하도록)
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      },
      [editor]
    );

    if (!editor || !editor.isEditable) {
      return null;
    }

    return (
      <>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleFileChange}
        />
        <Button
          ref={ref}
          type="button"
          className={className.trim()}
          data-style="ghost"
          role="button"
          tabIndex={-1}
          aria-label="Add image"
          tooltip="Add image"
          onClick={handleClick}
          disabled={disabled}
          {...buttonProps}
        >
          {children || (
            <>
              <ImagePlusIcon className="tiptap-button-icon" />
            </>
          )}
        </Button>
      </>
    );
  }
);

ImageUploadButton.displayName = "ImageUploadButton";

export default ImageUploadButton;
