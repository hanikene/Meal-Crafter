"use client";

import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { getIngredientList } from "../../api";
import Spinner from "../Spinner";
import { ErrorContext } from "@/app/hooks/ErrorContext";
import Error from "next/error";

const IngredientDropdown = ({
  addIngredient,
}: {
  addIngredient: (ingredient: string) => void;
}) => {
  const [isListDisplayed, setListDisplayed] = useState(false);
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input);
  const [_, setError] = useContext(ErrorContext);
  const {
    data: ingredientData,
    isSuccess,
    isFetching,
    error: queryError,
  }: {
    data: string[];
    isSuccess: boolean;
    isFetching: boolean;
    error: any;
  } = useQuery({
    queryKey: ["ingredients", debouncedInput],
    queryFn: () => getIngredientList(debouncedInput),
    initialData: () => [],
    retry: false,
  });

  useEffect(() => {
    if (queryError?.message) setError(queryError.message);
  }, [queryError]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInput(value);
  };

  const handleIngredientClick = (ingredient: string) => {
    addIngredient(ingredient);
  };

  const closeDisplayList = useCallback(async () => {
    setTimeout(() => {
      setListDisplayed(false);
    }, 150);
  }, [setListDisplayed]);

  return (
    <div className="bg-neutral-100 border-neutral-200 max-w-full h-12 rounded-t-md flex items-center relative pr-3">
      <input
        id="ingredient"
        className="bg-transparent h-full grow px-3 outline-none"
        type="text"
        onChange={handleInputChange}
        value={input}
        placeholder="Add an ingredient"
        autoComplete="false"
        autoSave="false"
        onFocus={() => {
          setListDisplayed(true);
        }}
        onBlur={closeDisplayList}
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
