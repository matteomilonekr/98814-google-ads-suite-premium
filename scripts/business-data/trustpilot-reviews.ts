import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { trustpilotReviews } from "../../src/modules/business-data";

async function main() {
  const args = getArgs();
  const domain = args[0] || "semrush.com";
  console.log(`Trustpilot Reviews for: ${domain}`);

  const client = initClient();
  const result = await trustpilotReviews(client, { domain });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nReviews:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. Rating: ${item.rating ?? "N/A"} - ${item.author ?? "Anonymous"}`);
    console.log(`     ${(item.review_text ?? item.body ?? item.title ?? "").substring(0, 150)}${(item.review_text ?? item.body ?? item.title ?? "").length > 150 ? "..." : ""}`);
    console.log(`     Date: ${item.date ?? item.timestamp ?? "N/A"}`);
  });

  saveResult("business-data/trustpilot-reviews", result);
}

main().catch(console.error);
