import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { trustpilotSearch } from "../../src/modules/business-data";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "web hosting";
  console.log(`Trustpilot Search for: "${keyword}"`);

  const client = initClient();
  const result = await trustpilotSearch(client, { keyword, limit: 10 });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${Math.min(items.length, 10)} businesses:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title ?? item.name ?? item.domain ?? "N/A"}`);
    console.log(`     Rating: ${item.rating ?? "N/A"} | Reviews: ${item.reviews_count ?? "N/A"}`);
  });

  saveResult("business-data/trustpilot-search", result);
}

main().catch(console.error);
