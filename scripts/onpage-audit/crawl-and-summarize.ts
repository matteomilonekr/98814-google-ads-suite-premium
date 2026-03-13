import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { crawlAndSummarize } from "../../src/modules/onpage";

async function main() {
  const args = getArgs();
  const target = args[0] || "example.com";
  console.log(`On-Page Crawl & Summarize for: ${target}`);

  const client = initClient();
  const summary = await crawlAndSummarize(
    client,
    { target, max_crawl_pages: 10 },
    { pollIntervalMs: 10000, maxAttempts: 60 }
  );

  if (summary) {
    console.log(`\n  Crawl progress: ${summary.crawl_progress}`);
    console.log(`  Pages crawled: ${summary.pages_crawled}`);
    console.log(`  On-page score: ${summary.onpage_score}`);
    console.log(`  Broken links: ${(summary as any).broken_links ?? "N/A"}`);
    console.log(`  Duplicate titles: ${(summary as any).duplicate_title ?? "N/A"}`);
  } else {
    console.log("\n  No summary returned.");
  }

  saveResult("onpage-audit/crawl-and-summarize", summary);
}

main().catch(console.error);
