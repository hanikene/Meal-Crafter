"use client";

import { useEffect, useRef, useState } from "react";
import { Allergy } from "@/app/types";
import { ALLERGIES } from "@/app/constants";

const AllergiesDropDown = ({
  addAllergy,
}: {
  addAllergy: (allergy: Allergy) => void;
}) => {
  const [isListDisplayed, setListDisplayed] = useState(false);
  const inputRef = useRef(null);

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

  const handleAllergyClick = (allergy: Allergy) => {
    addAllergy(allergy);
  };

  return (
    <div className="bg-neutral-100 border-neutral-200 max-w-full h-12 rounded-t-md relative">
      <input
        id="allergies"
        ref={inputRef}
        className="bg-transparent h-full grow px-3 outline-none w-full cursor-pointer"
        type="text"
        placeholder="Add your food allergy"
        autoComplete="false"
        autoSave="false"
        readOnly
        onClick={() => {
          setListDisplayed(true);
        }}
      />
      {isListDisplayed && (
        <div className="absolute w-full left-0 bottom-0 translate-y-full bg-neutral-100 shadow-neutral-300 shadow-sm z-10 max-h-60 overflow-y-scroll">
          {ALLERGIES.map((allergy) => (
            <div
              key={allergy}
              className="p-3 transition hover:bg-neutral-200 cursor-pointer"
              onClick={() => {
                handleAllergyClick(allergy);
              }}
            >
              {allergy}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllergiesDropDown;
