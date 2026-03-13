---
name: seo:other-engines
description: Multi-engine SERP analysis - Bing, Yahoo, Baidu, Google Ads SERP
argument-hint: <keyword> [--engine bing|yahoo|baidu|google-ads] [--location <code>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze search engine results across Bing, Yahoo, Baidu, and Google Ads SERP.

## What to do

1. Read `src/modules/serp.ts` to understand multi-engine SERP functions
2. Query the specified engine or all engines if no `--engine` flag
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--engine` (default: all), `--location` (default 2840)

## Execution

```typescript
import { createClient, serp } from "./src/index";
const client = createClient();

// Bing organic
const bing = await serp.bingOrganicLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Yahoo organic
const yahoo = await serp.yahooOrganicLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Baidu organic
const baidu = await serp.baiduOrganicLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Google Ads SERP
const gads = await serp.googleAdsSearchLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});
```

## Output

Present results as:
1. **Cross-Engine Comparison**: top 10 results per engine side-by-side
2. **Ranking Differences**: domains that rank differently across engines
3. **Engine-Specific Features**: unique SERP features per engine
4. **Google Ads SERP**: paid ad positions, ad copy, display URLs
5. **Opportunities**: untapped engines where competitors are weak
