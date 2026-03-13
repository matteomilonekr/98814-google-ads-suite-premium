---
name: seo:keyword-trends
description: Google Trends, ad traffic history, seasonal analysis for keywords
argument-hint: <keyword> [--period 12m|24m|5y] [--location <code>] [--compare <keyword2>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze keyword trends over time including Google Trends data, ad traffic history, and seasonal patterns.

## What to do

1. Read `src/modules/keywords.ts` to understand trend functions
2. Use `keywords.googleTrends`, `keywords.adTrafficHistory`, `keywords.searchVolumeHistory` as needed
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--period` (default 12m), `--location` (default 2840), `--compare` for comparison keyword

## Execution

```typescript
import { createClient, keywords } from "./src/index";
const client = createClient();

const trends = await keywords.googleTrends(client, {
  keywords: ["<keyword>"],
  location_code: 2840,
});

const adTraffic = await keywords.adTrafficHistory(client, {
  keywords: ["<keyword>"],
  location_code: 2840,
});

const volumeHistory = await keywords.searchVolumeHistory(client, {
  keywords: ["<keyword>"],
  location_code: 2840,
});
```

## Output

Present results as:
1. **Trend Overview**: current interest level, trend direction (rising/stable/declining), YoY change
2. **Monthly Volume History**: search volume per month with visual trend line
3. **Seasonal Patterns**: peak months, low months, seasonal index
4. **Ad Traffic History**: CPC and competition changes over time
5. **Comparison** (if --compare): side-by-side trend analysis with correlation
6. **Forecast**: projected search volume for next 3-6 months based on historical patterns
