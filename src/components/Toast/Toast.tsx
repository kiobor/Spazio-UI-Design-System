import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/cn";

const toastVariants = cva(
  "pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg animate-[slideInRight_200ms_ease-out]",
  {
    variants: {
      variant: {
        default: "border-border bg-background text-foreground",
        success: "border-success/30 bg-success/10 text-foreground",
        error: "border-destructive/30 bg-destructive/10 text-foreground",
        warning: "border-warning/30 bg-warning/10 text-foreground",
        info: "border-primary/30 bg-primary/10 text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface ToastProps
  extends VariantProps<typeof toastVariants>,
    Omit<React.HTMLAttributes<HTMLDivElement>, "id" | "title"> {
  id: string;
  title: string;
  description?: string;
  onDismiss: () => void;
  className?: string;
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ title, description, variant, onDismiss, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role={variant === "error" ? "alert" : "status"}
        className={cn(toastVariants({ variant }), className)}
        {...props}
      >
        <div className="flex-1">
          <p className="text-sm font-semibold">{title}</p>
          {description && <p className="mt-1 text-sm opacity-80">{description}</p>}
        </div>
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded-sm opacity-70 hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
    );
  },
);

Toast.displayName = "Toast";

export { Toast, toastVariants, type ToastProps };
