---
name: seo:audit-site
description: Technical SEO audit - crawl site, check backlinks, find issues, get recommendations
argument-hint: <domain> [--keywords <kw1> <kw2>] [--pages <max>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Run a comprehensive technical SEO audit on a domain.

## What to do

1. Parse domain from $ARGUMENTS
2. Follow the seo-audit-agent process (see `.claude/agents/seo-audit-agent.md`)
3. Modules: `src/modules/onpage.ts`, `src/modules/backlinks.ts`, `src/modules/labs.ts`, `src/modules/serp.ts`

## Execution Steps

1. Start site crawl via `onpage.taskPost`
2. Fetch backlink summary via `backlinks.summary` (parallel)
3. Get domain rank via `labs.domainRankOverview` (parallel)
4. Check keyword rankings via `serp.googleOrganicLive` (if keywords provided)
5. Poll crawl until finished, get summary
6. Analyze pages with low scores
7. Generate recommendations

## Output

Present as structured audit report:
1. **Domain Overview**: traffic, keywords, rank
2. **Technical Health**: onpage score, pages crawled, broken links, duplicates
3. **Backlink Profile**: total links, referring domains, dofollow ratio
4. **Keyword Rankings** (if provided): position per keyword
5. **Issues Found**: pages with problems and specific issues
6. **Recommendations**: prioritized action items
