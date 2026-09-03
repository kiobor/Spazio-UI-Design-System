import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        solid: "text-white",
        outline: "border bg-transparent",
      },
      color: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        destructive: "",
      },
    },
    compoundVariants: [
      { variant: "solid", color: "default", class: "bg-foreground text-background" },
      { variant: "solid", color: "primary", class: "bg-primary" },
      { variant: "solid", color: "success", class: "bg-success" },
      { variant: "solid", color: "warning", class: "bg-warning text-foreground" },
      { variant: "solid", color: "destructive", class: "bg-destructive" },
      { variant: "outline", color: "default", class: "border-border text-foreground" },
      { variant: "outline", color: "primary", class: "border-primary text-primary" },
      { variant: "outline", color: "success", class: "border-success text-success" },
      { variant: "outline", color: "warning", class: "border-warning text-warning" },
      { variant: "outline", color: "destructive", class: "border-destructive text-destructive" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "default",
    },
  },
);

interface BadgeProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "color">,
    VariantProps<typeof badgeVariants> {}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, color, ...props }, ref) => {
    return (
      <span
        className={cn(badgeVariants({ variant, color }), className)}
        ref={ref}
        {...props}
      />
    );
  },
);

Badge.displayName = "Badge";

export { Badge, badgeVariants, type BadgeProps };
