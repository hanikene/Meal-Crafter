import { mealContentDataScheme, mealRequirementScheme } from "@/app/validators";
import { CreateMealLimiter } from "../../config/limiter";
import { handleRouteError } from "@/app/helpers";
import generateMealImageByDiscordScraping from "./discord";
import generateMealDataByOpenai from "./openai";
import { OpenaiContent } from "@/app/types";

export async function POST(request: Request) {
  try {
    const remainingRequests = await CreateMealLimiter.removeTokens(1);
    if (remainingRequests < 0) throw new Error("429 - Too many requests.");

    const body = await request.json();
    const parsedBody = mealRequirementScheme.safeParse(body);
    if (!parsedBody.success)
      throw new Error("422 - Please provide valid meal requirements.");

    const openaiMealData: OpenaiContent = await generateMealDataByOpenai(
      parsedBody.data
    );
    const { promptPhoto, ...dataWithoutPrompt } = openaiMealData;
    const imageUrl = await generateMealImageByDiscordScraping(promptPhoto);
    const mealContent = { ...dataWithoutPrompt, imageUrl };
    const parsedMealContentData = mealContentDataScheme.safeParse(mealContent);
    if (!parsedMealContentData.success)
      throw new Error("500 - Internal Server Error.");

    return Response.json(parsedMealContentData.data, { status: 200 });
  } catch (e: any) {
    return Response.json(...handleRouteError(e));
  }
}
