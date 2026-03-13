import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleShoppingLive } from "../../src/modules/serp";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "wireless headphones";
  console.log(`Google Shopping SERP for: "${keyword}"`);

  const client = initClient();
  const result = await googleShoppingLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTotal items: ${items.length}`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title} - ${item.url ?? item.seller ?? "N/A"}`);
  });

  saveResult("serp-analysis/google-shopping", result);
}

main().catch(console.error);
