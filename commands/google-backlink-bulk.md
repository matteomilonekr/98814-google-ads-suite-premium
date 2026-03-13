---
description: Bulk backlink comparison across multiple domains
argument-hint: <domain1> <domain2> [domain3...] [--metric referring-domains|backlinks|rank]
---

Compare backlink profiles across multiple domains in bulk.

## What to do

1. Read `src/modules/backlinks.ts` to understand bulk comparison functions
2. Use `backlinks.bulkBacklinks` and `backlinks.bulkReferringDomains` for comparison
3. Parse domains from $ARGUMENTS (space-separated)
4. Optional flag: `--metric` to focus on specific metric (default: all)

## Execution

```typescript
import { createClient, backlinks } from "./src/index";
const client = createClient();

const bulkLinks = await backlinks.bulkBacklinks(client, {
  targets: ["<domain1>", "<domain2>", "<domain3>"],
});

const bulkDomains = await backlinks.bulkReferringDomains(client, {
  targets: ["<domain1>", "<domain2>", "<domain3>"],
});

const intersection = await backlinks.backlinkIntersection(client, {
  targets: ["<domain1>", "<domain2>", "<domain3>"],
});
```

## Output

Present results as:
1. **Comparison Table**: domain, total backlinks, referring domains, domain rank, dofollow ratio
2. **Link Intersection**: domains linking to multiple targets (shared link sources)
3. **Unique Links**: link sources exclusive to each domain
4. **Authority Distribution**: breakdown by domain authority tiers
5. **Gap Analysis**: link sources your competitors have that you are missing
