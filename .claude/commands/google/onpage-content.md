---
name: seo:onpage-content
description: HTML extraction, content structure analysis, page screenshots
argument-hint: <url> [--screenshot] [--extract headings|links|images|all]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Extract and analyze page content structure, HTML elements, and capture screenshots.

## What to do

1. Read `src/modules/onpage.ts` to understand content extraction functions
2. Use `onpage.contentParsing` for HTML extraction, `onpage.pageScreenshot` for screenshots
3. Parse the URL from $ARGUMENTS (first argument)
4. Optional flags: `--screenshot` to capture page image, `--extract` to focus on specific elements

## Execution

```typescript
import { createClient, onpage } from "./src/index";
const client = createClient();

// Content parsing
const content = await onpage.contentParsing(client, {
  url: "<url>",
});

// Screenshot
const screenshot = await onpage.pageScreenshot(client, {
  url: "<url>",
  full_page: true,
});

// Structured content extraction
const parsed = await onpage.htmlStructure(client, {
  url: "<url>",
});
```

## Output

Present results as:
1. **Page Structure**: H1-H6 heading hierarchy, content sections, word count
2. **Link Analysis**: internal links, external links, anchor text distribution
3. **Image Audit**: total images, missing alt tags, file sizes, format types
4. **Content Quality**: text-to-HTML ratio, readability score, keyword density
5. **Schema Markup**: structured data detected (JSON-LD, microdata)
6. **Screenshot** (if requested): full-page screenshot with annotations
