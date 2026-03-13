---
name: seo:llm-scraper
description: Deep scraping of ChatGPT and Gemini responses with structured output
argument-hint: <keyword> --engine <chatgpt|gemini|claude|perplexity|all> [--depth deep|shallow]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Deep scrape LLM responses from ChatGPT, Gemini, and other AI engines with structured output extraction.

## What to do

1. Read `src/modules/ai-optimization.ts` to understand LLM scraping functions
2. Use `aiOptimization.scrapeLLMResponse` for deep structured scraping
3. Parse the keyword from $ARGUMENTS (first argument)
4. Required flag: `--engine` (chatgpt, gemini, claude, perplexity, or all)
5. Optional flag: `--depth` (default deep)

## Execution

```typescript
import { createClient, aiOptimization } from "./src/index";
const client = createClient();

const resp = await aiOptimization.scrapeLLMResponse(client, {
  keyword: "<keyword>",
  engine: "<engine>",
  depth: "deep",
});

// For multiple engines
const allEngines = await aiOptimization.scrapeLLMResponseBatch(client, {
  keyword: "<keyword>",
  engines: ["chatgpt", "gemini", "claude", "perplexity"],
});
```

## Output

Present results as:
1. **Response Content**: full structured response from each LLM engine
2. **Cited Sources**: all domains, URLs, and brands mentioned with citation context
3. **Response Structure**: headers, lists, code blocks, tables — how the LLM organized its answer
4. **Entity Extraction**: products, brands, companies, people mentioned
5. **Sentiment Analysis**: tone and sentiment toward entities mentioned
6. **Cross-Engine Comparison**: how responses differ across LLMs for the same query
