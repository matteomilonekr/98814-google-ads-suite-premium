import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { domainRankOverview } from "../../src/modules/labs";

async function main() {
  const args = getArgs();
  const target = args[0] || "hubspot.com";
  console.log(`Domain Rank Overview for: ${target}`);

  const client = initClient();
  const result = await domainRankOverview(client, { target });

  printSummary(result);

  const data = result.tasks?.[0]?.result?.[0];
  if (data) {
    console.log(`\n  Organic traffic: ${data.organic_traffic ?? "N/A"}`);
    console.log(`  Organic keywords count: ${data.organic_keywords_count ?? "N/A"}`);
    console.log(`  ETV (estimated traffic value): ${data.etv ?? "N/A"}`);
    console.log(`  Rank: ${(data as any).rank ?? "N/A"}`);
  }

  saveResult("labs/domain-rank-overview", result);
}

main().catch(console.error);
