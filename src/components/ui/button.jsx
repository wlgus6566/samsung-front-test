import * as React from "react";
import Link from "next/link";
import { cva } from "class-variance-authority";
import Img from "@/components/ui/img";
import { cn } from "@/lib/utils";

const responsiveSizeMap = {
  lg: "h-9 px-3 py-2 rounded-[22px] text-2xs sm:h-13 sm:px-7 sm:py-3 sm:rounded-full sm:text-md md:h-15 md:px-8 md:py-4 md:rounded-[20px] md:text-sm",
  md: "h-9 px-3 py-2 rounded-[22px] text-2xs sm:h-13 sm:px-7 sm:py-3 sm:rounded-full sm:text-md md:h-14 md:px-7 md:py-3 md:rounded-full md:text-md",
};

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all disabled:pointer-events-none outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 disabled:cursor-not-allowed text-white",
  {
    variants: {
      variant: {
        brand:
          "hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500 display text-red-500",
        primary:
          "border border-gray-300 bg-blue-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500",
        secondary:
          "border border-gray-300 bg-green-500 hover:brightness-[85%] disabled:bg-gray-300 disabled:text-gray-500",
        outline:
          "border border-gray-300 text-black disabled:bg-white disabled:text-gray-500 disabled:border-gray-300",
        link: "text-primary-blue underline-offset-4 hover:brightness-[85%] hover:underline disabled:text-gray-500",
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
    ...props,
  };

  if (href) {
    return (
      <Link href={href} passHref legacyBehavior>
        <a {...commonProps}>
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
        </a>
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
