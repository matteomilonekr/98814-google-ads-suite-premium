---
description: Capture complete responses from all major LLMs for a keyword
argument-hint: <keyword> [--engines chatgpt gemini claude perplexity] [--compare]
---

Capture and analyze complete responses from all major LLMs for a given keyword or query.

## What to do

1. Read `src/modules/ai-optimization.ts` to understand LLM response capture functions
2. Use `aiOptimization.captureResponses` for full response collection
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--engines` (default: all), `--compare` to enable cross-engine comparison

## Execution

```typescript
import { createClient, aiOptimization } from "./src/index";
const client = createClient();

const responses = await aiOptimization.captureResponses(client, {
  keyword: "<keyword>",
  engines: ["chatgpt", "gemini", "claude", "perplexity"],
});

const aiKeywords = await aiOptimization.aiKeywords(client, {
  keyword: "<keyword>",
});
```

## Output

Present results as:
1. **Full Responses**: complete response text from each LLM engine
2. **AI Keywords**: keywords and phrases that appear consistently across LLM responses
3. **Source Analysis**: which domains and URLs are cited as sources by each engine
4. **Response Patterns**: common themes, structures, and recommendations across engines
5. **Content Gaps**: topics covered by LLMs that your content may be missing
6. **Optimization Opportunities**: specific content improvements to increase LLM citation likelihood
