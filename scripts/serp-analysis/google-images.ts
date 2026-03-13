import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleImagesLive } from "../../src/modules/serp";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "modern web design";
  console.log(`Google Images SERP for: "${keyword}"`);

  const client = initClient();
  const result = await googleImagesLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTotal items: ${items.length}`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title ?? item.alt} - ${item.url ?? item.source_url ?? "N/A"}`);
  });

  saveResult("serp-analysis/google-images", result);
}

main().catch(console.error);
