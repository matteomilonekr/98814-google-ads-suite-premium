import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleMapsLive } from "../../src/modules/serp";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "pizza near me";
  console.log(`Google Maps SERP for: "${keyword}"`);

  const client = initClient();
  const result = await googleMapsLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTotal items: ${items.length}`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title} - ${item.url ?? item.domain ?? "N/A"}`);
  });

  saveResult("serp-analysis/google-maps", result);
}

main().catch(console.error);
