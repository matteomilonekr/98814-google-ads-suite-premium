import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { domainCompetitors } from "../../src/modules/labs";

async function main() {
  const args = getArgs();
  const target = args[0] || "hubspot.com";
  console.log(`Domain Competitors for: ${target}`);

  const client = initClient();
  const result = await domainCompetitors(client, { target, limit: 20 });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nCompetitors found (${items.length}):`);
  items.forEach((item: any, idx: number) => {
    const domain = item.domain ?? "unknown";
    const intersections = item.avg_position ?? item.intersections ?? "N/A";
    const traffic = item.organic_traffic ?? "N/A";
    console.log(`  ${idx + 1}. ${domain} — intersections: ${intersections}, organic traffic: ${traffic}`);
  });

  saveResult("labs/domain-competitors", result);
}

main().catch(console.error);
