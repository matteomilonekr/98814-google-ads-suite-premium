import { z } from "zod";
import { DataForSEOClient } from "../client";
import { SerpLiveSchema, SerpResult, SerpTaskResult, DataForSEOResponse } from "../types";

type SerpLiveParams = z.input<typeof SerpLiveSchema>;

// ── Live endpoints ──────────────────────────────────────────────────────────

export async function googleOrganicLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/organic/live/regular", [p]);
}

export async function googleOrganicLiveAdvanced(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/organic/live/advanced", [p]);
}

export async function googleMapsLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/maps/live/advanced", [p]);
}

export async function googleImagesLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/images/live/advanced", [p]);
}

export async function googleNewsLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/news/live/advanced", [p]);
}

export async function googleJobsLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/jobs/live/advanced", [p]);
}

/**
 * Note: Google Shopping doesn't have a dedicated SERP endpoint.
 * Shopping results appear within organic SERP (as shopping items).
 * For dedicated shopping data, use merchant.googleShoppingSearch() instead.
 * This function queries organic SERP and the result may include shopping items.
 */
export async function googleShoppingLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/organic/live/advanced", [p]);
}

export async function bingOrganicLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/bing/organic/live/regular", [p]);
}

export async function yahooOrganicLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/yahoo/organic/live/regular", [p]);
}

// ── Task-based endpoints ────────────────────────────────────────────────────

export async function googleOrganicTaskPost(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpTaskResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/organic/task_post", [p]);
}

export async function serpTasksReady(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/serp/google/organic/tasks_ready");
}

export async function googleOrganicTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<SerpResult>> {
  return client.get(`/serp/google/organic/task_get/regular/${taskId}`);
}

/**
 * Convenience: post a task and poll until results are available.
 */
export async function googleOrganicTaskPostAndGet(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.postAndPoll(
    "/serp/google/organic/task_post",
    (id) => `/serp/google/organic/task_get/regular/${id}`,
    [p]
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Extract top N organic results from a SERP response.
 */
export function extractTopOrganic(
  response: DataForSEOResponse<SerpResult>,
  topN: number = 10
): SerpOrganicItem[] {
  const items = response.tasks?.[0]?.result?.[0]?.items ?? [];
  return items
    .filter((i: any) => i.type === "organic")
    .slice(0, topN);
}

import { SerpOrganicItem } from "../types";

/**
 * Get available SERP locations.
 */
export async function serpLocations(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/serp/google/locations");
}

/**
 * Get available SERP languages.
 */
export async function serpLanguages(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/serp/google/languages");
}

// ── Google Events ──────────────────────────────────────────────────────────

export async function googleEventsLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/events/live/advanced", [p]);
}

// ── Google Local Finder ────────────────────────────────────────────────────

export async function googleLocalFinderLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/local_finder/live/advanced", [p]);
}

// ── Google AI Mode ─────────────────────────────────────────────────────────

export async function googleAiModeLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/ai_mode/live/advanced", [p]);
}

// ── Google Autocomplete ────────────────────────────────────────────────────

export async function googleAutocompleteLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/autocomplete/live/advanced", [p]);
}

// ── Google Finance ─────────────────────────────────────────────────────────

export async function googleFinanceExploreLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/finance_explore/live/advanced", [p]);
}

export async function googleFinanceMarketsLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/finance_markets/live/advanced", [p]);
}

export async function googleFinanceQuoteLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/finance_quote/live/advanced", [p]);
}

export async function googleFinanceTickerSearchLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/finance_ticker_search/live/advanced", [p]);
}

// ── Google Dataset Search ──────────────────────────────────────────────────

export async function googleDatasetSearchLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/dataset_search/live/advanced", [p]);
}

export async function googleDatasetInfoLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/dataset_info/live/advanced", [p]);
}

// ── Google Search by Image ─────────────────────────────────────────────────

export async function googleSearchByImageTaskPost(
  client: DataForSEOClient,
  params: { image_url: string; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<SerpTaskResult>> {
  return client.post("/serp/google/search_by_image/task_post", [{
    image_url: params.image_url,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

export async function googleSearchByImageTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<SerpResult>> {
  return client.get(`/serp/google/search_by_image/task_get/advanced/${taskId}`);
}

// ── Google Ads Search ──────────────────────────────────────────────────────

export async function googleAdsSearchLive(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/google/ads_search/live/advanced", [p]);
}

// ── Google Ads Advertisers ─────────────────────────────────────────────────

export async function googleAdsAdvertisersLive(
  client: DataForSEOClient,
  params: { advertiser_id?: string; keyword?: string; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<SerpResult>> {
  return client.post("/serp/google/ads_advertisers/live/advanced", [{
    advertiser_id: params.advertiser_id,
    keyword: params.keyword,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

// ── YouTube ────────────────────────────────────────────────────────────────

export async function youtubeOrganicTaskPost(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpTaskResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/youtube/organic/task_post", [p]);
}

export async function youtubeOrganicTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<SerpResult>> {
  return client.get(`/serp/youtube/organic/task_get/advanced/${taskId}`);
}

export async function youtubeVideoInfoTaskPost(
  client: DataForSEOClient,
  params: { video_id: string; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<SerpTaskResult>> {
  return client.post("/serp/youtube/video_info/task_post", [{
    video_id: params.video_id,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

export async function youtubeVideoInfoTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<any>> {
  return client.get(`/serp/youtube/video_info/task_get/advanced/${taskId}`);
}

export async function youtubeVideoCommentsTaskPost(
  client: DataForSEOClient,
  params: { video_id: string; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<SerpTaskResult>> {
  return client.post("/serp/youtube/video_comments/task_post", [{
    video_id: params.video_id,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

export async function youtubeVideoCommentsTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<any>> {
  return client.get(`/serp/youtube/video_comments/task_get/advanced/${taskId}`);
}

export async function youtubeVideoSubtitlesLive(
  client: DataForSEOClient,
  params: { video_id: string; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/serp/youtube/video_subtitles/live/advanced", [{
    video_id: params.video_id,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

// ── Baidu ──────────────────────────────────────────────────────────────────

export async function baiduOrganicTaskPost(
  client: DataForSEOClient,
  params: SerpLiveParams
): Promise<DataForSEOResponse<SerpTaskResult>> {
  const p = SerpLiveSchema.parse(params);
  return client.post("/serp/baidu/organic/task_post", [p]);
}

export async function baiduOrganicTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<SerpResult>> {
  return client.get(`/serp/baidu/organic/task_get/advanced/${taskId}`);
}

// ── SERP Utilities ─────────────────────────────────────────────────────────

export async function serpIdList(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/serp/id_list");
}

export async function serpScreenshot(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<any>> {
  return client.get(`/serp/screenshot/${taskId}`);
}
