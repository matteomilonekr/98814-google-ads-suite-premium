---
description: Full Google Business Profile with reviews, photos, and local data
argument-hint: <business> [--location <code>] [--language <code>]
---

Retrieve and analyze a full Google Business Profile including reviews, photos, and local data.

## What to do

1. Read `src/modules/business-data.ts` to understand Google Business functions
2. Use `businessData.googleBusinessInfo` for profile data, `businessData.googleBusinessReviews` for reviews
3. Parse the business name or place ID from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, businessData } from "./src/index";
const client = createClient();

// Business profile
const profile = await businessData.googleBusinessInfo(client, {
  keyword: "<business>",
  location_code: 2840,
  language_code: "en",
});

// Reviews
const reviews = await businessData.googleBusinessReviews(client, {
  keyword: "<business>",
  location_code: 2840,
});

// Photos
const photos = await businessData.googleBusinessPhotos(client, {
  keyword: "<business>",
  location_code: 2840,
});
```

## Output

Present results as:
1. **Business Profile**: name, address, phone, website, hours, categories, attributes
2. **Rating Overview**: overall rating, total reviews, rating distribution (5-star to 1-star)
3. **Review Analysis**: recent review sentiment, common themes, response rate
4. **Photos**: photo count, categories (interior, exterior, food, etc.)
5. **Competitive Position**: nearby competitors, rating comparison, review volume comparison
6. **Optimization Tips**: missing profile fields, review response strategy, photo recommendations
