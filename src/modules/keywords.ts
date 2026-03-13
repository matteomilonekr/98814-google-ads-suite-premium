import { z } from "zod";
import { DataForSEOClient } from "../client";
import {
  KeywordSearchVolumeSchema,
  KeywordSuggestionsSchema,
  KeywordData,
  KeywordSuggestion,
  KeywordForSite,
  DataForSEOResponse,
} from "../types";

type SearchVolumeParams = z.input<typeof KeywordSearchVolumeSchema>;
type SuggestionsParams = z.input<typeof KeywordSuggestionsSchema>;

const KeywordForSiteSchema = z.object({
  target: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

const KeywordTrendsSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1).max(5),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
});

const BingKeywordSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1).max(1000),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
});

// ── Google Ads keyword functions ────────────────────────────────────────────

export async function searchVolume(
  client: DataForSEOClient,
  params: SearchVolumeParams
): Promise<DataForSEOResponse<KeywordData>> {
  const p = KeywordSearchVolumeSchema.parse(params);
  return client.post("/keywords_data/google_ads/search_volume/live", [p]);
}

export async function keywordSuggestions(
  client: DataForSEOClient,
  params: SuggestionsParams
): Promise<DataForSEOResponse<KeywordSuggestion>> {
  const p = KeywordSuggestionsSchema.parse(params);
  return client.post("/keywords_data/google_ads/keywords_for_keywords/live", [p]);
}

export async function keywordsForSite(
  client: DataForSEOClient,
  params: z.input<typeof KeywordForSiteSchema>
): Promise<DataForSEOResponse<KeywordForSite>> {
  const p = KeywordForSiteSchema.parse(params);
  return client.post("/keywords_data/google_ads/keywords_for_site/live", [p]);
}

export async function adTrafficByKeywords(
  client: DataForSEOClient,
  params: SearchVolumeParams
): Promise<DataForSEOResponse<any>> {
  const p = KeywordSearchVolumeSchema.parse(params);
  return client.post("/keywords_data/google_ads/ad_traffic_by_keywords/live", [p]);
}

export async function keywordTrends(
  client: DataForSEOClient,
  params: z.input<typeof KeywordTrendsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = KeywordTrendsSchema.parse(params);
  return client.post("/keywords_data/google_trends/explore/live", [p]);
}

// ── Bing keywords ───────────────────────────────────────────────────────────

export async function bingSearchVolume(
  client: DataForSEOClient,
  params: z.input<typeof BingKeywordSchema>
): Promise<DataForSEOResponse<KeywordData>> {
  const p = BingKeywordSchema.parse(params);
  return client.post("/keywords_data/bing/search_volume/live", [p]);
}

export async function bingKeywordSuggestions(
  client: DataForSEOClient,
  params: { keyword: string; location_code?: number; language_code?: string; limit?: number }
): Promise<DataForSEOResponse<KeywordSuggestion>> {
  return client.post("/keywords_data/bing/keywords_for_keywords/live", [{
    keyword: params.keyword,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
    limit: params.limit ?? 100,
  }]);
}

export async function bingKeywordsForSite(
  client: DataForSEOClient,
  params: { target: string; location_code?: number; language_code?: string; limit?: number }
): Promise<DataForSEOResponse<KeywordForSite>> {
  return client.post("/keywords_data/bing/keywords_for_site/live", [{
    target: params.target,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
    limit: params.limit ?? 100,
  }]);
}

// ── Locations / Languages ───────────────────────────────────────────────────

export async function googleAdsLocations(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/keywords_data/google_ads/locations");
}

export async function googleAdsLanguages(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/keywords_data/google_ads/languages");
}

// ── Clickstream Data ────────────────────────────────────────────────────────

export async function clickstreamSearchVolume(
  client: DataForSEOClient,
  params: SearchVolumeParams
): Promise<DataForSEOResponse<any>> {
  const p = KeywordSearchVolumeSchema.parse(params);
  return client.post("/keywords_data/clickstream_data/dataforseo_search_volume/live", [p]);
}

export async function clickstreamLocations(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/keywords_data/clickstream_data/locations_and_languages");
}

// ── Bing Search Volume History ──────────────────────────────────────────────

export async function bingSearchVolumeHistory(
  client: DataForSEOClient,
  params: z.input<typeof BingKeywordSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BingKeywordSchema.parse(params);
  return client.post("/keywords_data/bing/search_volume_history/live", [p]);
}

// ── Google Ads Task-Based ───────────────────────────────────────────────────

export async function searchVolumeTaskPost(
  client: DataForSEOClient,
  params: SearchVolumeParams
): Promise<DataForSEOResponse<any>> {
  const p = KeywordSearchVolumeSchema.parse(params);
  return client.post("/keywords_data/google_ads/search_volume/task_post", [p]);
}

export async function searchVolumeTasksReady(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/keywords_data/google_ads/search_volume/tasks_ready");
}

export async function searchVolumeTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<any>> {
  return client.get(`/keywords_data/google_ads/search_volume/task_get/${taskId}`);
}
