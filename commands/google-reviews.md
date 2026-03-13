---
description: Trustpilot and Tripadvisor reviews analysis
argument-hint: <domain> --platform <trustpilot|tripadvisor|all> [--limit <number>]
---

Analyze reviews from Trustpilot and Tripadvisor for a business or domain.

## What to do

1. Read `src/modules/business-data.ts` to understand review platform functions
2. Use `businessData.trustpilotReviews` and `businessData.tripadvisorReviews` as needed
3. Parse the domain or business from $ARGUMENTS (first argument)
4. Required flag: `--platform` (trustpilot, tripadvisor, or all)
5. Optional flag: `--limit` (default 100)

## Execution

```typescript
import { createClient, businessData } from "./src/index";
const client = createClient();

// Trustpilot
const trustpilot = await businessData.trustpilotReviews(client, {
  target: "<domain>",
  limit: 100,
});

// Tripadvisor
const tripadvisor = await businessData.tripadvisorReviews(client, {
  target: "<domain>",
  limit: 100,
});
```

## Output

Present results as:
1. **Platform Summary**: overall rating, total reviews, TrustScore (Trustpilot) or ranking (Tripadvisor)
2. **Rating Distribution**: breakdown by star rating with percentages
3. **Recent Reviews**: latest reviews with rating, title, text, date, author
4. **Sentiment Analysis**: positive/negative themes, common keywords, trending topics
5. **Response Metrics**: business response rate, average response time
6. **Cross-Platform Comparison** (if all): rating differences, review volume, sentiment alignment
