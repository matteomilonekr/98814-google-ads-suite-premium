---
name: seo:onpage-issues
description: SEO issues detection - technical errors, duplicates, missing tags
argument-hint: <domain> [--severity critical|warning|info] [--category <category>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Detect and categorize on-page SEO issues for a domain.

## What to do

1. Read `src/modules/onpage.ts` to understand issue detection functions
2. Use `onpage.crawlIssues` for issue detection and `onpage.duplicateContent` for duplicate analysis
3. Parse the domain from $ARGUMENTS (first argument)
4. Optional flags: `--severity` (default: all), `--category` to filter issue type

## Execution

```typescript
import { createClient, onpage } from "./src/index";
const client = createClient();

const issues = await onpage.crawlIssues(client, {
  target: "<domain>",
});

const duplicates = await onpage.duplicateContent(client, {
  target: "<domain>",
});

const duplicateTags = await onpage.duplicateTags(client, {
  target: "<domain>",
});
```

## Output

Present results as:
1. **Issues Summary**: total issues by severity (critical, warning, info)
2. **Critical Issues**: broken pages, server errors, redirect chains, missing canonical
3. **Content Issues**: duplicate titles, duplicate descriptions, thin content, missing H1
4. **Technical Issues**: missing alt tags, slow pages, large images, broken links
5. **Prioritized Fix List**: issues ordered by impact with specific fix recommendations
