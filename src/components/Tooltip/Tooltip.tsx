import React, { useState, useCallback, useRef, useId } from "react";
import { cn } from "../../lib/cn";

type TooltipSide = "top" | "bottom" | "left" | "right";

interface TooltipProps {
  content: React.ReactNode;
  side?: TooltipSide;
  delay?: number;
  children: React.ReactElement<Record<string, unknown>>;
  className?: string;
}

const positionClasses: Record<TooltipSide, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const Tooltip: React.FC<TooltipProps> = ({
  content,
  side = "top",
  delay = 200,
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const tooltipId = useId();

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setIsOpen(true), delay);
  }, [delay]);

  const hide = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setIsOpen(false);
  }, []);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {React.cloneElement(children, { "aria-describedby": isOpen ? tooltipId : undefined })}
      {isOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className={cn(
            "absolute z-50 rounded-md bg-foreground px-3 py-1.5 text-xs text-background shadow-md",
            "animate-in fade-in-0",
            positionClasses[side],
            className,
          )}
        >
          {content}
        </span>
      )}
    </span>
  );
};

Tooltip.displayName = "Tooltip";

export { Tooltip, type TooltipProps };
