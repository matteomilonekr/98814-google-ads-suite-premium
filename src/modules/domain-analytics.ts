import { z } from "zod";
import { DataForSEOClient } from "../client";
import { TechnologyItem, WhoisRecord, DataForSEOResponse } from "../types";

const TechDomainLookupSchema = z.object({
  target: z.string().min(1),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
});

const TechAggregationSchema = z.object({
  technology: z.string().min(1),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

const WhoisSchema = z.object({
  target: z.string().min(1),
});

const WhoisOverviewSchema = z.object({
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

// ── Technology detection ────────────────────────────────────────────────────

export async function technologiesLookup(
  client: DataForSEOClient,
  params: z.input<typeof TechDomainLookupSchema>
): Promise<DataForSEOResponse<{ items: TechnologyItem[] }>> {
  const p = TechDomainLookupSchema.parse(params);
  return client.post("/domain_analytics/technologies/domain_technologies/live", [p]);
}

export async function technologyAggregation(
  client: DataForSEOClient,
  params: z.input<typeof TechAggregationSchema>
): Promise<DataForSEOResponse<any>> {
  const p = TechAggregationSchema.parse(params);
  return client.post("/domain_analytics/technologies/aggregation_technologies/live", [p]);
}

export async function domainsByTechnology(
  client: DataForSEOClient,
  params: z.input<typeof TechAggregationSchema>
): Promise<DataForSEOResponse<any>> {
  const p = TechAggregationSchema.parse(params);
  return client.post("/domain_analytics/technologies/domains_by_technology/live", [p]);
}

export async function technologyStats(
  client: DataForSEOClient,
  params: { technology: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/domain_analytics/technologies/technology_stats/live", [params]);
}

export async function availableTechnologies(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/domain_analytics/technologies/technologies");
}

// ── Whois ───────────────────────────────────────────────────────────────────

export async function whoisLookup(
  client: DataForSEOClient,
  params: z.input<typeof WhoisSchema>
): Promise<DataForSEOResponse<WhoisRecord>> {
  const p = WhoisSchema.parse(params);
  return client.post("/domain_analytics/whois/overview/live", [p]);
}

export async function whoisOverview(
  client: DataForSEOClient,
  params: z.input<typeof WhoisOverviewSchema>
): Promise<DataForSEOResponse<any>> {
  const p = WhoisOverviewSchema.parse(params);
  return client.post("/domain_analytics/whois/overview/live", [p]);
}
