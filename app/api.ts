import axios from "axios";
import {
  ingredientListClientScheme,
  mealContentDataScheme,
  mealRequirementScheme,
} from "./validators";
import { queryScheme } from "./validators";
import { MealRequirements } from "./types";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getIngredientList = async (query: string): Promise<string[]> => {
  try {
    const parsedQuery = queryScheme.safeParse(query);
    if (!parsedQuery.success) return [];
    const { data }: { data: unknown } = await axios.get(
      `${API_URL}/api/ingredient?query=${query}`
    );
    const parsedData = ingredientListClientScheme.safeParse(data);
    if (!parsedData.success) throw new Error();
    return parsedData.data.result;
  } catch (e) {
    throw new Error("api: Error when getting list of ingredients.");
  }
};

export const createNewMeal = async (mealRequirements: MealRequirements) => {
  try {
    const parsedMealReq = mealRequirementScheme.safeParse(mealRequirements);
    if (!parsedMealReq.success) throw new Error();

    const { data }: { data: unknown } = await axios.post(
      `${API_URL}/api/meal/create`,
      mealRequirements
    );
    const parsedData = mealContentDataScheme.safeParse(data);
    if (!parsedData.success) throw new Error();

    return parsedData.data;
  } catch (e) {
    throw new Error("api: Error when creating new meal.");
  }
};
