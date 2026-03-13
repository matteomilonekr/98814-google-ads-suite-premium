---
description: Expand seed keywords into related keyword suggestions
argument-hint: <seed_keyword> [--location <code>] [--language <code>] [--limit <number>]
---

Expand a seed keyword into a comprehensive list of related keyword suggestions.

## What to do

1. Read `src/modules/keywords.ts` to understand suggestion functions
2. Use `keywords.keywordSuggestions` to expand the seed keyword
3. Parse the seed keyword from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--language` (default en), `--limit` (default 100)

## Execution

```typescript
import { createClient, keywords } from "./src/index";
const client = createClient();
const resp = await keywords.keywordSuggestions(client, {
  keyword: "<seed_keyword>",
  location_code: 2840,
  language_code: "en",
  limit: 100,
});
```

## Output

Present results as:
1. **Suggestion List**: keyword, search volume, CPC, competition
2. **Keyword Clusters**: group suggestions by topic/intent
3. **Long-tail Opportunities**: low competition, decent volume keywords
4. **Question Keywords**: suggestions phrased as questions (what, how, why)
