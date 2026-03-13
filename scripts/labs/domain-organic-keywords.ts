import { initClient, saveResult, getArgs, printSummary } from "../_client";
import { domainOrganicKeywords } from "../../src/modules/labs";

async function main() {
  const args = getArgs();
  const target = args[0] || "hubspot.com";
  console.log(`Domain Organic Keywords for: ${target}`);

  const client = initClient();
  const result = await domainOrganicKeywords(client, { target, limit: 20 });

  printSummary(result);

  const items = result.tasks?.[0]?.result?.[0]?.items ?? [];
  console.log(`\nTop ranked keywords (${items.length}):`);
  items.forEach((item: any, idx: number) => {
    const kw = item.keyword_data?.keyword ?? item.keyword ?? "unknown";
    const vol = item.keyword_data?.keyword_info?.search_volume ?? item.search_volume ?? "N/A";
    const pos = item.ranked_serp_element?.serp_item?.rank_group ?? item.rank_group ?? "N/A";
    console.log(`  ${idx + 1}. "${kw}" — position: ${pos}, volume: ${vol}`);
  });

  saveResult("labs/domain-organic-keywords", result);
}

main().catch(console.error);
