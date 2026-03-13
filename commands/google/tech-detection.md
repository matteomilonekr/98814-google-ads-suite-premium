---
name: seo:tech-detection
description: Full technology stack detection for any domain
argument-hint: <domain> [--category analytics|cms|framework|hosting|all]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Detect the full technology stack used by a domain including CMS, analytics, frameworks, and hosting.

## What to do

1. Read `src/modules/domain-analytics.ts` to understand tech detection functions
2. Use `domainAnalytics.technologiesLookup` for comprehensive stack detection
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flag: `--category` to filter by technology category (default: all)

## Execution

```typescript
import { createClient, domainAnalytics } from "./src/index";
const client = createClient();

const techStack = await domainAnalytics.technologiesLookup(client, {
  target: "<domain>",
});

const techSummary = await domainAnalytics.technologiesSummary(client, {
  target: "<domain>",
});

const domainsByTech = await domainAnalytics.technologiesDomainsByTech(client, {
  technology: "<specific_tech>",
});
```

## Output

Present results as:
1. **Technology Stack Overview**: total technologies detected, categories covered
2. **Analytics & Tracking**: GA4, GTM, Meta Pixel, ad tags, heatmap tools
3. **CMS & Framework**: WordPress, Shopify, React, Next.js, etc.
4. **Hosting & CDN**: hosting provider, CDN, DNS, SSL certificate
5. **E-commerce**: payment processors, cart platforms, product feeds
6. **Marketing Tools**: email platforms, CRM, A/B testing, chat widgets
7. **Competitive Insight**: how the tech stack compares to industry standards
