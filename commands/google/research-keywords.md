---
description: Deep keyword research - expand seed keywords, get volumes, find opportunities
argument-hint: <seed_keyword> [<seed2> ...] [--location <code>] [--limit <n>]
---

Perform deep keyword research using multiple DataForSEO data sources.

## What to do

1. Parse seed keywords from $ARGUMENTS
2. Use the keyword-research-agent process (see `.claude/agents/keyword-research-agent.md`)
3. Modules to use: `src/modules/keywords.ts` and `src/modules/labs.ts`

## Execution Steps

1. Get search volume for seed keywords via `keywords.searchVolume`
2. Expand with `keywords.keywordSuggestions` per seed
3. Find related keywords via `labs.relatedKeywords`
4. Get keyword ideas via `labs.keywordIdeas`
5. Deduplicate and cluster results
6. Identify opportunities (high volume, low competition)

## Output

Present as a structured report:
1. **Seed Metrics**: volume, competition, CPC per seed
2. **Top Suggestions**: sorted by volume (top 30)
3. **Keyword Clusters**: grouped by theme with total volume
4. **Opportunities**: high-volume, low-competition keywords
