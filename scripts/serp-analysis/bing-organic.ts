import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { bingOrganicLive } from "../../src/modules/serp";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "cloud hosting providers";
  console.log(`Bing Organic SERP for: "${keyword}"`);

  const client = initClient();
  const result = await bingOrganicLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  const organic = items.filter((i: any) => i.type === "organic").slice(0, 10);
  console.log(`\nTop ${organic.length} organic results:`);
  organic.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title} - ${item.url}`);
  });

  saveResult("serp-analysis/bing-organic", result);
}

main().catch(console.error);
