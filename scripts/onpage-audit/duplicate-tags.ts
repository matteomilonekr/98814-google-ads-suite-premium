import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { duplicateTags } from "../../src/modules/onpage";

async function main() {
  const args = getArgs();
  const taskId = args[0];

  if (!taskId) {
    console.error("Usage: npx ts-node scripts/onpage-audit/duplicate-tags.ts <task_id>");
    console.error("  task_id: ID from a previous on-page crawl task");
    process.exit(1);
  }

  console.log(`On-Page Duplicate Tags for task: ${taskId}`);

  const client = initClient();
  const result = await duplicateTags(client, { id: taskId });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nDuplicate tags found: ${items.length}`);
  items.forEach((item: any) => {
    console.log(`  Tag: "${item.duplicate_tag ?? item.title ?? item.description ?? "unknown"}"`);
    console.log(`    Pages: ${item.pages?.length ?? item.count ?? "N/A"}`);
    if (item.pages) {
      item.pages.slice(0, 5).forEach((page: any) => {
        console.log(`      - ${page.url ?? page}`);
      });
    }
  });

  saveResult("onpage-audit/duplicate-tags", result);
}

main().catch(console.error);
