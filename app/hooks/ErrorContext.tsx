"use client";
import { ReactNode, createContext, useEffect, useMemo, useState } from "react";

const TIME_TO_CLOSE_POPUP = 5000;
type ContextValue = [string | null, (value: string | null) => void];

export const ErrorContext = createContext([null, () => {}] as ContextValue);

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof error === "string" && error.length > 0) {
      const timeout = setTimeout(() => {
        setError(null);
      }, TIME_TO_CLOSE_POPUP);
      return () => clearTimeout(timeout);
    }
  }, [error]);
  const value = useMemo(() => [error, setError] as ContextValue, [error]);

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorProvider;
