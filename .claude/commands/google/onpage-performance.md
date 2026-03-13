---
name: seo:onpage-performance
description: Page performance analysis - Lighthouse scores, Core Web Vitals
argument-hint: <url> [--device desktop|mobile] [--category performance|accessibility|seo|best-practices]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze page performance using Lighthouse and Core Web Vitals metrics.

## What to do

1. Read `src/modules/onpage.ts` to understand performance functions
2. Use `onpage.lighthouseAudit` for Lighthouse scores and `onpage.coreWebVitals` for CWV
3. Parse the URL from $ARGUMENTS (first argument)
4. Optional flags: `--device` (default desktop), `--category` (default: all)

## Execution

```typescript
import { createClient, onpage } from "./src/index";
const client = createClient();

const lighthouse = await onpage.lighthouseAudit(client, {
  url: "<url>",
  device: "desktop",
});

const cwv = await onpage.coreWebVitals(client, {
  url: "<url>",
});
```

## Output

Present results as:
1. **Lighthouse Scores**: Performance, Accessibility, Best Practices, SEO (0-100 each)
2. **Core Web Vitals**: LCP, FID/INP, CLS with pass/fail status
3. **Performance Breakdown**: FCP, TTI, TBT, Speed Index
4. **Opportunities**: specific optimizations with estimated time savings
5. **Diagnostics**: render-blocking resources, unused code, image optimization
