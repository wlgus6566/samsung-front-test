"use client";
import * as React from "react";
import { EditorContent, EditorContext, useEditor } from "@tiptap/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit";
import { Image } from "@tiptap/extension-image";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";
import { Underline } from "@tiptap/extension-underline";
import { Youtube } from "@tiptap/extension-youtube";

// --- Custom Extensions ---
import { Link } from "@/components/tiptap/tiptap-extension/link-extension";
import { Selection } from "@/components/tiptap/tiptap-extension/selection-extension";
import { TrailingNode } from "@/components/tiptap/tiptap-extension/trailing-node-extension";
import { CustomHighlight } from "@/components/tiptap/tiptap-extension/custom-highlight-extension";
import { CustomParagraph } from "@/components/tiptap/tiptap-extension/custom-paragraph-extension";
import { CustomDiv } from "@/components/tiptap/tiptap-extension/custom-div-extension";
import { CustomSpan } from "@/components/tiptap/tiptap-extension/custom-span-extension";
import { CustomImage } from "@/components/tiptap/tiptap-extension/custom-image-extension";
import { CustomLink } from "@/components/tiptap/tiptap-extension/custom-link-extension";

// --- UI Primitives ---
import { Spacer } from "@/components/tiptap/tiptap-ui-primitive/spacer";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap/tiptap-ui-primitive/toolbar";

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap/tiptap-node/image-upload-node/image-upload-node-extension";
import "@/components/tiptap/tiptap-node/code-block-node/code-block-node.css";
import "@/components/tiptap/tiptap-node/list-node/list-node.css";
import "@/components/tiptap/tiptap-node/image-node/image-node.css";
import "@/components/tiptap/tiptap-node/paragraph-node/paragraph-node.css";
import "@/components/tiptap/tiptap-node/youtube-node/youtube-node.css";

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap/tiptap-ui/heading-dropdown-menu";
import { ImageUploadButton } from "@/components/tiptap/tiptap-ui/image-upload-button";
import { ListDropdownMenu } from "@/components/tiptap/tiptap-ui/list-dropdown-menu";
import { NodeButton } from "@/components/tiptap/tiptap-ui/node-button";
import { HighlightPopover } from "@/components/tiptap/tiptap-ui/highlight-popover";
import { LinkPopover } from "@/components/tiptap/tiptap-ui/link-popover";
import { MarkButton } from "@/components/tiptap/tiptap-ui/mark-button";
import { TextAlignButton } from "@/components/tiptap/tiptap-ui/text-align-button";
import { UndoRedoButton } from "@/components/tiptap/tiptap-ui/undo-redo-button";
import { YoutubeButton } from "@/components/tiptap/tiptap-ui/youtube-button/youtube-button";
import { HtmlToggleButton } from "@/components/tiptap/tiptap-ui/html-toggle-button/html-toggle-button";

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils";

// --- Styles ---
import "@/components/tiptap/styles/style.css";

const ToolbarContent = () => {
  return (
    <>
      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu levels={[1, 2, 3, 4]} />
        <ListDropdownMenu types={["bulletList", "orderedList", "taskList"]} />
        <NodeButton type="codeBlock" />
        <NodeButton type="blockquote" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        <HighlightPopover />
        <LinkPopover />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
        <YoutubeButton />
      </ToolbarGroup>
    </>
  );
};

interface TiptapEditorProps {
  value?: string | object;
  onChange?: (content: string) => void;
  className?: string;
  readOnly?: boolean;
  setValue?: (name: string, value: any, options?: any) => void;
  name?: string;
  [key: string]: any;
}

function TiptapEditor({
  value = "",
  onChange = () => {},
  className,
  readOnly = false,
  setValue,
  name,
  ...props
}: TiptapEditorProps) {
  const [isHtmlMode, setIsHtmlMode] = React.useState(false);
  const [htmlValue, setHtmlValue] = React.useState("");
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
      },
    },
    extensions: [
      CustomDiv,
      CustomSpan,
      StarterKit,
      CustomParagraph,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Underline,
      TaskList,
      TaskItem.configure({ nested: true }),
      CustomHighlight,
      CustomImage.configure({
        inline: false,
        allowBase64: true,
        HTMLAttributes: {
          class: "tiptap-image",
        },
      }),
      Typography,
      Superscript,
      Subscript,
      Youtube.configure({
        controls: true,
        nocookie: true,
        progressBarColor: "red",
        width: 640,
        height: 480,
      }),
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
      TrailingNode,
      CustomLink.configure({ openOnClick: false }),
    ],
    content: typeof value === "string" ? value || "" : value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // value가 변경될 때마다 에디터 콘텐츠를 업데이트
  React.useEffect(() => {
    if (editor && value) {
      const currentContent = editor.getHTML();
      const newContent = typeof value === "string" ? value : "";
      if (currentContent !== newContent) {
        editor.commands.setContent(value);
      }
    }
  }, [editor, value]);

  // HTML 모드 진입 시 에디터 내용 동기화
  React.useEffect(() => {
    if (isHtmlMode && editor) {
      setHtmlValue(editor.getHTML());
    }
  }, [isHtmlMode, editor]);

  const htmlTextareaRef = React.useRef<HTMLTextAreaElement>(null);

  // HTML/WYSIWYG 토글 핸들러
  const handleToggleHtmlMode = () => {
    if (isHtmlMode && editor) {
      const latestHtml = htmlTextareaRef.current?.value ?? htmlValue;
      editor.commands.setContent(latestHtml);
      onChange(editor.getHTML()); // HTML → WYSIWYG로 전환 시 즉시 반영
    } else if (editor) {
      setHtmlValue(editor.getHTML());
    }
    setIsHtmlMode((v) => !v);
  };

  return (
    <EditorContext.Provider value={{ editor }}>
      <div
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-white text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          readOnly
            ? "cursor-default focus:outline-none focus:ring-0 focus:border-input"
            : "has-focus-visible:border-ring has-focus-visible:ring-ring/50 has-focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
      >
        <Toolbar>
          <ToolbarContent />
          <HtmlToggleButton
            isHtmlMode={isHtmlMode}
            onToggle={handleToggleHtmlMode}
            className="ml-2"
          />
        </Toolbar>
        {isHtmlMode ? (
          <div className="content-wrapper">
            <textarea
              ref={htmlTextareaRef}
              className={cn(
                "w-full min-h-[200px] font-mono text-xs border-none rounded p-2 bg-white resize-none",
                "outline-none"
              )}
              value={htmlValue}
              onChange={(e) => {
                setHtmlValue(e.target.value);
                onChange?.(e.target.value);
                if (setValue && name) {
                  setValue(name, e.target.value, {
                    shouldDirty: true,
                    shouldValidate: true,
                  });
                }
              }}
              spellCheck={false}
            />
          </div>
        ) : (
          <div className="content-wrapper">
            <EditorContent
              editor={editor}
              role="presentation"
              className={cn(
                "prose max-w-none w-full dark:prose-invert",
                "simple-editor-content px-3 py-1"
              )}
              {...props}
            />
          </div>
        )}
      </div>
    </EditorContext.Provider>
  );
}

export default TiptapEditor;
