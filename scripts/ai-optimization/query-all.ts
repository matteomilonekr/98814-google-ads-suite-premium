import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { queryAllLLMs } from "../../src/modules/ai-optimization";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "best seo tools";
  console.log(`Querying all LLMs for: "${keyword}"\n`);

  const client = initClient();
  const results = await queryAllLLMs(client, { keyword });

  for (const [engine, result] of Object.entries(results)) {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`Engine: ${engine.toUpperCase()}`);
    console.log("=".repeat(50));

    printSummary(result);

    const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
    console.log(`Response items: ${items.length}`);
    items.slice(0, 3).forEach((item: any, idx: number) => {
      const text = item.text?.substring(0, 200) || "";
      console.log(`  ${idx + 1}. [${item.type}] ${text}...`);
      if (item.references?.length) {
        item.references.slice(0, 3).forEach((ref: any) => {
          console.log(`     → ${ref.domain}: ${ref.title}`);
        });
      }
    });
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`Total engines queried: ${Object.keys(results).length}`);

  saveResult("ai-optimization/query-all", results);
}

main().catch(console.error);
