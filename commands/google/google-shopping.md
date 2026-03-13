---
description: Google Shopping products, prices, sellers, competitor comparison
argument-hint: <keyword> [--location <code>] [--language <code>] [--sort price|relevance|rating]
---

Analyze Google Shopping results for a keyword — products, pricing, sellers, and competitive landscape.

## What to do

1. Read `src/modules/merchant.ts` to understand Google Shopping functions
2. Use `merchant.googleShoppingSearch` for product listings
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--location` (default 2840), `--language` (default en), `--sort` (default relevance)

## Execution

```typescript
import { createClient, merchant } from "./src/index";
const client = createClient();

const products = await merchant.googleShoppingSearch(client, {
  keyword: "<keyword>",
  location_code: 2840,
  language_code: "en",
});

const sellers = await merchant.googleShoppingSellers(client, {
  keyword: "<keyword>",
  location_code: 2840,
});
```

## Output

Present results as:
1. **Product Listings**: title, price, seller, rating, reviews count, image URL
2. **Price Analysis**: min, max, average, median price across all listings
3. **Seller Distribution**: which merchants dominate, number of listings per seller
4. **Rating Overview**: average product ratings, review volume distribution
5. **Competitive Pricing**: price positioning opportunities, undercut potential
6. **Shopping Ad Insights**: ad format patterns, promotional offers detected
