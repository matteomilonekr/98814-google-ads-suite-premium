import { z } from "zod";
import { DataForSEOClient } from "../client";
import { MerchantSchema, MerchantProduct, DataForSEOResponse } from "../types";

type MerchantParams = z.input<typeof MerchantSchema>;

const ProductIdSchema = z.object({
  product_id: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
});

const AsinSchema = z.object({
  asin: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
});

const SellerSchema = z.object({
  seller_id: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
});

export async function googleShoppingSearch(
  client: DataForSEOClient,
  params: MerchantParams
): Promise<DataForSEOResponse<{ items: MerchantProduct[] }>> {
  const p = MerchantSchema.parse(params);
  return client.post("/merchant/google/products/task_post", [p]);
}

export async function googleShoppingProductInfo(
  client: DataForSEOClient,
  params: z.input<typeof ProductIdSchema>
): Promise<DataForSEOResponse<any>> {
  const p = ProductIdSchema.parse(params);
  return client.post("/merchant/google/product_info/task_post", [p]);
}

export async function googleShoppingSellers(
  client: DataForSEOClient,
  params: z.input<typeof ProductIdSchema>
): Promise<DataForSEOResponse<any>> {
  const p = ProductIdSchema.parse(params);
  return client.post("/merchant/google/sellers/task_post", [p]);
}

export async function googleShoppingProductSpec(
  client: DataForSEOClient,
  params: z.input<typeof ProductIdSchema>
): Promise<DataForSEOResponse<any>> {
  const p = ProductIdSchema.parse(params);
  return client.post("/merchant/google/product_spec/task_post", [p]);
}

export async function amazonSearch(
  client: DataForSEOClient,
  params: MerchantParams
): Promise<DataForSEOResponse<{ items: MerchantProduct[] }>> {
  const p = MerchantSchema.parse(params);
  const { language_code, ...rest } = p;
  return client.post("/merchant/amazon/products/task_post", [{
    ...rest,
    language_code: language_code === "en" ? "en_US" : language_code,
  }]);
}

export async function amazonProductInfo(
  client: DataForSEOClient,
  params: z.input<typeof AsinSchema>
): Promise<DataForSEOResponse<any>> {
  const p = AsinSchema.parse(params);
  const { language_code, ...rest } = p;
  return client.post("/merchant/amazon/asin/task_post", [{
    ...rest,
    language_code: language_code === "en" ? "en_US" : language_code,
  }]);
}

export async function amazonSellers(
  client: DataForSEOClient,
  params: z.input<typeof AsinSchema>
): Promise<DataForSEOResponse<any>> {
  const p = AsinSchema.parse(params);
  const { language_code, ...rest } = p;
  return client.post("/merchant/amazon/sellers/task_post", [{
    ...rest,
    language_code: language_code === "en" ? "en_US" : language_code,
  }]);
}

export async function amazonReviews(
  client: DataForSEOClient,
  params: z.input<typeof AsinSchema>
): Promise<DataForSEOResponse<any>> {
  const p = AsinSchema.parse(params);
  const { language_code, ...rest } = p;
  return client.post("/merchant/amazon/reviews/task_post", [{
    ...rest,
    language_code: language_code === "en" ? "en_US" : language_code,
  }]);
}
