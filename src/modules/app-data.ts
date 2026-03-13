import { z } from "zod";
import { DataForSEOClient } from "../client";
import { AppDataSchema, AppInfo, AppReview, DataForSEOResponse } from "../types";

type AppParams = z.input<typeof AppDataSchema>;

const AppSearchSchema = z.object({
  keyword: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
});

const AppListSchema = z.object({
  category: z.string().optional(),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
});

const AppReviewSchema = z.object({
  app_id: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  sort_by: z.enum(["most_relevant", "newest"]).optional().default("most_relevant"),
});

// ── Google Play ─────────────────────────────────────────────────────────────

export async function googlePlaySearch(
  client: DataForSEOClient,
  params: z.input<typeof AppSearchSchema>
): Promise<DataForSEOResponse<{ items: AppInfo[] }>> {
  const p = AppSearchSchema.parse(params);
  return client.post("/app_data/google/app_searches/task_post", [p]);
}

export async function googlePlayInfo(
  client: DataForSEOClient,
  params: AppParams
): Promise<DataForSEOResponse<AppInfo>> {
  const p = AppDataSchema.parse(params);
  return client.post("/app_data/google/app_info/task_post", [p]);
}

export async function googlePlayReviews(
  client: DataForSEOClient,
  params: z.input<typeof AppReviewSchema>
): Promise<DataForSEOResponse<{ items: AppReview[] }>> {
  const p = AppReviewSchema.parse(params);
  return client.post("/app_data/google/app_reviews/task_post", [p]);
}

export async function googlePlayList(
  client: DataForSEOClient,
  params: z.input<typeof AppListSchema>
): Promise<DataForSEOResponse<{ items: AppInfo[] }>> {
  const p = AppListSchema.parse(params);
  return client.post("/app_data/google/app_list/task_post", [p]);
}

export async function googlePlayCategories(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/app_data/google/categories");
}

// ── App Store ───────────────────────────────────────────────────────────────

export async function appStoreSearch(
  client: DataForSEOClient,
  params: z.input<typeof AppSearchSchema>
): Promise<DataForSEOResponse<{ items: AppInfo[] }>> {
  const p = AppSearchSchema.parse(params);
  return client.post("/app_data/apple/app_searches/task_post", [p]);
}

export async function appStoreInfo(
  client: DataForSEOClient,
  params: AppParams
): Promise<DataForSEOResponse<AppInfo>> {
  const p = AppDataSchema.parse(params);
  return client.post("/app_data/apple/app_info/task_post", [p]);
}

export async function appStoreReviews(
  client: DataForSEOClient,
  params: z.input<typeof AppReviewSchema>
): Promise<DataForSEOResponse<{ items: AppReview[] }>> {
  const p = AppReviewSchema.parse(params);
  return client.post("/app_data/apple/app_reviews/task_post", [p]);
}

export async function appStoreList(
  client: DataForSEOClient,
  params: z.input<typeof AppListSchema>
): Promise<DataForSEOResponse<{ items: AppInfo[] }>> {
  const p = AppListSchema.parse(params);
  return client.post("/app_data/apple/app_list/task_post", [p]);
}

export async function appStoreCategories(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/app_data/apple/categories");
}
