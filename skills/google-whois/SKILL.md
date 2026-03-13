---
name: seo:whois
description: WHOIS domain lookup - registration details, expiry, nameservers
argument-hint: <domain>
allowed-tools:
  - Read
  - Bash
  - Task
  - Write
---

Perform a WHOIS lookup for domain registration details.

## What to do

1. Read `src/modules/domain-analytics.ts` to understand WHOIS functions
2. Use `domainAnalytics.whoisLookup` for domain registration data
3. Parse the domain from $ARGUMENTS (first argument)

## Execution

```typescript
import { createClient, domainAnalytics } from "./src/index";
const client = createClient();
const resp = await domainAnalytics.whoisLookup(client, {
  target: "<domain>",
});
```

## Output

Present results as:
1. **Registration Details**: registrar, creation date, expiry date, last updated
2. **Registrant Info**: organization, country (if available, respecting privacy)
3. **Nameservers**: list of DNS nameservers
4. **Domain Status**: active, locked, pending transfer, etc.
5. **Expiry Alert**: days until expiry with renewal reminder if within 90 days
