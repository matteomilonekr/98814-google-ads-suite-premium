---
name: seo:keyword-for-site
description: Discover keywords that a domain ranks for or could target
argument-hint: <domain> [--location <code>] [--language <code>] [--limit <number>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Discover keywords that a specific domain currently ranks for or should be targeting.

## What to do

1. Read `src/modules/keywords.ts` to understand domain keyword functions
2. Use `keywords.keywordsForSite` to discover keywords for the domain
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--language` (default en), `--limit` (default 100)

## Execution

```typescript
import { createClient, keywords } from "./src/index";
const client = createClient();
const resp = await keywords.keywordsForSite(client, {
  target: "<domain>",
  location_code: 2840,
  language_code: "en",
  limit: 100,
});
```

## Output

Present results as:
1. **Domain Keywords**: keyword, search volume, CPC, current ranking position
2. **Top Opportunities**: high-volume keywords where domain ranks on page 2-3
3. **Quick Wins**: keywords close to page 1 that need minor optimization
4. **Keyword Gap**: high-value keywords the domain is missing entirely
