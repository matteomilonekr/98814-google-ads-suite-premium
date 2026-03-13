import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { summary } from "../../src/modules/backlinks";

async function main() {
  const args = getArgs();
  const target = args[0] || "ahrefs.com";
  console.log(`Backlinks Summary for: ${target}`);

  const client = initClient();
  const result = await summary(client, { target });

  printSummary(result);

  const data = result.tasks?.[0]?.result?.[0];
  if (data) {
    console.log(`\n  Total backlinks: ${data.total_backlinks}`);
    console.log(`  Referring domains: ${data.total_referring_domains}`);
    console.log(`  Dofollow: ${data.dofollow_backlinks}`);
    console.log(`  Nofollow: ${data.nofollow_backlinks}`);
    console.log(`  Rank: ${data.rank}`);
    console.log(`  Spam score: ${data.backlinks_spam_score}`);
  }

  saveResult("backlinks/summary", result);
}

main().catch(console.error);
