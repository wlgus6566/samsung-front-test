import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isValid } from "date-fns";
import { ko } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  dateString: string | Date | null | undefined,
  formatString: string = "yyyy-MM-dd HH:mm"
): string {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (!isValid(date)) return "-";

  return format(date, formatString, { locale: ko });
}
