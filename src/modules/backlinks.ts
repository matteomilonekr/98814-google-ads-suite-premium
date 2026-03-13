import { z } from "zod";
import { DataForSEOClient } from "../client";
import {
  BacklinksSchema,
  BacklinksSummary,
  BacklinkItem,
  BacklinkAnchor,
  ReferringDomain,
  BacklinkCompetitor,
  DataForSEOResponse,
} from "../types";

type BacklinksParams = z.input<typeof BacklinksSchema>;

const BulkBacklinksSchema = z.object({
  targets: z.array(z.string().min(1)).min(1).max(1000),
});

const NewLostSchema = BacklinksSchema.extend({
  date_from: z.string().optional(),
  date_to: z.string().optional(),
});

export async function summary(
  client: DataForSEOClient,
  params: { target: string }
): Promise<DataForSEOResponse<BacklinksSummary>> {
  return client.post("/backlinks/summary/live", [{ target: params.target }]);
}

export async function list(
  client: DataForSEOClient,
  params: BacklinksParams
): Promise<DataForSEOResponse<{ items: BacklinkItem[] }>> {
  const p = BacklinksSchema.parse(params);
  return client.post("/backlinks/backlinks/live", [p]);
}

export async function anchors(
  client: DataForSEOClient,
  params: BacklinksParams
): Promise<DataForSEOResponse<{ items: BacklinkAnchor[] }>> {
  const p = BacklinksSchema.parse(params);
  return client.post("/backlinks/anchors/live", [p]);
}

export async function referringDomains(
  client: DataForSEOClient,
  params: BacklinksParams
): Promise<DataForSEOResponse<{ items: ReferringDomain[] }>> {
  const p = BacklinksSchema.parse(params);
  return client.post("/backlinks/referring_domains/live", [p]);
}

export async function referringNetworks(
  client: DataForSEOClient,
  params: BacklinksParams
): Promise<DataForSEOResponse<any>> {
  const p = BacklinksSchema.parse(params);
  return client.post("/backlinks/referring_networks/live", [p]);
}

export async function competitors(
  client: DataForSEOClient,
  params: BacklinksParams
): Promise<DataForSEOResponse<{ items: BacklinkCompetitor[] }>> {
  const p = BacklinksSchema.parse(params);
  return client.post("/backlinks/competitors/live", [p]);
}

export async function domainPages(
  client: DataForSEOClient,
  params: BacklinksParams
): Promise<DataForSEOResponse<any>> {
  const p = BacklinksSchema.parse(params);
  return client.post("/backlinks/domain_pages/live", [p]);
}

export async function domainPagesSummary(
  client: DataForSEOClient,
  params: { target: string }
): Promise<DataForSEOResponse<any>> {
  return client.post("/backlinks/domain_pages_summary/live", [{ target: params.target }]);
}

export async function newBacklinks(
  client: DataForSEOClient,
  params: z.input<typeof NewLostSchema>
): Promise<DataForSEOResponse<{ items: BacklinkItem[] }>> {
  const p = NewLostSchema.parse(params);
  return client.post("/backlinks/history/live", [{ ...p, type: "new" }]);
}

export async function lostBacklinks(
  client: DataForSEOClient,
  params: z.input<typeof NewLostSchema>
): Promise<DataForSEOResponse<{ items: BacklinkItem[] }>> {
  const p = NewLostSchema.parse(params);
  return client.post("/backlinks/history/live", [{ ...p, type: "lost" }]);
}

export async function bulkBacklinks(
  client: DataForSEOClient,
  params: z.input<typeof BulkBacklinksSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BulkBacklinksSchema.parse(params);
  return client.post("/backlinks/bulk_backlinks/live", [p]);
}

export async function bulkReferringDomains(
  client: DataForSEOClient,
  params: z.input<typeof BulkBacklinksSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BulkBacklinksSchema.parse(params);
  return client.post("/backlinks/bulk_referring_domains/live", [p]);
}

export async function bulkRanks(
  client: DataForSEOClient,
  params: z.input<typeof BulkBacklinksSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BulkBacklinksSchema.parse(params);
  return client.post("/backlinks/bulk_ranks/live", [p]);
}

export async function domainIntersection(
  client: DataForSEOClient,
  params: { targets: Record<string, { target: string }>; limit?: number; filters?: any[]; order_by?: string[] }
): Promise<DataForSEOResponse<any>> {
  return client.post("/backlinks/domain_intersection/live", [{
    targets: params.targets,
    limit: params.limit ?? 100,
    filters: params.filters,
    order_by: params.order_by,
  }]);
}

export async function bulkPagesSummary(
  client: DataForSEOClient,
  params: z.input<typeof BulkBacklinksSchema>
): Promise<DataForSEOResponse<any>> {
  const p = BulkBacklinksSchema.parse(params);
  return client.post("/backlinks/bulk_pages_summary/live", [p]);
}

export async function backlinksIndex(
  client: DataForSEOClient
): Promise<DataForSEOResponse<any>> {
  return client.get("/backlinks/index");
}
