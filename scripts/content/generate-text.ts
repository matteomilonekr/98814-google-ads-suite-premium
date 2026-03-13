import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { generate } from "../../src/modules/content-generation";

async function main() {
  const args = getArgs();
  const text = args[0] || "Write an article about SEO best practices in 2025";
  console.log(`Content Generation for: "${text.substring(0, 80)}${text.length > 80 ? "..." : ""}"`);

  const client = initClient();
  const result = await generate(client, { text });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  items.forEach((item: any, idx: number) => {
    const snippet = item.generated_text ?? item.text ?? "";
    console.log(`\n  Generated text (${idx + 1}):`);
    console.log(`  ${snippet.substring(0, 500)}${snippet.length > 500 ? "..." : ""}`);
  });

  saveResult("content/generate-text", result);
}

main().catch(console.error);
