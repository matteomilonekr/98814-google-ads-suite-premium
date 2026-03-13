---
name: seo:check-backlinks
description: Analyze backlink profile - summary, top links, anchors, referring domains
argument-hint: <domain_or_url> [--limit <n>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze the backlink profile of a domain or URL.

## What to do

1. Parse target from $ARGUMENTS
2. Use `src/modules/backlinks.ts` functions
3. Optional: `--limit` for max results (default 50)

## Execution Steps

1. `backlinks.summary(client, { target })` -> overall metrics
2. `backlinks.list(client, { target, limit, order_by: ["rank,desc"], mode: "one_per_domain" })` -> top links
3. `backlinks.anchors(client, { target, limit: 30 })` -> anchor distribution
4. `backlinks.referringDomains(client, { target, limit: 30, order_by: ["rank,desc"] })` -> top referring domains

## Output

1. **Profile Summary**: total backlinks, referring domains, dofollow/nofollow, rank, spam score
2. **Top Backlinks**: highest-authority links with anchor text
3. **Anchor Distribution**: top anchors with counts
4. **Top Referring Domains**: highest-rank linking domains
5. **Health Indicators**: broken backlinks, dofollow ratio assessment
