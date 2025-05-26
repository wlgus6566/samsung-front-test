import * as React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import Img from "@/components/ui/img";
import { cn } from "@/lib/utils";

const responsiveSizeMap = {
  lg: "body3 px-5 py-3 rounded-[16px] min-md:h-15 min-md:px-8 min-md:py-4 min-md:rounded-[20px]",
  md: "body4 h-9 px-3 py-2 rounded-[16px] sm:h-13 sm:px-7 sm:py-3 md:h-12 md:px-5 md:py-3 md:rounded-[16px]",
  sm: "body5 h-[38px] px-3 py-2 rounded-[10px]",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed text-white",
  {
    variants: {
      variant: {
        brand:
          "hover:brightness-[90%] disabled:bg-gray-300 disabled:text-gray-500 display text-red-500",
        primary:
          "border border-gray-300 bg-blue-500 hover:brightness-[90%] disabled:bg-gray-300 disabled:text-gray-500",
        secondary:
          "border border-gray-300 bg-green-500 hover:brightness-[90%] disabled:bg-gray-300 disabled:text-gray-500",
        outline:
          "border border-gray-300 hover:bg-gray-300 text-black disabled:bg-white disabled:text-gray-500 disabled:border-gray-300",
        link: "text-primary-blue underline-offset-4 hover:brightness-[90%] hover:underline disabled:text-gray-500",
        black:
          "bg-black text-white hover:brightness-[90%] disabled:bg-gray-300 disabled:text-gray-500",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

function ButtonBase({
  className,
  variant = "primary",
  onClick,
  size = "md",
  children,
  icon,
  as = "button", // "button" | "a" | Slot
  href,
  ...props
}) {
  const isBrand = variant === "brand";
  const brandGradientStyle = isBrand
    ? { backgroundImage: "var(--gradient-brand)" }
    : {};
  const responsiveSizeClass = responsiveSizeMap[size] || "";

  const commonProps = {
    className: cn(buttonVariants({ variant }), responsiveSizeClass, className),
    style: brandGradientStyle,
    onClick,
    ...(as === "button" && { type: "button" }),
    ...props,
  };
  if (href) {
    return (
      <Link href={href}>
        <button
          type="button"
          className={cn(
            buttonVariants({ variant }),
            responsiveSizeClass,
            className
          )}
          style={brandGradientStyle}
          onClick={onClick}
          {...props}
        >
          {children}
          {icon === "topRight" && (
            <Img
              src="/images/icon/ic_btn_arrow_top_right.svg"
              alt="arrow-up-right"
              width={12}
              height={12}
              className="ml-2"
            />
          )}
        </button>
      </Link>
    );
  }

  const Comp = as;
  return (
    <Comp {...commonProps}>
      {children}
      {icon === "topRight" && (
        <Img
          src="/images/icon/ic_btn_arrow_top_right.svg"
          alt="arrow-up-right"
          width={12}
          height={12}
          className="ml-2"
        />
      )}
    </Comp>
  );
}

// 기본 버튼
const Button = (props) => <ButtonBase as="button" {...props} />;

// Next.js <Link> 버튼
const ButtonLink = (props) => <ButtonBase as="a" {...props} />;

export { Button, ButtonLink, buttonVariants };
