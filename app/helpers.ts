import { OPEN_AI_PROMPT } from "./constants";
import { MealRequirements } from "./types";

const generateChatPrompt = (mealRequirements: MealRequirements) =>
  `${OPEN_AI_PROMPT} ${JSON.stringify(mealRequirements).replace(/"/g, "'")}`;

export const generateOpenaiBodyPost = (mealRequirements: MealRequirements) => ({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "user",
      content: generateChatPrompt(mealRequirements),
    },
  ],
});

export const generateOpenaiConfig = () => ({
  headers: {
    Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
    "Content-Type": "application/json",
  },
});

export const sleep = (ms = 5000) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const handleRouteError = (
  e: any
): [string, { status: number; statusText: string }] => {
  let [errorStatus, errorText] = e?.message?.split(" - ");
  const status = parseInt(errorStatus) ?? 500;
  const statusText = errorText ?? "Internal Server Error.";
  return [
    statusText,
    {
      status,
      statusText,
    },
  ];
};

export const handleWaitingList = async (isProcessing: { value: boolean }) => {
  let totalWaitingTime = 0;
  const MAX_WAIT_TIME_SECONDS = 120;
  while (isProcessing.value && totalWaitingTime < MAX_WAIT_TIME_SECONDS) {
    totalWaitingTime++;
    await sleep(1000);
  }
  if (isProcessing.value) {
    throw new Error("503 - Service is currently busy. Please try again later.");
  }
};
