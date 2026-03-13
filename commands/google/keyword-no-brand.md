---
description: Collect non-brand keywords for a domain - keywords NOT containing the brand name
argument-hint: <domain> [--brand <name>] [--location <code>] [--language <code>] [--limit <n>]
---

Collect all non-brand keywords for a domain — keywords that do NOT contain the brand name. These represent organic visibility on generic/informational queries.

## What to do

1. Parse $ARGUMENTS: first argument is the domain (e.g. `dyson.it`)
2. Extract brand name from `--brand` flag, or derive it from the domain (e.g. `dyson.it` → `dyson`)
3. Optional: `--location` (default 2380 Italy), `--language` (default "it"), `--limit` (default 1000)

## Execution

Use `labs.domainOrganicKeywords` from `src/modules/labs.ts` with a filter to EXCLUDE keywords containing the brand name:

```typescript
import { createClient } from "./src/client";
import * as labs from "./src/modules/labs";

const client = createClient();
const brand = "<brand_name>"; // e.g. "dyson"

const result = await labs.domainOrganicKeywords(client, {
  target: "<domain>",
  location_code: 2380,
  language_code: "it",
  limit: 1000,
  filters: [
    "keyword_data.keyword", "not_like", `%${brand}%`
  ],
  order_by: ["keyword_data.keyword_info.search_volume,desc"],
});
```

## Output

Save results to `outputs/YYYY-MM-DD/keywords/no-brand-<domain>.json` and present:

1. **Summary**: total non-brand keywords found, total search volume, avg position
2. **Top Non-Brand Keywords** (sorted by volume): keyword, position, volume, CPC, URL
3. **Position Distribution**: how many in top 3, top 10, top 20, 20+
4. **Keyword Clusters**: group by theme/intent (informational, transactional, navigational)
5. **Top Landing Pages**: which pages rank for most non-brand keywords
6. **Quick Wins**: keywords in position 4-15 with high volume (easy to improve)
