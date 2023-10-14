import puppeteer, { Page } from "puppeteer";
import { handleWaitingList, sleep } from "@/app/helpers";
import { imageUrlScheme } from "@/app/validators";

const isProcessing = { value: false };

const generateMealImageByDiscordScraping = async (prompt: string) => {
  try {
    if (
      !process.env.DISCORD_LINK ||
      !process.env.DISCORD_EMAIL ||
      !process.env.DISCORD_PASSWORD
    )
      throw new Error();

    await handleWaitingList(isProcessing);
    isProcessing.value = true;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({ width: 800, height: 600 });
    await page.goto(process.env.DISCORD_LINK);
    await page.waitForSelector('input[name="email"]');
    await page.type('input[name="email"]', process.env.DISCORD_EMAIL);
    await page.type('input[name="password"]', process.env.DISCORD_PASSWORD);
    await page.keyboard.press("Enter");

    const discordGroupButton = await page.waitForSelector(
      'div[class^="listItem"]:has(div[data-dnd-name="Meal Crafter"])'
    );
    if (!discordGroupButton) throw new Error();
    discordGroupButton.click();
    sleep(1000);

    const MessageTextArea = await page.waitForSelector("div[role='textbox']");
    if (!MessageTextArea) throw new Error();
    await MessageTextArea.click();
    MessageTextArea.type("/imagine");
    await sleep(1000);

    const imagineButton = await page.waitForSelector("#autocomplete-0");
    if (!imagineButton) throw new Error();
    await imagineButton.click();
    await sleep(500);

    const promptContainer = await page.waitForSelector(
      'span[class^="optionPillValue"]'
    );
    if (!promptContainer) throw new Error();
    await promptContainer.click();
    sleep(200);
    await promptContainer.type(prompt);
    await page.keyboard.press("Enter");

    await sleep(45000);
    let enlargeFirstImageButton = await page.waitForSelector(
      'li[aria-setsize="-1"]:last-of-type button'
    );
    if (!enlargeFirstImageButton) throw new Error();
    enlargeFirstImageButton.click();

    await sleep(8000);
    const image = await page.waitForSelector(
      'ol > li[aria-setsize="-1"]:last-of-type div[class^="clickable"]'
    );
    if (!image) throw new Error();
    await image.click();
    await image.click();

    const openImageAnchor = await page.waitForSelector(
      'div[class^="layerContainer"] a'
    );
    if (!openImageAnchor) throw new Error();
    await openImageAnchor.click();
    await sleep(1000);

    const pages = await browser.pages();
    const pageToSwitchTo: Page = pages[2];
    await pageToSwitchTo.bringToFront();
    const imageUrl = pageToSwitchTo.url();
    await browser.close();
    isProcessing.value = false;

    const parsedImageUrl = imageUrlScheme.safeParse(imageUrl);
    if (!parsedImageUrl.success) throw new Error();
    return parsedImageUrl.data;
  } catch (e) {
    throw new Error("500 - Internal Server Error.");
  }
};

export default generateMealImageByDiscordScraping;
