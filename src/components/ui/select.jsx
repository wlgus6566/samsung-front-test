// "use client";

import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Img from "@/components/ui/img";

const selectSizeStyles = {
  md: {
    trigger: "h-12 rounded-[16px] px-4 py-3.25 body5 font-medium",
    item: "body5 font-semibold",
    label: "body5 font-semibold",
    iconSize: "size-5",
  },
  lg: {
    trigger: "h-15 rounded-[20px] px-4 py-4.5 body4 font-medium",
    item: "body4 font-semibold",
    label: "body4 font-semibold",
    iconSize: "size-6",
  },
};

function Select({ ...props }) {
  return <SelectPrimitive.Root {...props} />;
}

function SelectGroup({ ...props }) {
  return <SelectPrimitive.Group {...props} />;
}

function SelectValue({ placeholder, ...props }) {
  return <SelectPrimitive.Value placeholder={placeholder} {...props} />;
}

function SelectTrigger({
  className,
  children,
  disabled,
  size = "md",
  theme = "light",
  iconColor = "text-gray-500",
  ...props
}) {
  const isDark = theme === "dark";
  const styles = selectSizeStyles[size] || selectSizeStyles.md;

  return (
    <SelectPrimitive.Trigger
      className={cn(
        "group",
        "flex w-full items-center justify-between border bg-white placeholder:text-black outline-none",
        styles.trigger,
        "border-gray-300 text-gray-800",
        "focus:border-blue-500",
        "disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-300 disabled:text-gray-700",
        isDark && "bg-gray-900 border-none text-white focus:border-gray-500",
        isDark &&
          "disabled:bg-gray-700 disabled:border-gray-600 disabled:text-gray-500",
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon
          className={cn(
            styles.iconSize,
            "transition-transform duration-200",
            "group-data-[state=open]:rotate-180",
            disabled
              ? isDark
                ? "text-white"
                : "text-black"
              : isDark
              ? "text-white"
              : "text-gray-500",
            iconColor
          )}
        />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  theme = "light",
  size = "md",
  ...props
}) {
  const isDark = theme === "dark";

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "w-[var(--radix-select-trigger-width)] relative z-50 overflow-hidden rounded-[20px] border bg-white max-h-60 overflow-y-auto",
          "border-gray-200 text-gray-800",
          isDark && "bg-gray-900 border-none text-white",
          "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95",
          "data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          "mt-2 p-1",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton theme={theme} size={size} />
        <SelectPrimitive.Viewport
          className={cn(
            "p-0",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton theme={theme} size={size} />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({
  className,
  children,
  disabled,
  theme = "light",
  size = "md",
  ...props
}) {
  const isDark = theme === "dark";
  const styles = selectSizeStyles[size] || selectSizeStyles.md;

  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-[20px] outline-none data-[disabled]:pointer-events-none",
        "px-4 py-3",
        styles.item,
        "focus:bg-gray-50 focus:text-black text-gray-900",
        "data-[highlighted]:bg-gray-50 data-[highlighted]:text-gray-900",
        "data-[state=checked]:font-semibold data-[state=checked]:text-black",
        "data-[disabled]:text-gray-700 data-[disabled]:hover:bg-transparent data-[disabled]:hover:text-gray-500",
        isDark && "text-gray-200",
        isDark &&
          "focus:bg-gray-700 focus:text-gray-50 data-[highlighted]:bg-gray-700 data-[highlighted]:text-gray-50",
        isDark && "data-[state=checked]:text-white",
        isDark &&
          "data-[disabled]:text-gray-600 data-[disabled]:hover:bg-transparent",
        className
      )}
      disabled={disabled}
      {...props}
    >
      <span className="absolute right-3 flex h-6 w-6 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <Img
            src="/images/icon/ic_default_check.svg"
            alt="체크"
            width={size === "lg" ? 24 : 20}
            height={size === "lg" ? 24 : 20}
          />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectLabel({ className, theme = "light", size = "md", ...props }) {
  const isDark = theme === "dark";
  const styles = selectSizeStyles[size] || selectSizeStyles.md;

  return (
    <SelectPrimitive.Label
      className={cn(
        "py-1.5 pl-8 pr-2 font-semibold",
        styles.label,
        "text-gray-900",
        isDark && "text-white",
        className
      )}
      {...props}
    />
  );
}

function SelectSeparator({ className, theme = "light", ...props }) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.Separator
      className={cn(
        "-mx-1 my-1 h-px",
        "bg-gray-200",
        isDark && "bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  theme = "light",
  size = "md",
  ...props
}) {
  const isDark = theme === "dark";
  const styles = selectSizeStyles[size] || selectSizeStyles.md;

  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        "text-gray-500 hover:text-gray-700",
        isDark && "text-gray-400 hover:text-gray-200",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className={styles.iconSize} />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  theme = "light",
  size = "md",
  ...props
}) {
  const isDark = theme === "dark";
  const styles = selectSizeStyles[size] || selectSizeStyles.md;

  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        "text-gray-500 hover:text-gray-700",
        isDark && "text-gray-400 hover:text-gray-200",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className={styles.iconSize} />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
