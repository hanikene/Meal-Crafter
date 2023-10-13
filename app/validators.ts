import z from "zod";

export const queryScheme = z.string().min(1);

export const ingredientListServerScheme = z.object({
  results: z.array(
    z.object({
      id: z.number().optional(),
      name: z.string(),
      image: z.string().optional(),
    })
  ),
  offset: z.number().optional(),
  number: z.number().optional(),
  totalResults: z.number().optional(),
});

export const ingredientListClientScheme = z.object({
  result: z.array(z.string()),
});

export const allergyScheme = z.union([
  z.literal("Milk"),
  z.literal("Eggs"),
  z.literal("Fish"),
  z.literal("Crustacean shellfish"),
  z.literal("Tree nuts"),
  z.literal("Peanuts"),
  z.literal("Wheat"),
  z.literal("Soybeans"),
  z.literal("Sesame"),
]);

export const dietaryPreferenceScheme = z.union([
  z.null(),
  z.literal("Vegetarian"),
  z.literal("Vegan"),
  z.literal("Gluten-Free"),
  z.literal("Halal"),
  z.literal("Kosher"),
  z.literal("Flexitarian"),
  z.literal("Pescatarian"),
  z.literal("Lactose-Free"),
  z.literal("Nut-Free"),
  z.literal("Raw Vegan"),
  z.literal("Specific Carbohydrate Diet"),
  z.literal("Jain"),
  z.literal("Macrobiotic"),
  z.literal("Low-FODMAP"),
  z.literal("Allergen-Free"),
  z.literal("Fruitarian"),
]);

export const mealRequirementScheme = z.object({
  ingredients: z.array(z.string()).min(3),
  allergies: z.array(allergyScheme),
  dietaryPreference: dietaryPreferenceScheme,
});

export const openaiResponseScheme = z.object({
  id: z.string().optional(),
  object: z.string().optional(),
  created: z.number().optional(),
  model: z.string().optional(),
  usage: z
    .object({
      prompt_tokens: z.number().optional(),
      completion_tokens: z.number().optional(),
      total_tokens: z.number().optional(),
    })
    .optional(),
  choices: z
    .array(
      z.object({
        index: z.number().optional(),
        finish_reason: z.string().optional(),
        message: z.object({
          role: z.string().optional(),
          content: z.string(),
        }),
      })
    )
    .min(1),
});

export const openaiContentScheme = z.object({
  promptPhoto: z.string(),
  name: z.string(),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        amount: z.string(),
      })
    )
    .min(3),
  steps: z.array(z.string()),
  preparationTime: z.number().int().positive(),
  nutritionalFacts: z.object({
    calories: z.number().int().positive(),
    proteins: z.number().int().positive(),
    carbohydrates: z.number().int().positive(),
    fat: z.number().int().positive(),
  }),
});

export const mealContentScheme = openaiContentScheme
  .omit({ promptPhoto: true })
  .and(z.object({ imageUrl: z.string().url() }));

export const imageUrlScheme = z.string().url();
