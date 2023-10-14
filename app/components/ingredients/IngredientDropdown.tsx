"use client";

import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getIngredientList } from "../../api";
import Spinner from "../Spinner";
import { ErrorContext } from "@/app/hooks/ErrorContext";

const IngredientDropdown = ({
  addIngredient,
}: {
  addIngredient: (ingredient: string) => void;
}) => {
  const [isListDisplayed, setListDisplayed] = useState(false);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input);
  const inputRef = useRef(null);
  const [_, setError] = useContext(ErrorContext);
  const {
    data: ingredientData,
    isSuccess,
    isFetching,
    error,
  } = useQuery({
    queryKey: ["ingredients", debouncedInput],
    queryFn: () => getIngredientList(debouncedInput),
    initialData: () => [],
    retry: false,
  });

  useEffect(() => {
    const queryError = error as any;
    if (queryError && typeof queryError.message === "string") {
      const [messageCode, messageText] = queryError.message.split(": ");
      if (messageCode === "api") setError(messageText);
    }
  }, [error, setError]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e: any) => {
    // @ts-ignore
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setListDisplayed(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleIngredientClick = (ingredient: string) => {
    addIngredient(ingredient);
  };

  return (
    <div className="bg-neutral-100 border-neutral-200 max-w-full h-12 rounded-t-md flex items-center relative pr-3">
      <input
        id="ingredient"
        ref={inputRef}
        className="bg-transparent h-full grow px-3 outline-none"
        type="text"
        onChange={handleInputChange}
        value={input}
        placeholder="Add an ingredient"
        autoComplete="false"
        autoSave="false"
        onClick={() => {
          setListDisplayed(true);
        }}
      />
      {isFetching && <Spinner spinnerColor="black" />}
      {isListDisplayed && isSuccess && (
        <div className="absolute w-full left-0 bottom-0 translate-y-full bg-neutral-100 shadow-neutral-300 shadow-sm z-10 max-h-60 overflow-y-scroll">
          {ingredientData.map((ingredient) => (
            <div
              key={ingredient}
              className="p-3 transition hover:bg-neutral-200 cursor-pointer"
              onClick={() => {
                handleIngredientClick(ingredient);
              }}
            >
              {ingredient}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IngredientDropdown;
