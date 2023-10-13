import axios from "axios";
import { ingredientListServerScheme, queryScheme } from "@/app/validators";
import { IngredientLimiter } from "../config/limiter";
import { handleRouteError } from "@/app/helpers";

export async function GET(request: Request) {
  try {
    const remainingRequests = await IngredientLimiter.removeTokens(1);
    if (remainingRequests < 0) throw new Error("429 - Too many requests.");

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");
    const parsedQuery = queryScheme.safeParse(query);
    if (!parsedQuery.success)
      throw new Error("422 - Please provide a query for the search.");

    const { data }: { data: unknown } = await axios.get(
      `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}&number=10`
    );
    const parsedData = ingredientListServerScheme.safeParse(data);
    if (!parsedData.success) throw new Error("500 - Internal Server Error.");

    const namesArray = parsedData.data.results.map((item) => item.name);
    return Response.json({ result: namesArray });
  } catch (e: any) {
    return Response.json(...handleRouteError(e));
  }
}
