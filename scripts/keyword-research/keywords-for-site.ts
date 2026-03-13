import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { keywordsForSite } from "../../src/modules/keywords";

async function main() {
  const args = getArgs();
  const target = args[0] || "ahrefs.com";
  console.log(`Keywords for Site: "${target}"`);

  const client = initClient();
  const result = await keywordsForSite(client, { target });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  const top = items.slice(0, 15);
  console.log(`\nTop ${top.length} keywords found:`);
  top.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. "${item.keyword}" → vol: ${item.search_volume}, cpc: $${item.cpc}, comp: ${item.competition}`);
  });

  saveResult("keyword-research/keywords-for-site", result);
}

main().catch(console.error);
