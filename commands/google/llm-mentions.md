---
description: Track brand/domain mentions across AI/LLM responses
argument-hint: <domain> [--keywords <kw1,kw2,...>] [--engines chatgpt gemini claude perplexity]
---

Track how often and in what context a brand or domain is mentioned across AI/LLM responses.

## What to do

1. Read `src/modules/ai-optimization.ts` to understand LLM mention tracking functions
2. Use `aiOptimization.trackMentions` for brand mention monitoring
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flags: `--keywords` (industry keywords to check), `--engines` (default: all)

## Execution

```typescript
import { createClient, aiOptimization } from "./src/index";
const client = createClient();

const mentions = await aiOptimization.trackMentions(client, {
  target: "<domain>",
  keywords: ["<kw1>", "<kw2>"],
  engines: ["chatgpt", "gemini", "claude", "perplexity"],
});

const mentionDetails = await aiOptimization.mentionDetails(client, {
  target: "<domain>",
  keywords: ["<kw1>", "<kw2>"],
});
```

## Output

Present results as:
1. **Mention Summary**: total mentions, mention rate (% of queries where brand appears)
2. **Per-Engine Breakdown**: mention count and context per LLM engine
3. **Keyword Coverage**: which keywords trigger brand mentions, which do not
4. **Context Analysis**: positive, neutral, or negative mention context
5. **Competitor Comparison**: how often competitors are mentioned for the same queries
6. **GEO Score**: Generative Engine Optimization score with improvement recommendations
