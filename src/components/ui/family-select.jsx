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
  theme,
}) {
  return (
    <Select value={value} onValueChange={onChange} theme={theme}>
      <SelectTrigger className={cn(className)} theme={theme}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent theme={theme}>
        {options.map((opt, index) => (
          <SelectItem key={index} value={opt.value} theme={theme}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
