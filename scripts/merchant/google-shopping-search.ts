import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleShoppingSearch } from "../../src/modules/merchant";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "wireless headphones";
  console.log(`Google Shopping Search for: "${keyword}"`);

  const client = initClient();
  const result = await googleShoppingSearch(client, { keyword, limit: 10 });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${Math.min(items.length, 10)} products:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title ?? "N/A"}`);
    console.log(`     Price: ${item.price ?? item.price_from ?? "N/A"}`);
    console.log(`     Seller: ${item.seller ?? "N/A"}`);
  });

  saveResult("merchant/google-shopping-search", result);
}

main().catch(console.error);
