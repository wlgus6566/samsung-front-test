import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (!isValid(date)) return "-";

  return format(date, "yyyy-MM-dd HH:mm", { locale: ko });
}
