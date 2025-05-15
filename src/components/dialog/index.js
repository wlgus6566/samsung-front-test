"use client";

import {
  Dialog,
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
export default function DialogBase({
  name,
  title,
  description,
  footer,
  children,
  className,
  ...rest
}) {
  const { dialogList, dialogClose } = useDialogStore();
  const isOpen = useMemo(() => {
    return dialogList.some((dialog) => dialog.name === name);
  }, [dialogList, name]);
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => !open && dialogClose(name)}
      {...rest}
    >
      <DialogContent
        className={cn(
          "md:max-w-[600px] max-md:max-w-full! max-md:rounded-none p-0 overflow-hidden",
          className
        )}
      >
        <div className={cn("flex flex-col md:max-h-[90vh]", "max-md:h-screen")}>
          <DialogHeader className="pt-6 px-6 pb-3 shrink-0 z-10 shadow-[0_.5rem_1rem_rgba(255,255,255,1)] dark:shadow-[0_.5rem_1rem_rgba(0,0,0,1)] ">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="px-0 flex-1 h-0 my-[1px]">
            <div className="px-6 py-5">{children}</div>
          </ScrollArea>
          {footer && (
            <DialogFooter className="px-6 py-4 z-10 shadow-[0_-.5rem_1rem_rgba(255,255,255,1)] dark:shadow-[0_-.5rem_1rem_rgba(0,0,0,1)]">
              {footer}
            </DialogFooter>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
