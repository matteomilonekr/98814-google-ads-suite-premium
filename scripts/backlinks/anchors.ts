import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { anchors } from "../../src/modules/backlinks";

async function main() {
  const args = getArgs();
  const target = args[0] || "semrush.com";
  const limit = 20;
  console.log(`Backlink Anchors for: ${target} (limit ${limit})`);

  const client = initClient();
  const result = await anchors(client, { target, limit });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${items.length} anchors:`);
  items.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. "${item.anchor}" — ${item.backlinks} backlinks, ${item.referring_domains} domains`);
  });

  saveResult("backlinks/anchors", result);
}

main().catch(console.error);
