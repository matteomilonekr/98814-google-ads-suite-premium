---
description: Analyze content quality and sentiment for a keyword or topic
argument-hint: <keyword> [--limit <n>]
---

Evaluate content quality and sentiment landscape for a keyword.

## What to do

1. Parse keyword from $ARGUMENTS
2. Use `src/modules/content-analysis.ts` functions
3. Optional: `--limit` (default 10)

## Execution Steps

1. `contentAnalysis.search(client, { keyword, limit })` -> find content
2. `contentAnalysis.sentimentAnalysis(client, { keyword })` -> sentiment breakdown
3. `contentAnalysis.contentSummary(client, { keyword })` -> content summary metrics

## Output

1. **Top Content**: URLs, domains, quality scores, publication dates
2. **Sentiment Analysis**: positive/negative/neutral breakdown
3. **Content Quality Benchmark**: average quality score for the topic
4. **Content Recommendations**: gaps and opportunities based on analysis
