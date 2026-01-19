import { chromium } from "playwright";

export async function fetchPage(url, timeout = 15000) {
  const browser = await chromium.launch({
    headless: true,
    args: [
      "--disable-dev-shm-usage",
      "--no-sandbox",
      "--disable-gpu"
    ]
  });

  const page = await browser.newPage();

  // Block heavy resources
  await page.route("**/*", route => {
    const type = route.request().resourceType();
    if (["image", "font", "media"].includes(type)) {
      route.abort();
    } else {
      route.continue();
    }
  });

  await page.goto(url, {
    waitUntil: "networkidle",
    timeout
  });

  const html = await page.content();
  const title = await page.title();

  await browser.close();
  return { html, title };
}
