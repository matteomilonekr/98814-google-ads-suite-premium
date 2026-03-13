import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { keywordTrends } from "../../src/modules/keywords";

async function main() {
  const args = getArgs();
  const kws = args.length > 0 ? args : ["chatgpt", "claude ai"];
  console.log(`Keyword Trends for: ${kws.join(", ")}`);

  const client = initClient();
  const result = await keywordTrends(client, { keywords: kws });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  items.forEach((item: any) => {
    console.log(`\n  Keyword: "${item.keyword}"`);
    const data = item.items ?? [];
    const recent = data.slice(-6);
    console.log(`  Recent trend data (last ${recent.length} points):`);
    recent.forEach((point: any) => {
      console.log(`    ${point.date_from} → ${point.date_to}: value ${point.values?.google_trends_search_volume ?? "N/A"}`);
    });
  });

  saveResult("keyword-research/keyword-trends", result);
}

main().catch(console.error);
