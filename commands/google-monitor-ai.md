---
description: Monitor AI/LLM responses for a keyword - check brand visibility across ChatGPT, Claude, Gemini, Perplexity
argument-hint: <keyword> [--domain <your_domain>] [--engines chatgpt claude gemini perplexity]
---

Monitor how AI language models respond to a query and check if your domain is cited.

## What to do

1. Parse keyword from $ARGUMENTS
2. Use `src/modules/ai-optimization.ts` functions
3. Optional: `--domain` to check visibility, `--engines` to limit which LLMs

## Execution Steps

1. `aiOptimization.queryAllLLMs(client, { keyword })` -> query all LLMs
2. For each engine response, extract: response text, cited sources (domains, URLs)
3. If `--domain` provided, check if domain appears in citations

## Output

1. **Per-Engine Results**: response summary and cited sources
2. **Citation Analysis**: which domains are most cited across engines
3. **Brand Visibility** (if domain provided): mentioned/not mentioned per engine
4. **GEO Recommendations**: how to improve AI visibility
