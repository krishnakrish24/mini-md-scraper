import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
});

export function htmlToMarkdown(html) {
  return turndown.turndown(html || "");
}
