import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { competitors } from "../../src/modules/backlinks";

async function main() {
  const args = getArgs();
  const target = args[0] || "ahrefs.com";
  const limit = 20;
  console.log(`Backlink Competitors for: ${target} (limit ${limit})`);

  const client = initClient();
  const result = await competitors(client, { target, limit });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${items.length} competitors:`);
  items.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.domain} — ${item.avg_position} avg position, ${item.competing_pages} competing pages`);
  });

  saveResult("backlinks/competitors", result);
}

main().catch(console.error);
