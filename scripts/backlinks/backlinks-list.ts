import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { list } from "../../src/modules/backlinks";

async function main() {
  const args = getArgs();
  const target = args[0] || "moz.com";
  const limit = 20;
  console.log(`Backlinks List for: ${target} (limit ${limit})`);

  const client = initClient();
  const result = await list(client, { target, limit });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${items.length} backlinks:`);
  items.forEach((item: any, idx: number) => {
    const follow = item.dofollow ? "dofollow" : "nofollow";
    console.log(`  ${idx + 1}. ${item.domain_from} — "${item.anchor}" [${follow}]`);
  });

  saveResult("backlinks/backlinks-list", result);
}

main().catch(console.error);
