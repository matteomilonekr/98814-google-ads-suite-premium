import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { referringDomains } from "../../src/modules/backlinks";

async function main() {
  const args = getArgs();
  const target = args[0] || "moz.com";
  const limit = 20;
  console.log(`Referring Domains for: ${target} (limit ${limit})`);

  const client = initClient();
  const result = await referringDomains(client, { target, limit });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ${items.length} referring domains:`);
  items.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. ${item.domain} — ${item.backlinks} backlinks, rank ${item.rank}`);
  });

  saveResult("backlinks/referring-domains", result);
}

main().catch(console.error);
