import { z } from "zod";
import {
  allergyScheme,
  dietaryPreferenceScheme,
  mealContentScheme,
  mealRequirementScheme,
  openaiContentScheme,
} from "./validators";

export type Allergy = z.infer<typeof allergyScheme>;
export type DietaryPreference = z.infer<typeof dietaryPreferenceScheme>;
export type MealRequirements = z.infer<typeof mealRequirementScheme>;
export type OpenaiContent = z.infer<typeof openaiContentScheme>;
export type MealContent = z.infer<typeof mealContentScheme>;
