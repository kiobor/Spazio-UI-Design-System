import React, { useState, useCallback, useMemo, useRef, createContext, useContext, useId } from "react";
import { cn } from "../../lib/cn";

interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabsContext() {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs compound components must be used within <Tabs>");
  return ctx;
}

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, className, children, ...props }, ref) => {
    const [uncontrolled, setUncontrolled] = useState(defaultValue);
    const isControlled = controlledValue !== undefined;
    const activeTab = isControlled ? controlledValue : uncontrolled;
    const baseId = useId();

    const setActiveTab = useCallback(
      (val: string) => {
        if (!isControlled) setUncontrolled(val);
        onValueChange?.(val);
      },
      [isControlled, onValueChange],
    );

    const ctxValue = useMemo(
      () => ({ activeTab, setActiveTab, baseId }),
      [activeTab, setActiveTab, baseId],
    );

    return (
      <TabsContext.Provider value={ctxValue}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const listRef = useRef<HTMLDivElement>(null);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
      const list = listRef.current;
      if (!list) return;
      const triggers = Array.from(list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'));
      const current = triggers.findIndex((t) => t === document.activeElement);
      if (current === -1) return;

      let next = current;
      if (e.key === "ArrowRight") next = (current + 1) % triggers.length;
      else if (e.key === "ArrowLeft") next = (current - 1 + triggers.length) % triggers.length;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = triggers.length - 1;
      else return;

      e.preventDefault();
      triggers[next].focus();
    }, []);

    return (
      <div
        ref={(node) => {
          (listRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        role="tablist"
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
          className,
        )}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TabsList.displayName = "TabsList";

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, setActiveTab, baseId } = useTabsContext();
    const isSelected = activeTab === value;

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        id={`${baseId}-trigger-${value}`}
        aria-controls={`${baseId}-panel-${value}`}
        aria-selected={isSelected}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          isSelected ? "bg-background text-foreground shadow-sm" : "hover:text-foreground",
          className,
        )}
        onClick={() => setActiveTab(value)}
        {...props}
      />
    );
  },
);
TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const { activeTab, baseId } = useTabsContext();
    if (activeTab !== value) return null;

    return (
      <div
        ref={ref}
        role="tabpanel"
        id={`${baseId}-panel-${value}`}
        aria-labelledby={`${baseId}-trigger-${value}`}
        tabIndex={0}
        className={cn("mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", className)}
        {...props}
      />
    );
  },
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps, type TabsTriggerProps, type TabsContentProps };
