import { z } from "zod";
import { DataForSEOClient } from "../client";
import { AIOSchema, AIOSearchResult, DataForSEOResponse } from "../types";

type AIOParams = z.input<typeof AIOSchema>;

const AIOTaskSchema = z.object({
  keyword: z.string().min(1),
  se_type: z.enum(["chatgpt", "claude", "gemini", "perplexity", "copilot"]).optional().default("chatgpt"),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  tag: z.string().optional(),
  postback_url: z.string().optional(),
});

const AIOBulkSchema = z.object({
  keywords: z.array(z.string().min(1)).min(1).max(100),
  se_type: z.enum(["chatgpt", "claude", "gemini", "perplexity", "copilot"]).optional().default("chatgpt"),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
});

export async function chatgptLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/chat_gpt/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function claudeLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/claude/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function geminiLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/gemini/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function perplexityLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/perplexity/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function copilotLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/copilot/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

/**
 * Dispatch to the correct LLM endpoint based on se_type.
 */
export async function queryLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const p = AIOSchema.parse(params);
  const dispatch: Record<string, (c: DataForSEOClient, p: AIOParams) => Promise<DataForSEOResponse<AIOSearchResult>>> = {
    chatgpt: chatgptLive,
    claude: claudeLive,
    gemini: geminiLive,
    perplexity: perplexityLive,
    copilot: copilotLive,
  };
  return dispatch[p.se_type](client, p);
}

export async function taskPost(
  client: DataForSEOClient,
  params: z.input<typeof AIOTaskSchema>
): Promise<DataForSEOResponse<any>> {
  const p = AIOTaskSchema.parse(params);
  const seMap: Record<string, string> = { chatgpt: "chat_gpt", claude: "claude", gemini: "gemini", perplexity: "perplexity", copilot: "copilot" };
  const sePath = seMap[p.se_type] ?? p.se_type;
  return client.post(`/ai_optimization/${sePath}/llm_responses/task_post`, [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
    tag: p.tag,
    postback_url: p.postback_url,
  }]);
}

export async function tasksReady(
  client: DataForSEOClient,
  seType: string = "chatgpt"
): Promise<DataForSEOResponse<any>> {
  const seMap: Record<string, string> = { chatgpt: "chat_gpt", claude: "claude", gemini: "gemini", perplexity: "perplexity", copilot: "copilot" };
  const sePath = seMap[seType] ?? seType;
  return client.get(`/ai_optimization/${sePath}/llm_responses/tasks_ready`);
}

export async function taskGet(
  client: DataForSEOClient,
  seType: string,
  taskId: string
): Promise<DataForSEOResponse<AIOSearchResult>> {
  const seMap: Record<string, string> = { chatgpt: "chat_gpt", claude: "claude", gemini: "gemini", perplexity: "perplexity", copilot: "copilot" };
  const sePath = seMap[seType] ?? seType;
  return client.get(`/ai_optimization/${sePath}/llm_responses/task_get/${taskId}`);
}

/**
 * Query all supported LLMs for a keyword and return combined results.
 */
export async function queryAllLLMs(
  client: DataForSEOClient,
  params: { keyword: string; location_code?: number; language_code?: string }
): Promise<Record<string, DataForSEOResponse<AIOSearchResult>>> {
  const engines = ["chatgpt", "claude", "gemini", "perplexity", "copilot"] as const;
  const results: Record<string, DataForSEOResponse<AIOSearchResult>> = {};

  const promises = engines.map(async (engine) => {
    try {
      results[engine] = await queryLive(client, {
        keyword: params.keyword,
        se_type: engine,
        location_code: params.location_code ?? 2840,
        language_code: params.language_code ?? "en",
      });
    } catch (err) {
      // Some engines may not be available; skip
    }
  });

  await Promise.allSettled(promises);
  return results;
}

// ── LLM Scraper (ChatGPT) ──────────────────────────────────────────────────

export async function scraperChatgptLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/chat_gpt/llm_scraper/live/advanced", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function scraperChatgptHtml(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/chat_gpt/llm_scraper/live/html", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

// ── LLM Scraper (Gemini) ───────────────────────────────────────────────────

export async function scraperGeminiLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/gemini/llm_scraper/live/advanced", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function scraperGeminiHtml(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/gemini/llm_scraper/live/html", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

export async function scraperGeminiTaskPost(
  client: DataForSEOClient,
  params: { keyword: string; location_code?: number; language_code?: string; tag?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/ai_optimization/gemini/llm_scraper/task_post", [{
    keyword: params.keyword,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
    tag: params.tag,
  }]);
}

export async function scraperGeminiTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<any>> {
  return client.get(`/ai_optimization/gemini/llm_scraper/task_get/advanced/${taskId}`);
}

// ── LLM Mentions ───────────────────────────────────────────────────────────

const LlmMentionsSchema = z.object({
  target: z.string().min(1),
  location_code: z.number().optional().default(2840),
  language_code: z.string().optional().default("en"),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

export async function llmMentionsSearch(
  client: DataForSEOClient,
  params: z.input<typeof LlmMentionsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = LlmMentionsSchema.parse(params);
  return client.post("/ai_optimization/llm_mentions/search/live", [p]);
}

export async function llmMentionsTopPages(
  client: DataForSEOClient,
  params: z.input<typeof LlmMentionsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = LlmMentionsSchema.parse(params);
  return client.post("/ai_optimization/llm_mentions/top_pages/live", [p]);
}

export async function llmMentionsTopDomains(
  client: DataForSEOClient,
  params: z.input<typeof LlmMentionsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = LlmMentionsSchema.parse(params);
  return client.post("/ai_optimization/llm_mentions/top_domains/live", [p]);
}

export async function llmMentionsCrossAggregated(
  client: DataForSEOClient,
  params: z.input<typeof LlmMentionsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = LlmMentionsSchema.parse(params);
  return client.post("/ai_optimization/llm_mentions/cross_aggregated_metrics/live", [p]);
}

export async function llmMentionsAggregated(
  client: DataForSEOClient,
  params: z.input<typeof LlmMentionsSchema>
): Promise<DataForSEOResponse<any>> {
  const p = LlmMentionsSchema.parse(params);
  return client.post("/ai_optimization/llm_mentions/aggregated_metrics/live", [p]);
}

export async function llmMentionsLocations(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/ai_optimization/llm_mentions/locations_and_languages");
}

// ── AI Keyword Data ────────────────────────────────────────────────────────

export async function aiKeywordSearchVolume(
  client: DataForSEOClient,
  params: { keywords: string[]; location_code?: number; language_code?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/ai_optimization/ai_keyword_data/keywords_search_volume/live", [{
    keywords: params.keywords,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
  }]);
}

// ── ChatGPT Task-Based ─────────────────────────────────────────────────────

export async function chatgptResponsesTaskPost(
  client: DataForSEOClient,
  params: { keyword: string; location_code?: number; language_code?: string; tag?: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/ai_optimization/chat_gpt/llm_responses/task_post", [{
    keyword: params.keyword,
    location_code: params.location_code ?? 2840,
    language_code: params.language_code ?? "en",
    tag: params.tag,
  }]);
}

export async function chatgptResponsesTaskGet(
  client: DataForSEOClient,
  taskId: string
): Promise<DataForSEOResponse<any>> {
  return client.get(`/ai_optimization/chat_gpt/llm_responses/task_get/${taskId}`);
}

export async function chatgptResponsesModels(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/ai_optimization/chat_gpt/llm_responses/models");
}

// ── Gemini Responses ───────────────────────────────────────────────────────

export async function geminiResponsesLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/gemini/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

// ── Claude Responses ───────────────────────────────────────────────────────

export async function claudeResponsesLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/claude/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}

// ── Perplexity Responses ───────────────────────────────────────────────────

export async function perplexityResponsesLive(
  client: DataForSEOClient,
  params: AIOParams
): Promise<DataForSEOResponse<any>> {
  const p = AIOSchema.parse(params);
  return client.post("/ai_optimization/perplexity/llm_responses/live", [{
    keyword: p.keyword,
    location_code: p.location_code,
    language_code: p.language_code,
  }]);
}
