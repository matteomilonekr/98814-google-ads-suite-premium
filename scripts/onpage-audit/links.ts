import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { links } from "../../src/modules/onpage";

async function main() {
  const args = getArgs();
  const taskId = args[0];

  if (!taskId) {
    console.error("Usage: npx ts-node scripts/onpage-audit/links.ts <task_id>");
    console.error("  task_id: ID from a previous on-page crawl task");
    process.exit(1);
  }

  console.log(`On-Page Links for task: ${taskId}`);

  const client = initClient();
  const result = await links(client, { id: taskId });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nLinks found: ${items.length}`);
  items.forEach((link: any) => {
    console.log(`  [${link.direction ?? link.type ?? "link"}] ${link.url ?? link.link_from ?? "unknown"}`);
    if (link.dofollow !== undefined) console.log(`    dofollow: ${link.dofollow}`);
    if (link.page_from) console.log(`    from: ${link.page_from}`);
    if (link.page_to) console.log(`    to: ${link.page_to}`);
  });

  saveResult("onpage-audit/links", result);
}

main().catch(console.error);
