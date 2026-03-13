---
description: Search volume, CPC, competition data for keywords
argument-hint: <keyword1> [keyword2...] [--location <code>] [--language <code>]
---

Get search volume, CPC, and competition metrics for one or more keywords.

## What to do

1. Read `src/modules/keywords.ts` to understand available functions
2. Use `keywords.searchVolume` for volume data
3. Parse keywords from $ARGUMENTS (space-separated or comma-separated)
4. Optional flags: `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, keywords } from "./src/index";
const client = createClient();
const resp = await keywords.searchVolume(client, {
  keywords: ["<keyword1>", "<keyword2>"],
  location_code: 2840,
  language_code: "en",
});
```

## Output

Present results as:
1. **Keyword Metrics Table**: keyword, monthly search volume, CPC, competition level, competition index
2. **Seasonal Trends**: monthly volume breakdown for each keyword
3. **CPC Analysis**: average CPC, high/low range, competition density
4. **Recommendations**: which keywords have best volume-to-competition ratio
