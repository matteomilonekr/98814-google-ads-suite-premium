import { z } from "zod";
import { DataForSEOClient } from "../client";
import { BusinessDataSchema, BusinessListing, BusinessReview, DataForSEOResponse } from "../types";

type BusinessParams = z.input<typeof BusinessDataSchema>;

const BusinessIdSchema = z.object({
  business_id: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  sort_by: z.enum(["most_relevant", "newest", "highest_rating", "lowest_rating"]).optional(),
});

const TrustpilotSchema = z.object({
  domain: z.string().min(1),
  limit: z.number().optional().default(100),
});

const TripadvisorSchema = z.object({
  keyword: z.string().min(1),
  location_name: z.string().optional(),
  limit: z.number().optional().default(20),
});

// ── Google My Business ──────────────────────────────────────────────────────

export async function googleBusinessSearch(
  client: DataForSEOClient,
  params: BusinessParams
): Promise<DataForSEOResponse<{ items: BusinessListing[] }>> {
  const p = BusinessDataSchema.parse(params);
  return client.post("/business_data/google/my_business_info/task_post", [p]);
}

export async function googleBusinessReviews(
  client: DataForSEOClient,
  params: z.input<typeof BusinessIdSchema>
): Promise<DataForSEOResponse<{ items: BusinessReview[] }>> {
  const p = BusinessIdSchema.parse(params);
  return client.post("/business_data/google/reviews/task_post", [p]);
}

export async function googleBusinessPhotos(
  client: DataForSEOClient,
  params: z.input<typeof BusinessIdSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BusinessIdSchema.parse(params);
  return client.post("/business_data/google/hotel_info/task_post", [p]);
}

export async function googleQuestionsAndAnswers(
  client: DataForSEOClient,
  params: z.input<typeof BusinessIdSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BusinessIdSchema.parse(params);
  return client.post("/business_data/google/questions_and_answers/task_post", [p]);
}

// ── Trustpilot ──────────────────────────────────────────────────────────────

export async function trustpilotSearch(
  client: DataForSEOClient,
  params: BusinessParams
): Promise<DataForSEOResponse<{ items: BusinessListing[] }>> {
  const p = BusinessDataSchema.parse(params);
  return client.post("/business_data/trustpilot/search/task_post", [p]);
}

export async function trustpilotReviews(
  client: DataForSEOClient,
  params: z.input<typeof TrustpilotSchema>
): Promise<DataForSEOResponse<{ items: BusinessReview[] }>> {
  const p = TrustpilotSchema.parse(params);
  return client.post("/business_data/trustpilot/reviews/task_post", [p]);
}

// ── Tripadvisor ─────────────────────────────────────────────────────────────

export async function tripadvisorSearch(
  client: DataForSEOClient,
  params: z.input<typeof TripadvisorSchema>
): Promise<DataForSEOResponse<{ items: BusinessListing[] }>> {
  const p = TripadvisorSchema.parse(params);
  return client.post("/business_data/tripadvisor/search/task_post", [p]);
}

export async function tripadvisorReviews(
  client: DataForSEOClient,
  params: { url_path: string; limit?: number }
): Promise<DataForSEOResponse<{ items: BusinessReview[] }>> {
  return client.post("/business_data/tripadvisor/reviews/task_post", [{
    url_path: params.url_path,
    limit: params.limit ?? 100,
  }]);
}

// ── Social Media ────────────────────────────────────────────────────────────

export async function socialMediaPinterest(
  client: DataForSEOClient,
  params: BusinessParams
): Promise<DataForSEOResponse<any>> {
  const p = BusinessDataSchema.parse(params);
  return client.post("/business_data/social_media/pinterest/live", [p]);
}

export async function socialMediaReddit(
  client: DataForSEOClient,
  params: BusinessParams
): Promise<DataForSEOResponse<any>> {
  const p = BusinessDataSchema.parse(params);
  return client.post("/business_data/social_media/reddit/live", [p]);
}

// ── Business Listings ──────────────────────────────────────────────────────

const BusinessListingsSchema = z.object({
  categories: z.array(z.string()).optional(),
  description: z.string().optional(),
  title: z.string().optional(),
  is_claimed: z.boolean().optional(),
  location_coordinate: z.string().optional(),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
  limit: z.number().optional().default(20),
  offset: z.number().optional().default(0),
});

export async function businessListingsSearch(
  client: DataForSEOClient,
  params: z.input<typeof BusinessListingsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BusinessListingsSchema.parse(params);
  return client.post("/business_data/business_listings/search/live", [p]);
}

export async function businessListingsCategories(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/business_data/business_listings/categories");
}

export async function businessListingsCategoriesAggregation(
  client: DataForSEOClient,
  params: z.input<typeof BusinessListingsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BusinessListingsSchema.parse(params);
  return client.post("/business_data/business_listings/categories_aggregation/live", [p]);
}

// ── Google locations/languages ─────────────────────────────────────────────

export async function googleBusinessLocations(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/business_data/google/locations");
}

export async function googleBusinessLanguages(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/business_data/google/languages");
}
