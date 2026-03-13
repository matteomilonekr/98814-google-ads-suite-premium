---
name: seo:dashboard
description: Interactive dashboards via Graphed MCP - SEO, Ads, and performance visualizations
argument-hint: --type <seo|ads|backlinks|keywords|performance> --domain <domain> [--period 7d|30d|90d]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Generate interactive dashboards for SEO, Google Ads, backlinks, keywords, and performance metrics using Graphed MCP.

## What to do

1. Read available dashboard skill files for reference data gathering patterns
2. Collect data using the appropriate DataForSEO modules based on `--type`
3. Parse required flags: `--type` (dashboard type), `--domain` (target domain)
4. Optional flag: `--period` (default 30d)

## Execution

Depending on `--type`, gather the relevant data:

```typescript
import { createClient, labs, backlinks, keywords, onpage } from "./src/index";
const client = createClient();

// For SEO dashboard
const domainOverview = await labs.domainRankOverview(client, { target: "<domain>" });
const keywordData = await keywords.keywordsForSite(client, { target: "<domain>" });
const backlinkProfile = await backlinks.summary(client, { target: "<domain>" });

// For Ads dashboard — use Google Ads MCP tools
// For Backlinks dashboard — use backlinks module
// For Keywords dashboard — use keywords + labs modules
// For Performance dashboard — use onpage module (Lighthouse, CWV)
```

## Dashboard Types

- **seo**: Domain rank, organic traffic, keyword positions, visibility trend
- **ads**: Campaign performance, spend, ROAS, conversion trends
- **backlinks**: Link velocity, referring domains growth, authority distribution
- **keywords**: Position tracking, volume trends, SERP feature presence
- **performance**: Core Web Vitals, Lighthouse scores, page speed trends

## Output

Present results as:
1. **Dashboard Summary**: key metrics overview with trend indicators
2. **Time Series Charts**: metric trends over the selected period (described as data tables)
3. **Distribution Charts**: breakdowns by category, type, or segment
4. **Comparison Tables**: current vs previous period with delta and percentage change
5. **Alert Indicators**: metrics that crossed thresholds (positive or negative)
6. **Export Data**: structured JSON/CSV-ready data for further visualization
