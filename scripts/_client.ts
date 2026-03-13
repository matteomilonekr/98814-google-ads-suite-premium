import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";
import { createClient, DataForSEOClient } from "../src/client";

// Load .env from project root
config({ path: path.resolve(__dirname, "../.env") });

/**
 * Initialize the DataForSEO client from environment variables.
 */
export function initClient(): DataForSEOClient {
  return createClient();
}

/**
 * Save a JSON result to scripts/output/{name}.json
 */
export function saveResult(name: string, data: unknown): void {
  const outputDir = path.resolve(__dirname, "output", path.dirname(name));
  fs.mkdirSync(outputDir, { recursive: true });
  const filePath = path.resolve(__dirname, "output", `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log(`\nResult saved to: ${filePath}`);
}

/**
 * Get CLI arguments (everything after the script name).
 * Returns positional args array.
 */
export function getArgs(): string[] {
  return process.argv.slice(2);
}

/**
 * Print a compact summary of a DataForSEO response.
 */
export function printSummary(response: any): void {
  console.log(`Status: ${response.status_code} - ${response.status_message}`);
  console.log(`Cost: $${response.cost}`);
  console.log(`Time: ${response.time}`);
  const task = response.tasks?.[0];
  if (task) {
    console.log(`Task status: ${task.status_code} - ${task.status_message}`);
    console.log(`Results count: ${task.result_count ?? 0}`);
  }
}
