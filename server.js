import express from "express";
import { fetchPage } from "./scraper/browser.js";
import { extractReadable } from "./scraper/extract.js";
import { htmlToMarkdown } from "./scraper/markdown.js";

const app = express();
app.use(express.json());

app.post("/scrape", async (req, res) => {
  const { url, timeoutMs } = req.body;

  if (!url) {
    return res.status(400).json({ error: "url is required" });
  }

  try {
    const { html, title } = await fetchPage(url, timeoutMs);
    const extracted = extractReadable(html, url);
    const markdown = htmlToMarkdown(extracted.content);

    res.json({
      url,
      title: extracted.title || title,
      markdown,
      text: extracted.text
    });
  } catch (err) {
    res.status(500).json({
      error: "scrape_failed",
      message: err.message
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🕷️ Mini MD Scraper running on port ${PORT}`)
);
