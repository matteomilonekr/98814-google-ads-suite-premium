import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { amazonReviews } from "../../src/modules/merchant";

async function main() {
  const args = getArgs();
  const asin = args[0] || "B09V3KXJPB";
  console.log(`Amazon Reviews for ASIN: ${asin}`);

  const client = initClient();
  const result = await amazonReviews(client, { asin });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nReview summaries:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. Rating: ${item.rating ?? "N/A"} - ${item.title ?? "No title"}`);
    console.log(`     ${(item.body ?? item.review_text ?? "").substring(0, 150)}${(item.body ?? item.review_text ?? "").length > 150 ? "..." : ""}`);
    console.log(`     Author: ${item.author ?? "N/A"} | Date: ${item.date ?? "N/A"}`);
  });

  saveResult("merchant/amazon-reviews", result);
}

main().catch(console.error);
