---
name: seo:local-rankings
description: Check local search rankings for a business in Google Maps
argument-hint: <business_name> --keywords <kw1> <kw2> [--location <code>] [--falcon --lat <n> --lng <n>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Check local search rankings and business listing presence.

## What to do

1. Parse business name and keywords from $ARGUMENTS
2. Follow the local-seo-agent process (see `.claude/agents/local-seo-agent.md`)
3. Modules: `src/modules/business-data.ts`, `src/modules/serp.ts`, `src/modules/local-falcon.ts`
4. Optional: `--falcon` with `--lat`/`--lng` for grid analysis

## Execution Steps

1. Search for business: `businessData.googleBusinessSearch`
2. Get reviews if found: `businessData.googleBusinessReviews`
3. Check Maps rankings per keyword: `serp.googleMapsLive`
4. If `--falcon`: run Local Falcon grid analysis (requires LOCAL_FALCON_API_KEY)

## Output

1. **Business Listing**: found/not found, rating, reviews count
2. **Reviews Summary**: average rating, distribution, recent reviews
3. **Maps Rankings**: position per keyword with local competitors
4. **Grid Analysis** (if falcon enabled): geographic ranking coverage
5. **Recommendations**: actions to improve local visibility
