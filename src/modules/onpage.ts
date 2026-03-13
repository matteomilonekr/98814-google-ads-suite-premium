import { z } from "zod";
import { DataForSEOClient } from "../client";
import {
  OnPageTaskSchema,
  OnPageTaskResult,
  OnPageSummary,
  OnPagePage,
  DataForSEOResponse,
} from "../types";

type TaskParams = z.input<typeof OnPageTaskSchema>;

const TaskIdSchema = z.object({ id: z.string().min(1) });

const PagesSchema = z.object({
  id: z.string().min(1),
  limit: z.number().optional().default(100),
  offset: z.number().optional().default(0),
  filters: z.array(z.any()).optional(),
  order_by: z.array(z.string()).optional(),
});

export async function taskPost(
  client: DataForSEOClient,
  params: TaskParams
): Promise<DataForSEOResponse<OnPageTaskResult>> {
  const p = OnPageTaskSchema.parse(params);
  return client.post("/on_page/task_post", [p]);
}

export async function tasksReady(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/on_page/tasks_ready");
}

export async function taskSummary(
  client: DataForSEOClient,
  params: z.input<typeof TaskIdSchema>
): Promise<DataForSEOResponse<OnPageSummary>> {
  const p = TaskIdSchema.parse(params);
  return client.get(`/on_page/summary/${p.id}`);
}

export async function pages(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<{ items: OnPagePage[] }>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/pages", [p]);
}

export async function pagesByResource(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/pages_by_resource", [p]);
}

export async function nonIndexable(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/non_indexable", [p]);
}

export async function duplicateTags(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/duplicate_tags", [p]);
}

export async function duplicateContent(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/duplicate_content", [p]);
}

export async function links(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/links", [p]);
}

export async function redirectChains(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/redirect_chains", [p]);
}

export async function rawHtml(
  client: DataForSEOClient,
  params: { id: string; url: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/raw_html", [params]);
}

export async function waterfall(
  client: DataForSEOClient,
  params: { id: string; url: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/waterfall", [params]);
}

/**
 * High-level: start a crawl and wait for it to complete, then return summary.
 */
export async function crawlAndSummarize(
  client: DataForSEOClient,
  params: TaskParams,
  options: { pollIntervalMs?: number; maxAttempts?: number } = {}
): Promise<OnPageSummary | null> {
  const { pollIntervalMs = 10000, maxAttempts = 60 } = options;

  const taskResponse = await taskPost(client, params);
  const taskId = taskResponse.tasks?.[0]?.id;
  if (!taskId) throw new Error("No task ID returned");

  for (let i = 0; i < maxAttempts; i++) {
    await new Promise((r) => setTimeout(r, pollIntervalMs));
    const summaryResp = await taskSummary(client, { id: taskId });
    const result = summaryResp.tasks?.[0]?.result?.[0];
    if (result?.crawl_progress === "finished") {
      return result;
    }
  }

  throw new Error(`Crawl did not finish in time for task ${taskId}`);
}

// ── Lighthouse ─────────────────────────────────────────────────────────────

export async function lighthouseLiveJson(
  client: DataForSEOClient,
  params: { url: string; for_mobile?: boolean; categories?: string[] }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/lighthouse/live/json", [{
    url: params.url,
    for_mobile: params.for_mobile ?? false,
    categories: params.categories,
  }]);
}

// ── Content Parsing ────────────────────────────────────────────────────────

export async function contentParsing(
  client: DataForSEOClient,
  params: { url: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/content_parsing/live", [{
    url: params.url,
  }]);
}

// ── Resources ──────────────────────────────────────────────────────────────

export async function resources(
  client: DataForSEOClient,
  params: z.input<typeof PagesSchema>
): Promise<DataForSEOResponse<any>> {
  const p = PagesSchema.parse(params);
  return client.post("/on_page/resources", [p]);
}

// ── Page Screenshot ────────────────────────────────────────────────────────

export async function pageScreenshot(
  client: DataForSEOClient,
  params: { url: string; full_page?: boolean; for_mobile?: boolean }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/page_screenshot", [{
    url: params.url,
    full_page: params.full_page ?? true,
    for_mobile: params.for_mobile ?? false,
  }]);
}

// ── Instant Pages ──────────────────────────────────────────────────────────

export async function instantPages(
  client: DataForSEOClient,
  params: { url: string; enable_javascript?: boolean }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/instant_pages", [{
    url: params.url,
    enable_javascript: params.enable_javascript ?? true,
  }]);
}

// ── Force Stop ─────────────────────────────────────────────────────────────

export async function forceStop(
  client: DataForSEOClient,
  params: { id: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/on_page/force_stop", [{ id: params.id }]);
}
