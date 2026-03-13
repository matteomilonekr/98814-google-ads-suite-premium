import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { generateMeta } from "../../src/modules/content-generation";

async function main() {
  const args = getArgs();
  const text = args[0] || "A comprehensive guide to search engine optimization covering on-page, off-page, and technical SEO";
  console.log(`Meta Tag Generation for: "${text.substring(0, 80)}${text.length > 80 ? "..." : ""}"`);

  const client = initClient();
  const result = await generateMeta(client, { text });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  items.forEach((item: any, idx: number) => {
    console.log(`\n  Meta tags (${idx + 1}):`);
    console.log(`    Title: ${item.title ?? "N/A"}`);
    console.log(`    Description: ${item.description ?? "N/A"}`);
    console.log(`    H1: ${item.h1 ?? "N/A"}`);
  });

  saveResult("content/generate-meta", result);
}

main().catch(console.error);
