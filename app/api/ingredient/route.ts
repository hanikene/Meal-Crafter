import axios from "axios";
import { ingredientListServerScheme, queryScheme } from "@/app/validators";
import { IngredientLimiter } from "../config/limiter";
import { handleRouteError } from "@/app/helpers";

export async function GET(request: Request) {
  const remainingRequests = await IngredientLimiter.removeTokens(1);
  if (remainingRequests < 0)
    return Response.json("Too many requests.", {
      status: 429,
      statusText: "Too many requests",
    });

  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const parsedQuery = queryScheme.safeParse(query);
  if (!parsedQuery.success)
    return Response.json("Please provide a query for the search.", {
      status: 422,
      statusText: "Please provide a query for the search",
    });

  const { data }: { data: unknown } = await axios.get(
    `https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.SPOONACULAR_API_KEY}&query=${query}&number=10`
  );
  const parsedData = ingredientListServerScheme.safeParse(data);
  if (!parsedData.success)
    return Response.json("Internal Server Error.", {
      status: 500,
      statusText: "Internal Server Error",
    });

  const namesArray = parsedData.data.results.map((item) => item.name);
  return Response.json({ result: namesArray }, { status: 200 });
}
