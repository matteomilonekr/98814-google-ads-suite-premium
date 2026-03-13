import { z } from "zod";
import { DataForSEOClient } from "../client";
import { ContentAnalysisSchema, ContentAnalysisResult, DataForSEOResponse } from "../types";

type AnalysisParams = z.input<typeof ContentAnalysisSchema>;

const SummarySchema = z.object({
  keyword: z.string().min(1),
  page_type: z.array(z.string()).optional(),
  internal_list_limit: z.number().optional().default(10),
});

const RatingSchema = z.object({
  keyword: z.string().min(1),
  page_type: z.array(z.string()).optional(),
  limit: z.number().optional().default(10),
  order_by: z.array(z.string()).optional(),
});

const SentimentSchema = z.object({
  keyword: z.string().min(1),
  page_type: z.array(z.string()).optional(),
  limit: z.number().optional().default(10),
  initial_dataset_filters: z.array(z.any()).optional(),
});

const CategorySchema = z.object({
  keyword: z.string().optional(),
  page_type: z.array(z.string()).optional(),
  limit: z.number().optional().default(10),
});

export async function search(
  client: DataForSEOClient,
  params: AnalysisParams
): Promise<DataForSEOResponse<{ items: ContentAnalysisResult[] }>> {
  const p = ContentAnalysisSchema.parse(params);
  return client.post("/content_analysis/search/live", [p]);
}

export async function contentSummary(
  client: DataForSEOClient,
  params: z.input<typeof SummarySchema>
): Promise<DataForSEOResponse<any>> {
  const p = SummarySchema.parse(params);
  return client.post("/content_analysis/summary/live", [p]);
}

export async function sentimentAnalysis(
  client: DataForSEOClient,
  params: z.input<typeof SentimentSchema>
): Promise<DataForSEOResponse<any>> {
  const p = SentimentSchema.parse(params);
  return client.post("/content_analysis/sentiment_analysis/live", [p]);
}

export async function ratingDistribution(
  client: DataForSEOClient,
  params: z.input<typeof RatingSchema>
): Promise<DataForSEOResponse<any>> {
  const p = RatingSchema.parse(params);
  return client.post("/content_analysis/rating_distribution/live", [p]);
}

export async function phrasesTrends(
  client: DataForSEOClient,
  params: z.input<typeof SentimentSchema>
): Promise<DataForSEOResponse<any>> {
  const p = SentimentSchema.parse(params);
  return client.post("/content_analysis/phrases_trends/live", [p]);
}

export async function categoryTrends(
  client: DataForSEOClient,
  params: z.input<typeof CategorySchema>
): Promise<DataForSEOResponse<any>> {
  const p = CategorySchema.parse(params);
  return client.post("/content_analysis/category_trends/live", [p]);
}

export async function availableCategories(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/content_analysis/categories");
}

export async function availableLocations(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/content_analysis/locations");
}

export async function availableLanguages(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/content_analysis/languages");
}
