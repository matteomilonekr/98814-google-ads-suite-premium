---
description: Discover and analyze organic competitors for a domain
argument-hint: <domain> [--keywords <kw1> <kw2>] [--competitors <comp1> <comp2>]
---

Discover and profile competitors for a domain.

## What to do

1. Parse target domain from $ARGUMENTS
2. Follow the competitor-analysis-agent process (see `.claude/agents/competitor-analysis-agent.md`)
3. Modules: `src/modules/labs.ts`, `src/modules/backlinks.ts`, `src/modules/serp.ts`, `src/modules/domain-analytics.ts`

## Execution Steps

1. Analyze target: `labs.domainRankOverview` + `backlinks.summary`
2. Discover competitors: `labs.domainCompetitors`
3. Profile each competitor: rank, traffic, backlinks, tech stack
4. Keyword gap analysis via SERP checks (if keywords provided)
5. Backlink gap analysis via `backlinks.competitors`
6. Generate strategic recommendations

## Output

1. **Your Domain Profile**: traffic, keywords, backlinks
2. **Discovered Competitors**: list with overlap metrics
3. **Competitor Comparison Table**: side-by-side metrics
4. **Keyword Gaps**: keywords where competitors rank but you don't
5. **Backlink Gaps**: link sources you're missing
6. **Strategic Recommendations**: prioritized actions
