import { z } from "zod";
import { DataForSEOClient } from "../client";
import { ContentGenerationSchema, GeneratedContent, ParaphrasedContent, DataForSEOResponse } from "../types";

type GenerationParams = z.input<typeof ContentGenerationSchema>;

const SubTopicsSchema = z.object({
  topic: z.string().min(1),
  limit: z.number().optional().default(10),
});

const TextSummarySchema = z.object({
  text: z.string().min(1),
  sentences_count: z.number().optional().default(3),
});

const GrammarCheckSchema = z.object({
  text: z.string().min(1),
  language_code: z.string().optional().default("en"),
});

export async function generate(
  client: DataForSEOClient,
  params: GenerationParams
): Promise<DataForSEOResponse<GeneratedContent>> {
  const p = ContentGenerationSchema.parse(params);
  return client.post("/content_generation/generate/live", [p]);
}

export async function generateMeta(
  client: DataForSEOClient,
  params: { text: string; creativity_index?: number }
): Promise<DataForSEOResponse<any>> {
  return client.post("/content_generation/generate_meta_tags/live", [{
    text: params.text,
    creativity_index: params.creativity_index ?? 0.5,
  }]);
}

export async function generateSubTopics(
  client: DataForSEOClient,
  params: z.input<typeof SubTopicsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = SubTopicsSchema.parse(params);
  return client.post("/content_generation/generate_sub_topics/live", [p]);
}

export async function paraphrase(
  client: DataForSEOClient,
  params: { text: string; creativity_index?: number }
): Promise<DataForSEOResponse<ParaphrasedContent>> {
  return client.post("/content_generation/paraphrase/live", [{
    text: params.text,
    creativity_index: params.creativity_index ?? 0.5,
  }]);
}

export async function checkGrammar(
  client: DataForSEOClient,
  params: z.input<typeof GrammarCheckSchema>
): Promise<DataForSEOResponse<any>> {
  const p = GrammarCheckSchema.parse(params);
  return client.post("/content_generation/check_grammar/live", [p]);
}

export async function textSummary(
  client: DataForSEOClient,
  params: z.input<typeof TextSummarySchema>
): Promise<DataForSEOResponse<any>> {
  const p = TextSummarySchema.parse(params);
  return client.post("/content_generation/text_summary/live", [p]);
}
