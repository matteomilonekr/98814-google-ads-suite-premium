# Suite Google Ads — Piano PREMIUM

## What This Is

Suite Google Ads Premium: soluzione completa per Google Ads e SEO. 200+ funzioni API, 38 skill DataForSEO, 21 agenti AI (6 SEO + 9 strategici + 6 operativi), 14 comandi slash, dashboard interattive, AI/LLM monitoring.

## Setup

### Credentials

```bash
export DATAFORSEO_LOGIN=your_login
export DATAFORSEO_PASSWORD=your_password
export LOCAL_FALCON_API_KEY=optional_key  # Only for local-falcon grid analysis
```

### Install

```bash
npm install
```

## Available Commands (`/google:*`)

| Command | Description |
|---------|-------------|
| `/google:analyze-serp <keyword>` | Analyze SERP for a keyword |
| `/google:research-keywords <seed> [seed2...]` | Deep keyword research |
| `/google:audit-site <domain>` | Technical SEO audit |
| `/google:check-backlinks <domain>` | Backlink profile analysis |
| `/google:find-competitors <domain>` | Competitor discovery and analysis |
| `/google:track-rankings <domain> --keywords <kw...>` | Track keyword rankings |
| `/google:analyze-content <keyword>` | Content quality analysis |
| `/google:keyword-brand <domain> [--brand <name>]` | Collect brand keywords |
| `/google:keyword-no-brand <domain> [--brand <name>]` | Collect non-brand keywords |
| `/google:monitor-ai <keyword>` | Monitor AI/LLM mentions |
| `/google:generate-content <topic>` | SEO content generation |
| `/google:local-rankings <business> --keywords <kw...>` | Local search rankings |
| `/google:gads-report <customer_id> [--domain] [--start/end] [--business-type]` | Full Google Ads report — 5 parallel agents, 10 sections, 0-100 Scorecard |
| `/google:gads-team-audit <customer_id> [--domain] [--business-type]` | Team audit — 6 parallel agents: PMax, RSA, Neg KW, Search Terms, Report, Feed |

## Available Agents

### SEO Agents (6)
| Agent | Description |
|-------|-------------|
| `seo-audit-agent` | Full site audit: crawl + backlinks + rankings + recommendations |
| `keyword-research-agent` | Deep keyword research: expand, cluster, find opportunities |
| `competitor-analysis-agent` | Competitor profiling: discover, compare, find gaps |
| `content-strategy-agent` | Content gap analysis + calendar + topic clusters |
| `local-seo-agent` | Local SEO: listings, reviews, Maps rankings |
| `link-building-agent` | Link building: competitor links, content outreach, broken links |

### Google Ads 2026 Strategic Agents (9)
| Agent | Description |
|-------|-------------|
| `gads-account-strategist` | Account structure, campaign architecture, budget allocation (70-20-10) |
| `gads-pmax-specialist` | Performance Max setup, asset groups, audience signals, zombie product rescue |
| `gads-bidding-optimizer` | Smart Bidding, value-based bidding, portfolio strategies, learning phase |
| `gads-tracking-privacy` | GA4, Enhanced Conversions, Consent Mode v2, server-side tagging |
| `gads-shopping-feeds` | Google Shopping, Merchant Center feed optimization, hybrid Shopping |
| `gads-video-display` | YouTube Ads, Display, Demand Gen, video sequencing |
| `gads-scripts-automation` | Google Ads Scripts, anomaly detection, budget pacing, QS monitoring |
| `gads-quality-ads` | Quality Score optimization, RSA framework (15 headline), ad extensions |
| `gads-search-keywords` | Search campaigns, AI Max for Search, match type strategy, RLSA |

### Google Ads Operational Agents (6)
| Agent | Description |
|-------|-------------|
| `gads-pmax-auditor` | PMax audit: structure, asset groups, bidding, issue P1/P2/P3 |
| `gads-rsa-generator` | RSA generator: 15 headline framework, sitelink, callout, snippets |
| `gads-negative-kw-optimizer` | Negative KW optimizer: N-gram, semantic expansion, match type lists |
| `gads-search-terms-analyzer` | Search terms mining: Tier 1-4 classification, intent analysis |
| `gads-report-generator` | Report generator: weekly/monthly/quarterly, KPI trends, action plan |
| `gads-feed-optimizer` | Feed optimizer: title audit, zombie rescue, custom labels, GTIN coverage |

## Available Skills (38)

### SERP Analysis (7)
`serp-google-organic` · `serp-google-maps` · `serp-google-media` · `serp-google-specialty` · `serp-google-finance` · `serp-youtube` · `serp-other-engines`

### Keyword Research (4)
`keyword-volume` · `keyword-suggestions` · `keyword-for-site` · `keyword-trends`

### Backlink Analysis (3)
`backlink-profile` · `backlink-monitoring` · `backlink-bulk`

### On-Page Audit (4)
`onpage-crawl` · `onpage-issues` · `onpage-performance` · `onpage-content`

### Labs Analytics (2)
`labs-domain` · `labs-keywords`

### Content (2)
`content-analysis` · `content-generation`

### AI Optimization (4)
`ai-overview` · `llm-scraper` · `llm-mentions` · `llm-responses`

### E-Commerce (2)
`google-shopping` · `amazon`

### App Data (2)
`google-play` · `app-store`

### Business Data (4)
`google-business` · `reviews-platforms` · `social-media` · `business-listings`

### Domain Analytics (2)
`tech-detection` · `whois`

### Local (1)
`local-falcon`

### Dashboard (1)
`graphed-dashboard`

## TypeScript Library

13 moduli: serp, keywords, backlinks, onpage, labs, domain-analytics, content-analysis, content-generation, merchant, app-data, business-data, ai-optimization, local-falcon

## Architecture Notes

- Input validation: Zod schemas in `src/types.ts`
- API client: axios + HTTP Basic Auth
- Task-based endpoints: POST -> poll -> GET
- Default location: 2840 (US), language: "en"

---

*Suite Google Ads by Anti-Gravity — Piano Premium. Copyright 2026 Matteo Milone.*


<claude-mem-context>
# Recent Activity

<!-- This section is auto-generated by claude-mem. Edit content outside the tags. -->

*No recent activity*
</claude-mem-context>