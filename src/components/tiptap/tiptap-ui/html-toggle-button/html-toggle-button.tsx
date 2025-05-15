import * as React from "react";
import { Button } from "@/components/tiptap/tiptap-ui-primitive/button";

export interface HtmlToggleButtonProps {
  isHtmlMode: boolean;
  onToggle: () => void;
  className?: string;
  disabled?: boolean;
}

export const HtmlToggleButton = React.forwardRef<
  HTMLButtonElement,
  HtmlToggleButtonProps
>(({ isHtmlMode, onToggle, className = "", disabled }, ref) => (
  <Button
    ref={ref}
    type="button"
    className={className.trim()}
    data-variant={isHtmlMode ? "default" : "outline"}
    data-size="sm"
    data-style="ghost"
    data-active-state={isHtmlMode ? "on" : "off"}
    aria-pressed={isHtmlMode}
    tabIndex={-1}
    onClick={onToggle}
    disabled={disabled}
    style={{ minWidth: 60 }}
  >
    HTML
  </Button>
));

HtmlToggleButton.displayName = "HtmlToggleButton";

export default HtmlToggleButton;
