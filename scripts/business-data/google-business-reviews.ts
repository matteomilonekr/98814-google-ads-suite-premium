import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { googleBusinessReviews } from "../../src/modules/business-data";

async function main() {
  const args = getArgs();
  const businessId = args[0];

  if (!businessId) {
    console.error("Usage: npx ts-node scripts/business-data/google-business-reviews.ts <business_id>");
    console.error("  business_id: Google Maps business ID (e.g., from google-business-search results)");
    process.exit(1);
  }

  console.log(`Google Business Reviews for: ${businessId}`);

  const client = initClient();
  const result = await googleBusinessReviews(client, { business_id: businessId });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nReviews:`);
  items.slice(0, 10).forEach((item: any, idx: number) => {
    console.log(`  ${idx + 1}. Rating: ${item.rating ?? "N/A"} - ${item.author ?? "Anonymous"}`);
    console.log(`     ${(item.review_text ?? item.body ?? "").substring(0, 150)}${(item.review_text ?? item.body ?? "").length > 150 ? "..." : ""}`);
    console.log(`     Date: ${item.time_ago ?? item.date ?? "N/A"}`);
  });

  saveResult("business-data/google-business-reviews", result);
}

main().catch(console.error);
