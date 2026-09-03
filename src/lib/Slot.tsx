import React from "react";
import { cn } from "../lib/cn";

interface SlotProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactElement<Record<string, unknown>>;
}

const Slot = React.forwardRef<HTMLElement, SlotProps>(({ children, ...props }, ref) => {
  const child = React.Children.only(children);

  return React.cloneElement(child, {
    ...props,
    ...child.props,
    ref,
    className: cn(props.className, child.props.className as string | undefined),
  });
});

Slot.displayName = "Slot";

export { Slot, type SlotProps };
