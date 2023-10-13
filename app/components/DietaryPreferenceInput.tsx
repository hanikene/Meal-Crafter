"use client";

import { useCallback, useState } from "react";
import { DIETARY_PREFERENCES } from "../constants";
import { DietaryPreference } from "../types";

const DietaryPreferenceInput = ({
  dietPref,
  handleDietPrefChange,
}: {
  dietPref: DietaryPreference;
  handleDietPrefChange: (dietPref: DietaryPreference) => void;
}) => {
  const [isListDisplayed, setListDisplayed] = useState(false);

  const handleDietPrefClick = (dietPref: DietaryPreference) => {
    handleDietPrefChange(dietPref);
  };

  const closeDisplayList = useCallback(async () => {
    setTimeout(() => {
      setListDisplayed(false);
    }, 150);
  }, [setListDisplayed]);

  return (
    <div>
      <label
        htmlFor="dietary-preference"
        className="cursor-pointer pb-3 text-neutral-700"
      >
        Please your dietary preference if applicable:
      </label>
      <div className="shadow-neutral-300 shadow-sm">
        <div className="bg-neutral-100 border-neutral-200 max-w-full h-12 rounded-t-md relative">
          <input
            id="dietary-preference"
            className="bg-transparent h-full grow px-3 outline-none w-full cursor-pointer"
            type="text"
            value={typeof dietPref === "string" ? dietPref : ""}
            placeholder="Add your dietary preference"
            autoComplete="false"
            autoSave="false"
            readOnly
            onFocus={() => {
              setListDisplayed(true);
            }}
            onBlur={closeDisplayList}
          />
          {isListDisplayed && (
            <div className="absolute w-full left-0 bottom-0 translate-y-full bg-neutral-100 shadow-neutral-300 shadow-sm z-10 max-h-60 overflow-y-scroll">
              {DIETARY_PREFERENCES.map((dietPref) => {
                const value = typeof dietPref === "string" ? dietPref : "None";
                return (
                  <div
                    key={value}
                    className="p-3 transition hover:bg-neutral-200 cursor-pointer"
                    onClick={() => {
                      handleDietPrefClick(dietPref);
                    }}
                  >
                    {value}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietaryPreferenceInput;
