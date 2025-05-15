import * as React from "react";
import { type Editor } from "@tiptap/react";

// --- Hooks ---
import { useTiptapEditor } from "@/hooks/use-tiptap-editor";

// --- Icons ---
import { YoutubeIcon } from "@/components/tiptap/tiptap-icons/youtube-icon";

// --- UI Primitives ---
import {
  Button,
  ButtonProps,
} from "@/components/tiptap/tiptap-ui-primitive/button";

export interface YoutubeButtonProps extends ButtonProps {
  editor?: Editor | null;
  text?: string;
}

export function insertYoutube(editor: Editor | null): boolean {
  if (!editor) return false;

  const url = prompt("YouTube URL을 입력해 주세요", "");
  if (!url) return false;

  // URL이 유효한 YouTube URL인지 확인
  const isValid = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.*/.test(
    url
  );

  if (!isValid) {
    alert("유효한 YouTube URL을 입력해 주세요");
    return false;
  }

  // @ts-ignore - Tiptap Youtube 확장 타입 문제 우회
  editor.commands.setYoutubeVideo({
    src: url,
    width: 640,
    height: 480,
  });

  return true;
}

export function useYoutubeButton(
  editor: Editor | null,
  disabled: boolean = false
) {
  const handleInsertYoutube = React.useCallback(() => {
    if (disabled) return false;
    return insertYoutube(editor);
  }, [editor, disabled]);

  return {
    handleInsertYoutube,
  };
}

export const YoutubeButton = React.forwardRef<
  HTMLButtonElement,
  YoutubeButtonProps
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
    const { handleInsertYoutube } = useYoutubeButton(editor, disabled);

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);

        if (!e.defaultPrevented && !disabled) {
          handleInsertYoutube();
        }
      },
      [onClick, disabled, handleInsertYoutube]
    );

    if (!editor || !editor.isEditable) {
      return null;
    }

    return (
      <Button
        ref={ref}
        type="button"
        className={className.trim()}
        data-style="ghost"
        data-active-state="off"
        role="button"
        tabIndex={-1}
        aria-label="Add Youtube"
        tooltip="Add Youtube"
        onClick={handleClick}
        {...buttonProps}
      >
        {children || (
          <>
            <YoutubeIcon className="tiptap-button-icon" />
          </>
        )}
      </Button>
    );
  }
);

YoutubeButton.displayName = "YoutubeButton";

export default YoutubeButton;
