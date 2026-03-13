import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { DataForSEOClient } from "../../src/client";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "seo tools";
  console.log(`Keyword Suggestions for: "${keyword}"`);

  const client = initClient();
  const result = await client.post("/keywords_data/google_ads/keywords_for_keywords/live", [
    { keywords: [keyword], location_code: 2840, language_code: "en" },
  ]);

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  const top10 = items.slice(0, 10);
  console.log(`\nTop ${top10.length} suggestions:`);
  top10.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. "${item.keyword}" → vol: ${item.search_volume}, cpc: $${item.cpc}, comp: ${item.competition}`);
  });

  saveResult("keyword-research/keyword-suggestions", result);
}

main().catch(console.error);
