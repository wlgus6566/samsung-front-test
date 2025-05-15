import { cn } from "@/lib/utils";

export default function pageTitle({ className, children }) {
  return <h1 className={cn(className, "text-2xl font-bold")}>{children}</h1>;
}
