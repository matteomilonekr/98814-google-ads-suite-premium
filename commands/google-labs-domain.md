---
description: Domain intelligence - traffic estimates, keyword portfolio, competitors, subdomains
argument-hint: <domain> [--location <code>] [--language <code>]
---

Comprehensive domain intelligence analysis including traffic, keywords, competitors, and subdomains.

## What to do

1. Read `src/modules/labs.ts` to understand domain intelligence functions
2. Use `labs.domainRankOverview`, `labs.domainCompetitors`, `labs.domainSubdomains` as needed
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, labs } from "./src/index";
const client = createClient();

const overview = await labs.domainRankOverview(client, {
  target: "<domain>",
  location_code: 2840,
  language_code: "en",
});

const competitors = await labs.domainCompetitors(client, {
  target: "<domain>",
  location_code: 2840,
});

const subdomains = await labs.domainSubdomains(client, {
  target: "<domain>",
  location_code: 2840,
});

const keywordsByPage = await labs.domainPagesByKeywords(client, {
  target: "<domain>",
  location_code: 2840,
});

const trafficHistory = await labs.domainMetricsByCategory(client, {
  target: "<domain>",
  location_code: 2840,
});
```

## Output

Present results as:
1. **Domain Overview**: organic traffic estimate, total keywords, domain rank, organic cost equivalent
2. **Traffic Breakdown**: traffic by category, top pages by traffic share
3. **Keyword Portfolio**: total keywords, branded vs non-branded split, position distribution (1-3, 4-10, 11-20, 21+)
4. **Top Competitors**: competing domains with overlap percentage, shared keywords, traffic comparison
5. **Subdomain Analysis**: active subdomains with their traffic and keyword counts
6. **Growth Opportunities**: keywords with high potential where domain underperforms competitors
