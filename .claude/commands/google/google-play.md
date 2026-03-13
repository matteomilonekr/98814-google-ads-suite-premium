---
name: seo:google-play
description: Google Play Store - app rankings, reviews, keyword analysis
argument-hint: <keyword> [--app-id <id>] [--location <code>] [--language <code>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze Google Play Store search results, app details, reviews, and keyword rankings.

## What to do

1. Read `src/modules/app-data.ts` to understand Google Play functions
2. Use `appData.googlePlaySearch` for search, `appData.googlePlayInfo` for app details
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--app-id` for specific app, `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, appData } from "./src/index";
const client = createClient();

// Search apps
const results = await appData.googlePlaySearch(client, {
  keyword: "<keyword>",
  location_code: 2840,
  language_code: "en",
});

// App details (if app-id provided)
const appInfo = await appData.googlePlayInfo(client, {
  app_id: "<app_id>",
});

// App reviews
const reviews = await appData.googlePlayReviews(client, {
  app_id: "<app_id>",
});
```

## Output

Present results as:
1. **Search Rankings**: rank, app name, developer, rating, installs, price
2. **App Details** (if app-id): description, screenshots, version, size, category, permissions
3. **Review Analysis**: rating distribution, recent sentiment trends, top feedback themes
4. **Install Metrics**: install count, growth indicators, category ranking
5. **ASO Opportunities**: keyword gaps, title/description optimization suggestions
