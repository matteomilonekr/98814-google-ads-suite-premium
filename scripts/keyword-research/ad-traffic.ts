import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { adTrafficByKeywords } from "../../src/modules/keywords";

async function main() {
  const args = getArgs();
  const kws = args.length > 0 ? args : ["seo tools", "keyword research"];
  console.log(`Ad Traffic Estimates for: ${kws.join(", ")}`);

  const client = initClient();
  const result = await adTrafficByKeywords(client, { keywords: kws });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  items.forEach((item: any) => {
    console.log(`  "${item.keyword}" → impressions: ${item.impressions}, clicks: ${item.clicks}, cost: $${item.cost}`);
  });

  saveResult("keyword-research/ad-traffic", result);
}

main().catch(console.error);
