import { Allergy, DietaryPreference, MealRequirements } from "./types";

export const ALLERGIES: Allergy[] = [
  "Milk",
  "Eggs",
  "Fish",
  "Crustacean shellfish",
  "Tree nuts",
  "Peanuts",
  "Wheat",
  "Soybeans",
  "Sesame",
];

export const DIETARY_PREFERENCES: DietaryPreference[] = [
  null,
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Halal",
  "Kosher",
  "Flexitarian",
  "Pescatarian",
  "Lactose-Free",
  "Nut-Free",
  "Raw Vegan",
  "Specific Carbohydrate Diet",
  "Jain",
  "Macrobiotic",
  "Low-FODMAP",
  "Allergen-Free",
  "Fruitarian",
];

export const MEAL_REQUIREMENT_INITIAL_VALUE: MealRequirements = {
  ingredients: [],
  allergies: [],
  dietaryPreference: null,
};
