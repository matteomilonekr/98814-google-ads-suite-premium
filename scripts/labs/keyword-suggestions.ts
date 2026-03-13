import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { keywordSuggestions } from "../../src/modules/labs";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "content marketing";
  console.log(`Keyword Suggestions for: "${keyword}"`);

  const client = initClient();
  const result = await keywordSuggestions(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nSuggestions (${items.length}):`);
  items.forEach((item: any, idx: number) => {
    const kw = item.keyword_data?.keyword ?? item.keyword ?? "unknown";
    const vol = item.keyword_data?.keyword_info?.search_volume ?? item.search_volume ?? "N/A";
    const diff = item.keyword_data?.keyword_properties?.keyword_difficulty ?? item.keyword_difficulty ?? "N/A";
    console.log(`  ${idx + 1}. "${kw}" — volume: ${vol}, difficulty: ${diff}`);
  });

  saveResult("labs/keyword-suggestions", result);
}

main().catch(console.error);
