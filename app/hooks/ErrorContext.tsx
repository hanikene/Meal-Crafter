"use client";
import { ReactNode, createContext, useEffect, useState } from "react";

type ContextValue = [string | null, (value: string | null) => void];

export const ErrorContext = createContext([null, () => {}] as ContextValue);

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof error === "string" && error.length > 0) {
      const timeout = setTimeout(() => {
        setError(null);
      }, 7000);
      return () => clearTimeout(timeout);
    }
  }, [error]);
  const value = [error, setError] as ContextValue;

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export default ErrorProvider;
