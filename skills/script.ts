import fs from "fs";
import path from "path";
import { createClient, domainAnalytics } from "../../../src/index";

const OUTPUT_DIR = path.join(__dirname, "output");

async function main() {
  const target = process.argv[2] ?? "example.com";

  const client = createClient();

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  console.log(`Fetching WHOIS data for: "${target}"`);
  const result = await domainAnalytics.whoisLookup(client, { target });
  fs.writeFileSync(
    path.join(OUTPUT_DIR, "whois.json"),
    JSON.stringify(result, null, 2)
  );
  console.log("Saved whois.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
