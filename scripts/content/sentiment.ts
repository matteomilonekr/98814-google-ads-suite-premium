import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { sentimentAnalysis } from "../../src/modules/content-analysis";

async function main() {
  const args = getArgs();
  const keyword = args[0] || "tesla stock";
  console.log(`Sentiment Analysis for: "${keyword}"`);

  const client = initClient();
  const result = await sentimentAnalysis(client, { keyword });

  printSummary(result);

  const items = result.tasks?.[0]?.result ?? [];
  console.log(`\nSentiment data:`);
  items.forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. Sentiment: ${item.sentiment_connotation ?? "N/A"}`);
    console.log(`     Score: ${item.sentiment_score ?? "N/A"}`);
    console.log(`     Citations: ${item.citation_count ?? "N/A"}`);
    console.log(`     Connotation types: ${JSON.stringify(item.connotation_types ?? {})}`);
  });

  saveResult("content/sentiment", result);
}

main().catch(console.error);
