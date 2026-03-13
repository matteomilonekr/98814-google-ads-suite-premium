---
name: seo:content-search
description: Content search by keyword with sentiment analysis and trend detection
argument-hint: <keyword> [--sentiment positive|negative|neutral] [--date-from <YYYY-MM-DD>] [--limit <number>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Search for content by keyword across the web with sentiment analysis and trend detection.

## What to do

1. Read `src/modules/content-analysis.ts` to understand content search functions
2. Use `contentAnalysis.search` for content discovery, `contentAnalysis.sentiment` for sentiment
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--sentiment` to filter, `--date-from` for time range, `--limit` (default 100)

## Execution

```typescript
import { createClient, contentAnalysis } from "./src/index";
const client = createClient();

const results = await contentAnalysis.search(client, {
  keyword: "<keyword>",
  limit: 100,
  date_from: "<date>",
});

const sentiment = await contentAnalysis.sentiment(client, {
  keyword: "<keyword>",
});

const trends = await contentAnalysis.trends(client, {
  keyword: "<keyword>",
});

const ratings = await contentAnalysis.ratings(client, {
  keyword: "<keyword>",
});
```

## Output

Present results as:
1. **Content Results**: title, URL, domain, publish date, content snippet
2. **Sentiment Breakdown**: positive, negative, neutral distribution with percentages
3. **Trend Analysis**: content volume over time, trending subtopics
4. **Top Sources**: most authoritative domains publishing about this keyword
5. **Content Types**: articles, reviews, news, forums — distribution by type
6. **Rating Analysis**: average ratings found in content, rating distribution
