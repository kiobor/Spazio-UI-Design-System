import React, { useState, useCallback, useMemo, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";

interface AccordionContextValue {
  openItems: Set<string>;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

interface ItemContextValue {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

function useAccordionContext() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("Accordion components must be used within <Accordion>");
  return ctx;
}

function useItemContext() {
  const ctx = useContext(ItemContext);
  if (!ctx) throw new Error("AccordionTrigger/Content must be used within <AccordionItem>");
  return ctx;
}

interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string[];
}

const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  ({ type = "single", defaultValue = [], className, children, ...props }, ref) => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultValue));

    const toggle = useCallback(
      (value: string) => {
        setOpenItems((prev) => {
          const next = new Set(prev);
          if (next.has(value)) {
            next.delete(value);
          } else {
            if (type === "single") next.clear();
            next.add(value);
          }
          return next;
        });
      },
      [type],
    );

    const ctxValue = useMemo(() => ({ openItems, toggle }), [openItems, toggle]);

    return (
      <AccordionContext.Provider value={ctxValue}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, className, children, ...props }, ref) => {
    const { openItems } = useAccordionContext();
    const id = useId();

    return (
      <ItemContext.Provider
        value={{
          value,
          isOpen: openItems.has(value),
          triggerId: `${id}-trigger`,
          contentId: `${id}-content`,
        }}
      >
        <div ref={ref} className={cn("border-b border-border", className)} {...props}>
          {children}
        </div>
      </ItemContext.Provider>
    );
  },
);
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  const { toggle } = useAccordionContext();
  const { value, isOpen, triggerId, contentId } = useItemContext();

  return (
    <h3>
      <button
        ref={ref}
        type="button"
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className={cn(
          "flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline",
          className,
        )}
        onClick={() => toggle(value)}
        {...props}
      >
        {children}
        <svg
          className={cn("h-4 w-4 shrink-0 transition-transform", isOpen && "rotate-180")}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </h3>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, contentId, triggerId } = useItemContext();

    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        aria-hidden={!isOpen}
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out overflow-hidden",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
          className,
        )}
        {...props}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pb-4 text-sm">{children}</div>
        </div>
      </div>
    );
  },
);
AccordionContent.displayName = "AccordionContent";

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  type AccordionProps,
  type AccordionItemProps,
};
