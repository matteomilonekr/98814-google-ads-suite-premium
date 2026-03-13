---
name: seo:track-rankings
description: Track keyword rankings for a domain across Google SERPs
argument-hint: <domain> --keywords <kw1> <kw2> [--location <code>] [--device desktop|mobile]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Check current keyword rankings for a domain.

## What to do

1. Parse domain and keywords from $ARGUMENTS
2. Use `src/modules/serp.ts` to check each keyword
3. Optional: `--location` (default 2840), `--device` (default desktop)

## Execution Steps

For each keyword:
1. `serp.googleOrganicLive(client, { keyword, location_code, device, depth: 100 })`
2. Find target domain in organic results
3. Record: position, URL, title, or "not found"

## Output

Present as a rankings table:
| Keyword | Position | URL | Title |
|---------|----------|-----|-------|
| keyword1 | #3 | /page | Page Title |
| keyword2 | Not found | - | - |

Plus summary: total tracked, ranking in top 10, top 3, not found.
