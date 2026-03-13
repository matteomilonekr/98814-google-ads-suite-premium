import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { search } from "../../src/modules/content-analysis";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "artificial intelligence";
  console.log(`Content Analysis Search for: "${keyword}"`);

  const client = initClient();
  const result = await search(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${Math.min(items.length, 10)} results:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title ?? item.url}`);
    console.log(`     URL: ${item.url}`);
    console.log(`     Content quality score: ${item.content_quality_score ?? "N/A"}`);
  });

  saveResult("content/search", result);
}

main().catch(console.error);
