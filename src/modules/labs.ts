import { z } from "zod";
import { DataForSEOClient } from "../client";
import {
  LabsDomainSchema,
  LabsDomainRanking,
  LabsCompetitor,
  LabsKeywordSuggestion,
  DataForSEOResponse,
} from "../types";

type DomainParams = z.input<typeof LabsDomainSchema>;

const KeywordSchema = z.object({
  keyword: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

const IntersectionSchema = z.object({
  targets: z.record(z.object({ target: z.string() })).refine(
    (t) => Object.keys(t).length >= 2,
    { message: "At least 2 targets required" }
  ),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
});

// ── Domain analytics ────────────────────────────────────────────────────────

export async function domainRankOverview(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<LabsDomainRanking>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/domain_rank_overview/live", [p]);
}

export async function domainOrganicKeywords(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<any>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/ranked_keywords/live", [p]);
}

export async function domainCompetitors(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<{ items: LabsCompetitor[] }>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/competitors_domain/live", [p]);
}

export async function domainIntersection(
  client: DataForSEOClient,
  params: z.input<typeof IntersectionSchema>
): Promise<DataForSEOResponse<any>> {
  const p = IntersectionSchema.parse(params);
  return client.post("/dataforseo_labs/google/domain_intersection/live", [p]);
}

export async function subdomains(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<any>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/subdomains/live", [p]);
}

export async function relevantPages(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<any>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/relevant_pages/live", [p]);
}

// ── Keyword analytics ───────────────────────────────────────────────────────

export async function keywordSuggestions(
  client: DataForSEOClient,
  params: z.input<typeof KeywordSchema>
): Promise<DataForSEOResponse<{ items: LabsKeywordSuggestion[] }>> {
  const p = KeywordSchema.parse(params);
  return client.post("/dataforseo_labs/google/keyword_suggestions/live", [p]);
}

export async function relatedKeywords(
  client: DataForSEOClient,
  params: z.input<typeof KeywordSchema>
): Promise<DataForSEOResponse<any>> {
  const p = KeywordSchema.parse(params);
  return client.post("/dataforseo_labs/google/related_keywords/live", [p]);
}

export async function keywordIdeas(
  client: DataForSEOClient,
  params: z.input<typeof KeywordSchema>
): Promise<DataForSEOResponse<any>> {
  const p = KeywordSchema.parse(params);
  return client.post("/dataforseo_labs/google/keyword_ideas/live", [p]);
}

export async function serpCompetitors(
  client: DataForSEOClient,
  params: z.input<typeof KeywordSchema>
): Promise<DataForSEOResponse<any>> {
  const p = KeywordSchema.parse(params);
  return client.post("/dataforseo_labs/google/serp_competitors/live", [p]);
}

export async function keywordOverview(
  client: DataForSEOClient,
  params: { keywords: string[]; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/dataforseo_labs/google/bulk_keyword_difficulty/live", [{
    keywords: params.keywords,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

export async function historicalRankOverview(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<any>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/historical_rank_overview/live", [p]);
}

export async function historicalSearchVolume(
  client: DataForSEOClient,
  params: { keywords: string[]; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/dataforseo_labs/google/historical_search_volume/live", [{
    keywords: params.keywords,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

export async function keywordsForSite(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<any>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/keywords_for_site/live", [p]);
}

export async function categoriesForDomain(
  client: DataForSEOClient,
  params: DomainParams
): Promise<DataForSEOResponse<any>> {
  const p = LabsDomainSchema.parse(params);
  return client.post("/dataforseo_labs/google/categories_for_domain/live", [p]);
}

export async function topGoogleSearches(
  client: DataForSEOClient,
  params: { location_code?: number; language_code?: string; limit?: number }
): Promise<DataForSEOResponse<any>> {
  return client.post("/dataforseo_labs/google/top_searches/live", [{
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
    limit: params.limit ?? 100,
  }]);
}

export async function bulkTrafficEstimation(
  client: DataForSEOClient,
  params: { targets: string[]; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/dataforseo_labs/google/bulk_traffic_estimation/live", [{
    targets: params.targets,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

export async function pageIntersection(
  client: DataForSEOClient,
  params: { pages: Record<string, { url: string }>; location_code?: number; language_code?: string; limit?: number }
): Promise<DataForSEOResponse<any>> {
  return client.post("/dataforseo_labs/google/page_intersection/live", [{
    pages: params.pages,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
    limit: params.limit ?? 100,
  }]);
}

export async function searchIntent(
  client: DataForSEOClient,
  params: { keywords: string[]; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/dataforseo_labs/google/search_intent/live", [{
    keywords: params.keywords,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

// ── Labs categories / locations ────────────────────────────────────────────

export async function labsCategories(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/dataforseo_labs/categories");
}

export async function labsLocationsAndLanguages(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/dataforseo_labs/locations_and_languages");
}
