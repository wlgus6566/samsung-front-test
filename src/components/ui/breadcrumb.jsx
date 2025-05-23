import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

function Breadcrumb({ ...props }) {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />;
}

function BreadcrumbList({ className, ...props }) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "text-gray-700 flex flex-wrap items-center break-words",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({ asChild, className, ...props }) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      data-slot="breadcrumb-link"
      className={cn("text-gray-700 body5 font-medium", className)}
      {...props}
    />
  );
}

function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-semibold text-black body5", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({ children, className, ...props }) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  );
}

function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-9 items-center justify-center", className)}
      {...props}
    >
      <MoreHorizontal className="size-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
