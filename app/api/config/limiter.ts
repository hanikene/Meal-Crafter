import { RateLimiter } from "limiter";

export const IngredientLimiter = new RateLimiter({
  interval: "min",
  tokensPerInterval: 20,
  fireImmediately: true,
});

export const CreateMealLimiter = new RateLimiter({
  interval: "hour",
  tokensPerInterval: 5,
  fireImmediately: true,
});
