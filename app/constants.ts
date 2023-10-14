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

export const OPEN_AI_PROMPT =
  "You are a professional chef, you have been cooking delicious meals for over 20 years and you are able to cook creative meals from any ingredients given to you, your restaurant has 3 Michelin stars. Your task now is to give the perfect meal for me, I will give you a array of ingredients but also others requirement, you can add other ingredients but not more than 5 other ingredients but this is not mandatory, and you can also remove of the ingredients provided but this is also not mandatory, and your response will only be a json file with these attributes {'promptPhoto', 'name', 'ingredients': [{'name', 'amount'}], 'steps', 'preparationTime', 'nutritionalFacts': {'calories', 'proteins', 'carbohydrates', 'fat'}} the promptPhoto is the prompt description that will be used for generating a visual of the meal using Midjourney (https://www.midjourney.com), here is an example of a prompt of a peperoni pizza 'Powerful realistic picture of a delicious peperoni pizza using professional photography gear in a culinary studio, foreground blurred, food photography, magazine, cinematic color grading, stunning optical flare, photorealistic shot --aspect 4:3 --v 5' this is only an example be free to add your prompt engineering knowledge to make it better, here is a site where you can learn more prompt to get better (https://wgmimedia.com/midjourney-food-prompts/), just keep the '--aspect 4:3 --v 5', this is really important to keep these parameters at the end, the prompt should also have the name of the meal and a clear description of its components after the preparation of the meal. The name attribute is the actual name of the meal, the steps must be included inside an array for separating them, the preparationTime must be an integer of minutes, the nutritional facts must be per serving, the calories must be an integer of kcal, protein carbohydrates and fat must be integers of grams. Don't forget the JSON is the only answer awaiting, don't say anything else! Here are the requirement:";
