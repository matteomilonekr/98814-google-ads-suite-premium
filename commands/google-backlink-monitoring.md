---
description: Monitor backlink changes over time - new links, lost links, competitor movements
argument-hint: <domain> [--mode new|lost|all] [--days <number>]
---

Monitor backlink profile changes over time, tracking new and lost links.

## What to do

1. Read `src/modules/backlinks.ts` to understand monitoring functions
2. Use `backlinks.newBacklinks` and `backlinks.lostBacklinks` for change tracking
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flags: `--mode` (default all), `--days` (default 30)

## Execution

```typescript
import { createClient, backlinks } from "./src/index";
const client = createClient();

const newLinks = await backlinks.newBacklinks(client, {
  target: "<domain>",
  date_from: "<30_days_ago>",
});

const lostLinks = await backlinks.lostBacklinks(client, {
  target: "<domain>",
  date_from: "<30_days_ago>",
});

const competitors = await backlinks.competitorsBacklinks(client, {
  target: "<domain>",
});
```

## Output

Present results as:
1. **New Backlinks**: date acquired, source domain, source URL, anchor text, authority
2. **Lost Backlinks**: date lost, source domain, reason (removed, nofollow, broken)
3. **Net Link Velocity**: new vs lost per week trend
4. **Competitor Comparison**: link acquisition rate vs top competitors
5. **Action Items**: links to reclaim, outreach opportunities from competitor gains
