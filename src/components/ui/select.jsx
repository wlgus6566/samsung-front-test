import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Img from "@/components/ui/img";
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
  theme = "light",
  ...props
}) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.Trigger
      className={cn(
        "flex h-14 w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-sm placeholder:text-gray-400 outline-none",
        // Light theme (default)
        "border-gray-300 text-gray-800",
        "focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10",
        "disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200 disabled:text-gray-400",
        // Dark theme styles
        isDark &&
          isDark &&
          "bg-gray-900 border-none text-white focus:border-gray-500 focus:border-gray-500",
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
            "size-6",
            disabled
              ? isDark
                ? "text-gray-600"
                : "text-gray-300"
              : isDark
              ? "text-gray-300"
              : "text-gray-500"
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
  ...props
}) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(
          "w-[var(--radix-select-trigger-width)] relative z-50 overflow-hidden rounded-[20px] border bg-white",
          // Light theme (default)
          "border-gray-200 text-gray-800",
          // Dark theme styles
          isDark && "bg-gray-900 border-none text-white",
          // Animations and positioning
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
        <SelectScrollUpButton theme={theme} />
        <SelectPrimitive.Viewport
          className={cn(
            "p-0",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton theme={theme} />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ className, theme = "light", ...props }) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.Label
      className={cn(
        "py-1.5 pl-8 pr-2 body-5 font-semibold",
        // Light theme (default)
        "text-gray-900",
        // Dark theme styles
        isDark && "text-white",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  disabled,
  theme = "light",
  ...props
}) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.Item
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-lg py-3 px-4 text-sm outline-none data-[disabled]:pointer-events-none",
        // Light theme (default)
        "focus:bg-gray-50 focus:text-gray-900",
        "data-[highlighted]:bg-gray-50 data-[highlighted]:text-gray-900",
        "data-[state=checked]:text-black data-[state=checked]:font-semibold",
        "data-[disabled]:text-gray-500 data-[disabled]:hover:bg-transparent data-[disabled]:hover:text-gray-500",
        // Dark theme styles
        isDark && "text-gray-100",
        isDark &&
          "focus:bg-gray-700 focus:text-gray-50 data-[highlighted]:bg-gray-700 data-[highlighted]:text-gray-50",
        isDark &&
          "data-[state=checked]:text-white data-[state=checked]:font-semibold",
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
            alt="arrow-up"
            width={20}
            height={20}
          />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ className, theme = "light", ...props }) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.Separator
      className={cn(
        "-mx-1 my-1 h-px",
        // Light theme (default)
        "bg-gray-200",
        // Dark theme styles
        isDark && "bg-gray-700",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({ className, theme = "light", ...props }) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        // Light theme (default)
        "text-gray-500 hover:text-gray-700",
        // Dark theme styles
        isDark && "text-gray-400 hover:text-gray-200",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-5" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ className, theme = "light", ...props }) {
  const isDark = theme === "dark";
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        // Light theme (default)
        "text-gray-500 hover:text-gray-700",
        // Dark theme styles
        isDark && "text-gray-400 hover:text-gray-200",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-5" />
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
