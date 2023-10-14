"use client";
import { ReactNode, createContext, useMemo, useState } from "react";
import { MealContentData, MealContent } from "../types";

type ContextValue = MealContent & {
  handleMealSuccess: (data: MealContentData) => void;
  handleMealLoading: () => void;
  handleMealError: () => void;
};

export const MealContext = createContext({
  data: null,
  status: "INIT",
  handleMealSuccess: () => {},
  handleMealLoading: () => {},
  handleMealError: () => {},
} as ContextValue);

const MealProvider = ({ children }: { children: ReactNode }) => {
  const [mealContent, setMealContent] = useState<MealContent>({
    data: null,
    status: "INIT",
  });

  const handleMealSuccess = (data: MealContentData) => {
    setMealContent({
      data,
      status: "SUCCESS",
    });
  };

  const handleMealLoading = () => {
    setMealContent({
      data: null,
      status: "LOADING",
    });
  };

  const handleMealError = () => {
    setMealContent({
      data: null,
      status: "ERROR",
    });
  };

  const value = useMemo(
    () =>
      ({
        ...mealContent,
        handleMealSuccess,
        handleMealLoading,
        handleMealError,
      } as ContextValue),
    [mealContent]
  );

  return <MealContext.Provider value={value}>{children}</MealContext.Provider>;
};

export default MealProvider;
