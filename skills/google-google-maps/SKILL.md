---
name: seo:google-maps
description: Google Maps and local pack SERP analysis - local rankings, Maps results, business listings
argument-hint: <keyword> [--location <code>] [--device desktop|mobile] [--language <code>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze Google Maps SERP results for a keyword to understand local pack rankings and business listings.

## What to do

1. Read `src/modules/serp.ts` to understand available Maps functions
2. Use `serp.googleMapsLive` for local pack and Maps results
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--device` (default desktop), `--language` (default en)

## Execution

```typescript
import { createClient, serp } from "./src/index";
const client = createClient();
const resp = await serp.googleMapsLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
  device: "desktop",
  language_code: "en",
});
```

## Output

Present results as:
1. **Local Pack Overview**: total results, map center coordinates, zoom level
2. **Top Local Results**: rank, business name, address, rating, reviews count, category
3. **Rating Distribution**: average ratings, review volume across results
4. **Competitive Landscape**: which businesses dominate for this query, clustering by category
