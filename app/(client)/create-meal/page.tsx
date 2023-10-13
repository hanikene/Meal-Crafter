"use client";

import { useMemo, useState } from "react";
import IngredientInput from "@/app/components/ingredients/IngredientInput";
import { MEAL_REQUIREMENT_INITIAL_VALUE } from "@/app/constants";
import AllergyInput from "@/app/components/allergies/AllergyInput";
import { Allergy, DietaryPreference, MealRequirements } from "@/app/types";
import DietaryPreferenceInput from "@/app/components/DietaryPreferenceInput";
import { mealRequirementScheme } from "@/app/validators";
import { useMutation } from "@tanstack/react-query";
import { createNewMeal } from "@/app/api";

const CreateMealPage = () => {
  const [mealRequirements, setMealRequirements] = useState(
    MEAL_REQUIREMENT_INITIAL_VALUE
  );
  const mutation = useMutation({
    mutationFn: (mealReq: MealRequirements) => {
      return createNewMeal(mealReq);
    },
  });

  const addIngredient = (newIngredient: string) => {
    const IsIngredientIncluded = mealRequirements.ingredients.some(
      (ingredient) => ingredient.toLowerCase() === newIngredient.toLowerCase()
    );
    if (!IsIngredientIncluded)
      setMealRequirements({
        ...mealRequirements,
        ingredients: [...mealRequirements.ingredients, newIngredient],
      });
  };

  const removeIngredient = (removedIngredient: string) => {
    setMealRequirements({
      ...mealRequirements,
      ingredients: mealRequirements.ingredients.filter(
        (ingredient) => ingredient !== removedIngredient
      ),
    });
  };

  const addAllergy = (newAllergy: Allergy) => {
    const IsAllergyIncluded = mealRequirements.allergies.some(
      (allergy) => allergy === newAllergy
    );
    if (!IsAllergyIncluded)
      setMealRequirements({
        ...mealRequirements,
        allergies: [...mealRequirements.allergies, newAllergy],
      });
  };

  const removeAllergy = (removedAllergy: string) => {
    setMealRequirements({
      ...mealRequirements,
      allergies: mealRequirements.allergies.filter(
        (allergy) => allergy !== removedAllergy
      ),
    });
  };

  const handleDietPrefChange = (newDietPref: DietaryPreference | null) => {
    setMealRequirements({
      ...mealRequirements,
      dietaryPreference: newDietPref,
    });
  };

  const isButtonDisabled = useMemo(() => {
    const parsedMealReq = mealRequirementScheme.safeParse(mealRequirements);
    return !parsedMealReq.success;
  }, [mealRequirements, mealRequirementScheme]);

  const handleCreate = () => {
    const parsedMealReq = mealRequirementScheme.safeParse(mealRequirements);
    if (parsedMealReq.success) mutation.mutate(mealRequirements);
  };

  return (
    <main className="flex min-h-[calc(100vh-10rem)] flex-col items-center pt-12 mb-16 md:px-0 px-3">
      <div className="w-[30rem] max-w-full gap-5 flex flex-col">
        <h1 className="text-3xl font-bold mb-3">Create a meal</h1>
        <IngredientInput
          ingredients={mealRequirements.ingredients}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
        />
        <AllergyInput
          allergies={mealRequirements.allergies}
          addAllergy={addAllergy}
          removeAllergy={removeAllergy}
        />
        <DietaryPreferenceInput
          dietPref={mealRequirements.dietaryPreference}
          handleDietPrefChange={handleDietPrefChange}
        />
        <button
          className={`${
            isButtonDisabled
              ? "border-2 border-neutral-800 opacity-60 cursor-not-allowed"
              : "btn-gradient text-white"
          } px-8 py-4 text-xl rounded-full font-bold tracking-wide uppercase w-52 mt-6`}
          disabled={isButtonDisabled}
          onClick={handleCreate}
        >
          Start now
        </button>
      </div>
    </main>
  );
};

export default CreateMealPage;
