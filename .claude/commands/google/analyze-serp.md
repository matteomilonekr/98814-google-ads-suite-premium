---
name: seo:analyze-serp
description: Analyze SERP for a keyword - shows rankings, SERP features, and top competitors
argument-hint: <keyword> [--location <code>] [--device desktop|mobile]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze the search engine results page for the given keyword using the DataForSEO SERP API.

## What to do

1. Read `src/modules/serp.ts` to understand available functions
2. Use `serp.googleOrganicLiveAdvanced` for full SERP feature data
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--device` (default desktop)

## Execution

```typescript
import { createClient, serp } from "./src/index";
const client = createClient();
const resp = await serp.googleOrganicLiveAdvanced(client, {
  keyword: "<keyword>",
  location_code: 2840,
  device: "desktop",
});
```

## Output

Present results as:
1. **SERP Overview**: total results count, SERP features detected (featured snippet, knowledge panel, PAA, local pack, ads)
2. **Top 10 Organic Results**: rank, domain, title, URL
3. **SERP Feature Analysis**: which features appear and their content
4. **Competitive Landscape**: which domains dominate, authority indicators
