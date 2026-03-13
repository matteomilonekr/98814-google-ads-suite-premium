---
name: whois
description: Retrieve WHOIS registration data for individual domains or filter across the WHOIS database with bulk overview queries.
---

# DataForSEO WHOIS

Functions from `src/modules/domain-analytics.ts`. Both endpoints are synchronous live requests. Uses the DataForSEO Domain Analytics API with the standard credentials (no separate API key required).

---

## Available Functions

| Function | Endpoint | Description |
|----------|----------|-------------|
| `whoisLookup` | `POST /domain_analytics/whois/live` | Retrieve full WHOIS record for a single domain |
| `whoisOverview` | `POST /domain_analytics/whois/overview/live` | Query and filter the WHOIS database with sorting and pagination |

---

## Key Parameters

```typescript
// whoisLookup (WhoisSchema)
{
  target: string;            // Required. Domain to look up (e.g. "example.com")
}

// whoisOverview (WhoisOverviewSchema)
{
  limit?: number;            // Default: 100
  offset?: number;           // Default: 0
  filters?: any[];           // Filter expressions (e.g., by registrar, expiry date, country)
  order_by?: string[];       // Sort fields (e.g., ["expiration_date,asc"])
}
```

---

## Response Types

- `WhoisRecord`: `domain`, `registrar`, `creation_date`, `expiration_date`, `updated_date`, `registrant` (`name`, `organization`, `email`, `country`), `name_servers` (string array)
- `DataForSEOResponse<WhoisRecord>`: top-level wrapper for single domain lookup
- `whoisOverview` returns a list of `WhoisRecord`-like items matching the filter criteria

---

## When to Use

- **Domain registration data** - Use `whoisLookup` to retrieve a domain's creation date, expiry date, registrar, and registrant information
- **Expiry date monitoring** - Use `whoisOverview` with filters on `expiration_date` to find domains expiring soon — useful for domain acquisition or competitive monitoring
- **Registrar analysis** - Filter `whoisOverview` by registrar to understand which registrars are most commonly used in a niche or market
- **Bulk WHOIS research** - Use `whoisOverview` with pagination to query large sets of domains filtered by country, registrant organization, or other attributes
- **Domain age investigation** - Compare `creation_date` across competitor domains to understand when they were established, relevant for trust and SEO history analysis
