---
description: Apple App Store - app rankings, reviews, keyword analysis
argument-hint: <keyword> [--app-id <id>] [--location <code>] [--language <code>]
---

Analyze Apple App Store search results, app details, reviews, and keyword rankings.

## What to do

1. Read `src/modules/app-data.ts` to understand App Store functions
2. Use `appData.appStoreSearch` for search, `appData.appStoreInfo` for app details
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--app-id` for specific app, `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, appData } from "./src/index";
const client = createClient();

// Search apps
const results = await appData.appStoreSearch(client, {
  keyword: "<keyword>",
  location_code: 2840,
  language_code: "en",
});

// App details (if app-id provided)
const appInfo = await appData.appStoreInfo(client, {
  app_id: "<app_id>",
});

// App reviews
const reviews = await appData.appStoreReviews(client, {
  app_id: "<app_id>",
});
```

## Output

Present results as:
1. **Search Rankings**: rank, app name, developer, rating, reviews count, price
2. **App Details** (if app-id): description, screenshots, version history, size, category
3. **Review Analysis**: rating distribution, recent review sentiment, common complaints/praise
4. **Keyword Opportunities**: related search terms, keyword difficulty for ASO
5. **Competitive Landscape**: top apps in category, feature comparison matrix
