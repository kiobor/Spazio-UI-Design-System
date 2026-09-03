import React, { useState, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const switchVariants = cva(
  "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-5 w-9",
        md: "h-6 w-11",
        lg: "h-7 w-[52px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const thumbSizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
} as const;

const thumbTranslateMap = {
  sm: "translate-x-4",
  md: "translate-x-5",
  lg: "translate-x-6",
} as const;

interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange">,
    VariantProps<typeof switchVariants> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, size = "md", checked: controlledChecked, defaultChecked = false, onCheckedChange, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = useState(defaultChecked);
    const isControlled = controlledChecked !== undefined;
    const isChecked = isControlled ? controlledChecked : uncontrolled;

    const handleClick = useCallback(() => {
      const next = !isChecked;
      if (!isControlled) setUncontrolled(next);
      onCheckedChange?.(next);
    }, [isChecked, isControlled, onCheckedChange]);

    const resolvedSize = size ?? "md";

    return (
      <button
        type="button"
        role="switch"
        aria-checked={isChecked}
        className={cn(
          switchVariants({ size }),
          isChecked ? "bg-primary" : "bg-muted",
          className,
        )}
        onClick={handleClick}
        ref={ref}
        {...props}
      >
        <span
          className={cn(
            "pointer-events-none block rounded-full bg-background shadow-sm transition-transform",
            thumbSizeMap[resolvedSize],
            isChecked ? thumbTranslateMap[resolvedSize] : "translate-x-0",
          )}
        />
      </button>
    );
  },
);

Switch.displayName = "Switch";

export { Switch, switchVariants, type SwitchProps };
