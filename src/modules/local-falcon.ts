import axios, { AxiosInstance } from "axios";
import { z } from "zod";
import { LocalFalconSchema, LocalFalconGridResult, LocalFalconPoint } from "../types";

type GridParams = z.input<typeof LocalFalconSchema>;

const LOCAL_FALCON_BASE = "https://api.localfalcon.com/v2";

export class LocalFalconClient {
  private http: AxiosInstance;

  constructor(apiKey: string) {
    this.http = axios.create({
      baseURL: LOCAL_FALCON_BASE,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      timeout: 60_000,
    });
  }

  async gridSearch(params: GridParams): Promise<LocalFalconGridResult> {
    const p = LocalFalconSchema.parse(params);
    const response = await this.http.post("/grid-search", p);
    return response.data;
  }

  async gridSearchHistory(params: {
    keyword: string;
    lat: number;
    lng: number;
    limit?: number;
  }): Promise<any> {
    const response = await this.http.post("/grid-search/history", {
      keyword: params.keyword,
      lat: params.lat,
      lng: params.lng,
      limit: params.limit ?? 10,
    });
    return response.data;
  }

  async getLocations(params: {
    keyword: string;
    lat: number;
    lng: number;
    radius?: number;
  }): Promise<any> {
    const response = await this.http.post("/locations", params);
    return response.data;
  }

  async getGridPoints(gridSize: string): Promise<any> {
    const response = await this.http.get(`/grid-points/${gridSize}`);
    return response.data;
  }

  async getRankHistory(params: {
    place_id: string;
    keyword: string;
    lat: number;
    lng: number;
  }): Promise<any> {
    const response = await this.http.post("/rank-history", params);
    return response.data;
  }

  async getScanCredits(): Promise<any> {
    const response = await this.http.get("/credits");
    return response.data;
  }
}

/**
 * Create a Local Falcon client from environment variables.
 */
export function createLocalFalconClient(): LocalFalconClient {
  const apiKey = process.env.LOCAL_FALCON_API_KEY;
  if (!apiKey) {
    throw new Error("LOCAL_FALCON_API_KEY environment variable is required");
  }
  return new LocalFalconClient(apiKey);
}

/**
 * Analyze grid results to identify ranking patterns.
 */
export function analyzeGridResults(result: LocalFalconGridResult): {
  averageRank: number | null;
  rankedPoints: number;
  totalPoints: number;
  topRankPercentage: number;
  weakSpots: LocalFalconPoint[];
} {
  const points = result.points;
  const rankedPoints = points.filter((p) => p.rank !== null);
  const ranks = rankedPoints.map((p) => p.rank as number);

  return {
    averageRank: ranks.length > 0 ? ranks.reduce((a, b) => a + b, 0) / ranks.length : null,
    rankedPoints: rankedPoints.length,
    totalPoints: points.length,
    topRankPercentage: ranks.length > 0
      ? (ranks.filter((r) => r <= 3).length / ranks.length) * 100
      : 0,
    weakSpots: points.filter((p) => p.rank === null || p.rank > 10),
  };
}
