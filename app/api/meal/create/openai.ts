import { generateOpenaiBodyPost, generateOpenaiConfig } from "@/app/helpers";
import { MealRequirements } from "@/app/types";
import { openaiContentScheme, openaiResponseScheme } from "@/app/validators";
import axios from "axios";

const generateMealDataByOpenai = async (mealRequirements: MealRequirements) => {
  const { data }: { data: unknown } = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    generateOpenaiBodyPost(mealRequirements),
    generateOpenaiConfig()
  );
  const parsedData = openaiResponseScheme.safeParse(data);
  if (!parsedData.success) throw new Error("500 - Internal Server Error.");

  const { content } = parsedData.data.choices[0].message;
  const parsedContent = JSON.parse(content);
  const openaiContent = openaiContentScheme.safeParse(parsedContent);
  if (!openaiContent.success) throw new Error("500 - Internal Server Error.");

  return openaiContent.data;
};

export default generateMealDataByOpenai;
