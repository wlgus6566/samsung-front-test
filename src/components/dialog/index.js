"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDialogStore } from "@/store/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DialogBase({
  name,
  title,
  description,
  footer,
  children,
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  ...rest
}) {
  const { dialogList, dialogClose } = useDialogStore();
  const isOpen = useMemo(() => {
    return dialogList.some((dialog) => dialog.name === name);
  }, [dialogList, name]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          dialogClose(name);
        }
      }}
      {...rest}
    >
      <DialogContent
        className={cn(
          "md:max-w-[680px] max-md:max-w-full! max-md:rounded-none p-6 overflow-hidden rounded-lg shadow-xl",
          className
        )}
        onInteractOutside={(e) => {
          // 기본 닫힘 방지 (필요에 따라)
          // e.preventDefault();
        }}
      >
        <div className={cn("flex flex-col md:max-h-[90vh]", "max-md:h-screen")}>
          <DialogHeader className="relative shrink-0 z-10 pt-6">
            <DialogTitle
              className={cn(
                "text-gray-900 body1 font-semibold",
                titleClassName
              )}
            >
              {title}
            </DialogTitle>
            {/* <DialogClose asChild className="absolute top-3.5 right-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9 rounded-md text-gray-400 hover:text-gray-700 hover:bg-gray-100"
              >
                <XIcon className="h-6 w-6" />
                <span className="sr-only">닫기</span>
              </Button>
            </DialogClose> */}
          </DialogHeader>

          {description && (
            <DialogDescription
              className={cn(
                "px-6 pt-4 pb-2 text-sm text-gray-600 leading-5",
                descriptionClassName
              )}
            >
              {description}
            </DialogDescription>
          )}

          <ScrollArea className="px-0 flex-1 h-0 my-[1px]">
            <div className={cn("", contentClassName)}>{children}</div>
          </ScrollArea>

          {footer && <DialogFooter className="z-10">{footer}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
