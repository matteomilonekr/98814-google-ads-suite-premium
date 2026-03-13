import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleOrganicLive } from "../../src/modules/serp";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "best seo tools 2025";
  console.log(`Google Organic SERP for: "${keyword}"`);

  const client = initClient();
  const result = await googleOrganicLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  const organic = items.filter((i: any) => i.type === "organic").slice(0, 10);
  console.log(`\nTop ${organic.length} organic results:`);
  organic.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.title} - ${item.url}`);
  });

  saveResult("serp-analysis/google-organic", result);
}

main().catch(console.error);
