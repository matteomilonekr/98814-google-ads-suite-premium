import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleNewsLive } from "../../src/modules/serp";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "artificial intelligence";
  console.log(`Google News SERP for: "${keyword}"`);

  const client = initClient();
  const result = await googleNewsLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTotal items: ${items.length}`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title} - ${item.url ?? "N/A"}`);
  });

  saveResult("serp-analysis/google-news", result);
}

main().catch(console.error);
