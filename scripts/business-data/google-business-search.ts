import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleBusinessSearch } from "../../src/modules/business-data";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "italian restaurant new york";
  console.log(`Google Business Search for: "${keyword}"`);

  const client = initClient();
  const result = await googleBusinessSearch(client, { keyword, limit: 10 });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${Math.min(items.length, 10)} businesses:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title ?? item.name ?? "N/A"}`);
    console.log(`     Rating: ${item.rating ?? "N/A"} (${item.reviews_count ?? 0} reviews)`);
    console.log(`     Address: ${item.address ?? "N/A"}`);
  });

  saveResult("business-data/google-business-search", result);
}

main().catch(console.error);
