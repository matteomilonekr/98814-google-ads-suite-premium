---
name: seo:social-media
description: Pinterest and Reddit engagement metrics for a keyword or domain
argument-hint: <keyword> [--platform pinterest|reddit|all] [--limit <number>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze Pinterest and Reddit engagement metrics for a keyword or domain.

## What to do

1. Read `src/modules/business-data.ts` to understand social media functions
2. Use `businessData.pinterestSearch` and `businessData.redditSearch` for engagement data
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--platform` (default all), `--limit` (default 50)

## Execution

```typescript
import { createClient, businessData } from "./src/index";
const client = createClient();

// Pinterest
const pinterest = await businessData.pinterestSearch(client, {
  keyword: "<keyword>",
  limit: 50,
});

// Reddit
const reddit = await businessData.redditSearch(client, {
  keyword: "<keyword>",
  limit: 50,
});
```

## Output

Present results as:
1. **Pinterest Results**: pin title, repins, comments, board, source URL
2. **Reddit Results**: post title, subreddit, upvotes, comments, post URL
3. **Engagement Metrics**: average engagement rate per platform
4. **Top Content Themes**: most engaging topics and formats
5. **Community Insights**: active subreddits, popular boards related to keyword
6. **Content Opportunities**: underserved topics with high engagement potential
