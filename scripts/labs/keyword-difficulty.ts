import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { keywordOverview } from "../../src/modules/labs";

async function main() {
  const args = getArgs();
  const keywords = args.length > 0 ? args : ["seo tools", "keyword research", "link building"];
  console.log(`Keyword Difficulty for: ${keywords.join(", ")}`);

  const client = initClient();
  const result = await keywordOverview(client, { keywords });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  console.log(`\nDifficulty scores:`);
  (Array.isArray(items) ? items : [items]).forEach((item: any) => {
    if (item?.items) {
      item.items.forEach((kw: any) => {
        console.log(`  "${kw.keyword}" — difficulty: ${kw.keyword_difficulty ?? "N/A"}`);
      });
    } else if (item?.keyword) {
      console.log(`  "${item.keyword}" — difficulty: ${item.keyword_difficulty ?? "N/A"}`);
    }
  });

  saveResult("labs/keyword-difficulty", result);
}

main().catch(console.error);
