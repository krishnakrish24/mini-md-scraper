import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

export function extractReadable(html, url) {
  const dom = new JSDOM(html, { url });
  const reader = new Readability(dom.window.document);
  const article = reader.parse();

  if (!article) {
    return {
      title: "",
      content: dom.window.document.body.innerHTML,
      text: dom.window.document.body.innerText
    };
  }

  return {
    title: article.title,
    content: article.content,
    text: article.textContent
  };
}
