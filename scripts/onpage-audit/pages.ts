import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { pages } from "../../src/modules/onpage";

async function main() {
  const args = getArgs();
  const taskId = args[0];

  if (!taskId) {
    console.error("Usage: npx ts-node scripts/onpage-audit/pages.ts <task_id>");
    console.error("  task_id: ID from a previous on-page crawl task");
    process.exit(1);
  }

  console.log(`On-Page Pages for task: ${taskId}`);

  const client = initClient();
  const result = await pages(client, { id: taskId });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nPages found: ${items.length}`);
  items.forEach((page: any) => {
    console.log(`  [${page.status_code}] ${page.url}`);
  });

  saveResult("onpage-audit/pages", result);
}

main().catch(console.error);
