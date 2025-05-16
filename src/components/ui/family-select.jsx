import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";
import { cn } from "@/lib/utils";
export function FamilySelect({
  value,
  onChange,
  options,
  placeholder,
  className,
}) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn(className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt, index) => (
          <SelectItem key={index} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
