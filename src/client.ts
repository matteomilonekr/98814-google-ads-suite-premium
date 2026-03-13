import axios, { AxiosInstance, AxiosError } from "axios";
import { DataForSEOCredentials, DataForSEOResponse } from "./types";

const BASE_URL = "https://api.dataforseo.com/v3";

export class DataForSEOClient {
  private http: AxiosInstance;

  constructor(credentials: DataForSEOCredentials) {
    const token = Buffer.from(
      `${credentials.login}:${credentials.password}`
    ).toString("base64");

    this.http = axios.create({
      baseURL: BASE_URL,
      headers: {
        Authorization: `Basic ${token}`,
        "Content-Type": "application/json",
      },
      timeout: 120_000,
    });
  }

  async post<T = any>(
    endpoint: string,
    data: Record<string, any>[]
  ): Promise<DataForSEOResponse<T>> {
    try {
      const response = await this.http.post<DataForSEOResponse<T>>(
        endpoint,
        data
      );
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async get<T = any>(endpoint: string): Promise<DataForSEOResponse<T>> {
    try {
      const response = await this.http.get<DataForSEOResponse<T>>(endpoint);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Post a task, then poll until ready, then fetch results.
   */
  async postAndPoll<T = any>(
    postEndpoint: string,
    getEndpoint: (taskId: string) => string,
    data: Record<string, any>[],
    options: { pollIntervalMs?: number; maxPollAttempts?: number } = {}
  ): Promise<DataForSEOResponse<T>> {
    const { pollIntervalMs = 5000, maxPollAttempts = 60 } = options;

    const postResponse = await this.post(postEndpoint, data);
    const taskId = postResponse.tasks?.[0]?.id;
    if (!taskId) {
      throw new Error("No task ID returned from POST request");
    }

    for (let attempt = 0; attempt < maxPollAttempts; attempt++) {
      await this.sleep(pollIntervalMs);
      const readyResponse = await this.get("serp/tasks_ready");
      const ready = readyResponse.tasks?.[0]?.result?.find(
        (r: any) => r.id === taskId
      );
      if (ready) {
        return this.get<T>(getEndpoint(taskId));
      }
    }

    throw new Error(
      `Task ${taskId} did not complete within ${maxPollAttempts * pollIntervalMs}ms`
    );
  }

  private handleError(error: unknown): Error {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message =
        error.response?.data?.status_message || error.message;
      return new Error(`DataForSEO API error (${status}): ${message}`);
    }
    if (error instanceof Error) return error;
    return new Error(String(error));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Create a client from environment variables.
 */
export function createClient(): DataForSEOClient {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    throw new Error(
      "DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD environment variables are required"
    );
  }
  return new DataForSEOClient({ login, password });
}
