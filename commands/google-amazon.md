---
description: Amazon products, reviews, rankings, ASIN details
argument-hint: <keyword> [--asin <ASIN>] [--location <code>] [--sort relevance|price|rating|reviews]
---

Analyze Amazon search results, product details, reviews, and rankings.

## What to do

1. Read `src/modules/merchant.ts` to understand Amazon functions
2. Use `merchant.amazonSearch` for search results, `merchant.amazonProductInfo` for ASIN details
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--asin` for specific product, `--location` (default 2840), `--sort` (default relevance)

## Execution

```typescript
import { createClient, merchant } from "./src/index";
const client = createClient();

// Search products
const results = await merchant.amazonSearch(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Product details (if ASIN provided)
const product = await merchant.amazonProductInfo(client, {
  asin: "<ASIN>",
  location_code: 2840,
});

// Reviews
const reviews = await merchant.amazonReviews(client, {
  asin: "<ASIN>",
  location_code: 2840,
});
```

## Output

Present results as:
1. **Search Results**: rank, title, price, rating, reviews count, ASIN, Prime eligibility
2. **Product Details** (if ASIN): full description, features, specs, pricing history
3. **Review Analysis**: rating distribution, top positive/negative themes, verified purchase ratio
4. **Seller Landscape**: FBA vs FBM, Buy Box winner, seller count
5. **Competitive Intelligence**: price range, listing quality comparison, keyword optimization gaps
