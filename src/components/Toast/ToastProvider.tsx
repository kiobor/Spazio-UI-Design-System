import React, { useState, useCallback, useEffect, createContext, useRef } from "react";
import { Toast } from "./Toast";

export interface ToastOptions {
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning" | "info";
  duration?: number;
}

interface ToastEntry extends ToastOptions {
  id: string;
}

export interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);
  const counterRef = useRef(0);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const toast = useCallback((options: ToastOptions) => {
    const id = String(++counterRef.current);
    const entry: ToastEntry = { id, ...options };
    setToasts((prev) => [...prev, entry]);

    const timeoutId = setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
      timersRef.current.delete(id);
    }, options.duration ?? 5000);
    timersRef.current.set(id, timeoutId);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timersRef.current.get(id));
    timersRef.current.delete(id);
  }, []);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <Toast key={t.id} {...t} onDismiss={() => dismiss(t.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
