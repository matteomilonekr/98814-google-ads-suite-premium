---
description: Advanced keyword intelligence - intent analysis, SERP features, keyword clustering
argument-hint: <keyword1> [keyword2...] [--location <code>] [--language <code>]
---

Advanced keyword analytics using DataForSEO Labs — intent detection, SERP features, clustering.

## What to do

1. Read `src/modules/labs.ts` to understand keyword analytics functions
2. Use `labs.keywordOverview`, `labs.keywordIntent`, `labs.keywordSerpFeatures` as needed
3. Parse keywords from $ARGUMENTS (space-separated or comma-separated)
4. Optional flags: `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, labs } from "./src/index";
const client = createClient();

const overview = await labs.keywordOverview(client, {
  keywords: ["<keyword1>", "<keyword2>"],
  location_code: 2840,
  language_code: "en",
});

const intent = await labs.keywordIntent(client, {
  keywords: ["<keyword1>", "<keyword2>"],
  location_code: 2840,
});

const serpFeatures = await labs.keywordSerpFeatures(client, {
  keywords: ["<keyword1>", "<keyword2>"],
  location_code: 2840,
});

const clustering = await labs.keywordClustering(client, {
  keywords: ["<keyword1>", "<keyword2>"],
  location_code: 2840,
});
```

## Output

Present results as:
1. **Keyword Overview**: volume, CPC, competition, difficulty score
2. **Search Intent**: informational, navigational, transactional, commercial breakdown
3. **SERP Features**: which features appear for each keyword (PAA, featured snippet, knowledge panel)
4. **Keyword Clusters**: semantically grouped keywords with cluster themes
5. **Difficulty Assessment**: realistic ranking difficulty with competitor strength analysis
