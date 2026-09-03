import { useContext } from "react";
import { ToastContext, type ToastOptions, type ToastContextValue } from "./ToastProvider";

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within <ToastProvider>");
  return context;
}

export type { ToastOptions };
