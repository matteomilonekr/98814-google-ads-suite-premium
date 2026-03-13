---
description: Site crawl management - start crawls, check status, retrieve results
argument-hint: <domain> [--pages <number>] [--force-recrawl]
---

Manage on-page SEO crawls for a domain — start new crawls, check status, and retrieve results.

## What to do

1. Read `src/modules/onpage.ts` to understand crawl management functions
2. Use `onpage.startCrawl` to initiate, `onpage.crawlStatus` to check progress
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flags: `--pages` (default 100), `--force-recrawl` to ignore cached results

## Execution

```typescript
import { createClient, onpage } from "./src/index";
const client = createClient();

// Start a crawl
const task = await onpage.startCrawl(client, {
  target: "<domain>",
  max_crawl_pages: 100,
});

// Check crawl status
const status = await onpage.crawlStatus(client, {
  task_id: task.id,
});

// Get crawl summary
const summary = await onpage.crawlSummary(client, {
  task_id: task.id,
});

// Get pages data
const pages = await onpage.crawlPages(client, {
  task_id: task.id,
});
```

## Output

Present results as:
1. **Crawl Summary**: pages crawled, pages with issues, crawl depth, time elapsed
2. **Page Inventory**: total pages, by status code (200, 301, 404, 500)
3. **Crawl Depth Distribution**: pages by depth level from homepage
4. **Resource Analysis**: CSS, JS, images count and load impact
5. **Indexability**: pages indexable vs noindex vs blocked by robots.txt
