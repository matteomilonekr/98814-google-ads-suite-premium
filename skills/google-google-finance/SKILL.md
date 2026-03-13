---
name: seo:google-finance
description: Google Finance SERP - stock quotes, market data, financial information
argument-hint: <keyword> [--location <code>] [--language <code>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze Google Finance SERP results for stock quotes, market data, and financial information.

## What to do

1. Read `src/modules/serp.ts` to understand finance SERP functions
2. Use `serp.googleFinanceLive` for financial data
3. Parse the keyword from $ARGUMENTS (first argument) — typically a stock ticker or company name
4. Optional flags: `--location` (default 2840), `--language` (default en)

## Execution

```typescript
import { createClient, serp } from "./src/index";
const client = createClient();
const resp = await serp.googleFinanceLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
  language_code: "en",
});
```

## Output

Present results as:
1. **Stock Overview**: ticker, price, change, market cap, volume
2. **Market Data**: open, high, low, close, 52-week range
3. **Financial Metrics**: P/E ratio, dividend yield, EPS (if available)
4. **Related Instruments**: related stocks, indices, or financial products shown in SERP
