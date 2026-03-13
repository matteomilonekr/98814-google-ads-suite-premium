import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { searchVolume } from "../../src/modules/keywords";

async function main() {
  const args = getArgs();
  const kws = args.length > 0 ? args : ["seo tools", "keyword research", "backlink checker"];
  console.log(`Search Volume for: ${kws.join(", ")}`);

  const client = initClient();
  const result = await searchVolume(client, { keywords: kws });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  items.forEach((item: any) => {
    console.log(`  "${item.keyword}" → vol: ${item.search_volume}, cpc: $${item.cpc}, comp: ${item.competition}`);
  });

  saveResult("keyword-research/search-volume", result);
}

main().catch(console.error);
