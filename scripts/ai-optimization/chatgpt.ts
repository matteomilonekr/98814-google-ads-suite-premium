import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { chatgptLive } from "../../src/modules/ai-optimization";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "best project management tools";
  console.log(`ChatGPT AI Overview for: "${keyword}"`);

  const client = initClient();
  const result = await chatgptLive(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nResponse items: ${items.length}`);
  items.slice(0, 5).forEach((item: any, idx: number) => {
    const text = item.text?.substring(0, 200) || "";
    console.log(`  ${idx + 1}. [${item.type}] ${text}...`);
    if (item.references?.length) {
      item.references.slice(0, 3).forEach((ref: any) => {
        console.log(`     → ${ref.domain}: ${ref.title}`);
      });
    }
  });

  saveResult("ai-optimization/chatgpt", result);
}

main().catch(console.error);
