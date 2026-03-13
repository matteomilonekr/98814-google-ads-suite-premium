---
name: seo:google-specialty
description: Specialty SERP analysis - Events, Jobs, AI Mode, Autocomplete suggestions
argument-hint: <keyword> [--type events|jobs|ai-mode|autocomplete] [--location <code>]
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Analyze specialty Google SERP features including Events, Jobs, AI Mode responses, and Autocomplete suggestions.

## What to do

1. Read `src/modules/serp.ts` to understand specialty SERP functions
2. Determine which specialty type to query based on `--type` flag or auto-detect from keyword
3. Parse the keyword from $ARGUMENTS (first argument)
4. Optional flags: `--type` (default: all available), `--location` (default 2840)

## Execution

```typescript
import { createClient, serp } from "./src/index";
const client = createClient();

// Autocomplete suggestions
const autocomplete = await serp.googleAutocompleteLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Events (if applicable)
const events = await serp.googleEventsLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// Jobs (if applicable)
const jobs = await serp.googleJobsLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});

// AI Mode (if available)
const aiMode = await serp.googleAiModeLive(client, {
  keyword: "<keyword>",
  location_code: 2840,
});
```

## Output

Present results as:
1. **Autocomplete Suggestions**: list of suggestions with search volume estimates
2. **Events Results** (if applicable): event name, date, venue, location
3. **Jobs Results** (if applicable): job title, company, location, salary range
4. **AI Mode Response** (if available): AI-generated overview content and cited sources
5. **SERP Feature Opportunities**: which specialty features appear and content optimization tips
