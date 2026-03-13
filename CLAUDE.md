# Suite Google Ads — Premium

## Setup

```bash
export DATAFORSEO_LOGIN=your_login
export DATAFORSEO_PASSWORD=your_password
export LOCAL_FALCON_API_KEY=your_key  # Opzionale, solo per Local Falcon grid analysis
npm install
```

## Come Usare Questa Suite

Questa suite ti fornisce 3 modi per lavorare: **comandi slash**, **agenti AI**, e **skill**. Ognuno ha un uso specifico.

---

## 1. Comandi Slash — Operazioni Dirette

### Comandi SEO

| Comando | Cosa Fa | Esempio |
|---------|---------|---------|
| `/google:analyze-serp <keyword>` | Analizza la SERP: ranking, features, competitor | `/google:analyze-serp "scarpe running"` |
| `/google:research-keywords <seed>` | Ricerca keyword: espansione, volumi, opportunita | `/google:research-keywords "seo tools"` |
| `/google:audit-site <domain>` | Audit tecnico SEO completo | `/google:audit-site example.com` |
| `/google:check-backlinks <domain>` | Profilo backlink: top link, ancore, referring domain | `/google:check-backlinks example.com` |
| `/google:find-competitors <domain>` | Scopri competitor organici | `/google:find-competitors example.com` |
| `/google:track-rankings <domain> --keywords <kw>` | Traccia posizioni keyword | `/google:track-rankings example.com --keywords "seo"` |
| `/google:analyze-content <keyword>` | Analisi qualita contenuti | `/google:analyze-content "marketing digitale"` |
| `/google:keyword-brand <domain>` | Keyword brand | `/google:keyword-brand example.com` |
| `/google:keyword-no-brand <domain>` | Keyword non-brand | `/google:keyword-no-brand example.com` |

### Comandi Premium Esclusivi

| Comando | Cosa Fa | Esempio |
|---------|---------|---------|
| `/google:monitor-ai <keyword>` | Monitora come ChatGPT, Gemini, Claude, Perplexity rispondono per una keyword | `/google:monitor-ai "miglior CRM"` |
| `/google:generate-content <topic>` | Genera contenuti SEO ottimizzati (testo, meta tag, subtopic) | `/google:generate-content "guida SEO 2026"` |
| `/google:local-rankings <business>` | Ranking locale con grid analysis su Google Maps | `/google:local-rankings "Pizzeria Roma" --keywords "pizza roma"` |
| `/google:gads-report <customer_id>` | **Report Google Ads completo** — 5 agenti paralleli, 10 sezioni, Scorecard 0-100 | `/google:gads-report 123-456-7890 --domain example.com` |
| `/google:gads-team-audit <customer_id>` | **Team audit** — 6 agenti paralleli: PMax, RSA, Neg KW, Search Terms, Report, Feed | `/google:gads-team-audit 123-456-7890` |

---

## 2. Agenti AI — Analisi Complesse Automatizzate

Gli agenti sono AI specializzati che orchestrano piu operazioni. Chiedi direttamente a Claude di usarli.

### SEO Agents (6)

#### `seo-audit-agent` — Audit SEO Completo
**Quando**: Analisi tecnica completa di un sito.
**Cosa fa**: Crawl sito + profilo backlink + keyword ranking + problemi tecnici (broken link, duplicate title/description, pagine non indicizzabili) + raccomandazioni prioritizzate.
**Input**: dominio, keyword (opzionale), max pagine crawl (default 200)
**Output**: Report con overview dominio, crawl summary, profilo backlink, ranking, problemi tecnici, raccomandazioni, score.
**Esempio**: "Esegui un audit SEO completo di example.com"

#### `keyword-research-agent` — Ricerca Keyword
**Quando**: Trovare opportunita keyword.
**Cosa fa**: Espande seed keyword, recupera volumi, analizza difficolta SERP, clusterizza per tema, identifica opportunita (volume alto + difficolta bassa).
**Input**: 1-5 keyword seed
**Output**: Lista clusterizzata con volume, CPC, difficolta, intent.
**Esempio**: "Fai ricerca keyword su 'scarpe running' e 'scarpe da corsa'"

#### `competitor-analysis-agent` — Analisi Competitor
**Quando**: Capire chi sono i competitor e dove hai gap.
**Cosa fa**: Scopre competitor organici, profila metriche SEO, identifica keyword gap e backlink gap.
**Input**: dominio
**Output**: Lista competitor, keyword gap, backlink gap, raccomandazioni.
**Esempio**: "Analizza i competitor organici di example.com"

#### `content-strategy-agent` — Strategia Contenuti
**Quando**: Pianificare calendario editoriale basato su dati.
**Cosa fa**: Analizza contenuti esistenti, identifica content gap, genera calendario editoriale, costruisce topic cluster.
**Input**: dominio, keyword focus (opzionale)
**Output**: Content gap, calendario editoriale, topic cluster pillar/satellite.
**Esempio**: "Crea una content strategy per example.com focalizzata su SEO"

#### `local-seo-agent` — SEO Locale
**Quando**: Ottimizzare presenza locale.
**Cosa fa**: Verifica Google Business Profile, analizza recensioni, controlla ranking Maps, verifica NAP.
**Input**: nome business, citta, keyword locali
**Output**: Report listing, analisi recensioni, ranking Maps, raccomandazioni.
**Esempio**: "Analizza la SEO locale di 'Pizzeria Da Mario' a Roma"

#### `link-building-agent` — Link Building
**Quando**: Trovare opportunita backlink.
**Cosa fa**: Analizza backlink competitor, trova menzioni senza link, scopre broken link, identifica outreach.
**Input**: dominio, competitor (opzionale)
**Output**: Opportunita prioritizzate: competitor gap, broken link, content outreach.
**Esempio**: "Trova opportunita di link building per example.com"

---

### Google Ads 2026 Strategic Agents (9)

Agenti con knowledge base aggiornata alle best practice Google Ads 2026.

#### `gads-account-strategist` — Architettura Account
**Quando**: Strutturare o ristrutturare un account Google Ads.
**Cosa fa**: Progetta architettura campagne, naming convention, framework funnel, allocazione budget (70-20-10 rule), decisione consolidamento vs segmentazione.
**Esempio**: "Progetta la struttura account Google Ads per un e-commerce di abbigliamento con budget 5000/mese"

#### `gads-pmax-specialist` — Performance Max
**Quando**: Creare, ottimizzare o diagnosticare campagne PMax.
**Cosa fa**: Setup PMax, ottimizzazione asset group, strategia audience signal, decisione feed-only vs full-asset, prevenzione cannibalizzazione brand, rescue prodotti zombie.
**Esempio**: "Analizza la mia campagna PMax e suggerisci come migliorare gli asset group"

#### `gads-bidding-optimizer` — Strategie Bidding
**Quando**: Ottimizzare le strategie di offerta.
**Cosa fa**: Smart Bidding, value-based bidding, portfolio strategy, gestione learning phase, aggiustamenti stagionali, strategia micro-conversioni.
**Esempio**: "Consiglia la migliore strategia di bidding per una campagna lead gen con CPA target 30 euro"

#### `gads-tracking-privacy` — Tracking e Privacy
**Quando**: Configurare o verificare il tracking conversioni.
**Cosa fa**: Integrazione GA4, Enhanced Conversions (web + lead), Consent Mode v2, server-side tagging, import conversioni offline, modelli attribuzione, strategia first-party data.
**Esempio**: "Verifica la configurazione Enhanced Conversions e Consent Mode v2 del mio account"

#### `gads-shopping-feeds` — Shopping e Feed
**Quando**: Ottimizzare campagne Shopping o feed Merchant Center.
**Cosa fa**: Ottimizzazione feed, strategia ibrida Shopping (PMax + Standard), priority setting, promozioni, local inventory ads.
**Esempio**: "Audit del feed Merchant Center: titoli, GTIN coverage, prodotti zombie"

#### `gads-video-display` — Video e Display
**Quando**: Campagne YouTube, Display o Demand Gen.
**Cosa fa**: YouTube Ads (tutti i formati + Shorts + CTV), Display Network, Demand Gen, sequencing video, strategia creativa, misurazione upper-funnel.
**Esempio**: "Progetta una campagna YouTube per brand awareness con video sequencing"

#### `gads-scripts-automation` — Script e Automazione
**Quando**: Automatizzare operazioni su Google Ads.
**Cosa fa**: Google Ads Scripts (weather trigger, N-gram analysis, anomaly detection, QS monitoring, budget pacing), automazione API, script MCC, reporting automatico.
**Esempio**: "Crea uno script per monitorare anomalie di spesa e inviare alert"

#### `gads-quality-ads` — Quality Score e Ad Copy
**Quando**: Migliorare Quality Score o creare ad copy efficaci.
**Cosa fa**: Ottimizzazione 3 pillar QS (CTR atteso, rilevanza annuncio, esperienza landing page), RSA con framework 15 headline, strategia estensioni, ottimizzazione landing page.
**Esempio**: "Analizza il Quality Score delle mie keyword e suggerisci miglioramenti per le RSA"

#### `gads-search-keywords` — Campagne Search
**Quando**: Gestire campagne Search e keyword strategy.
**Cosa fa**: AI Max for Search, strategia match type, gestione negative keyword, separazione brand/non-brand, RLSA, transizione da DSA.
**Esempio**: "Ristruttura la keyword strategy separando brand e non-brand con match type ottimali"

---

### Google Ads Operational Agents (6)

Agenti per operazioni quotidiane di audit e ottimizzazione.

#### `gads-pmax-auditor` — Audit PMax
**Cosa fa**: Audit operativo completo PMax — struttura, asset group, bidding, conversion tracking, channel mix. Classifica problemi in P1 (critico), P2 (importante), P3 (miglioramento).
**Esempio**: "Fai un audit della campagna PMax del customer ID 123-456-7890"

#### `gads-rsa-generator` — Generatore RSA
**Cosa fa**: Genera RSA completi con framework 15 headline (keyword + benefit + emotional + CTA), 4 description, sitelink, callout, structured snippet. Analizza RSA esistenti e propone miglioramenti.
**Esempio**: "Genera una RSA completa per la keyword 'software gestionale' target PMI"

#### `gads-negative-kw-optimizer` — Ottimizzatore Negative KW
**Cosa fa**: Analizza search terms, identifica sprechi, genera negative keyword list per match type, espansione semantica automatica. Target: -30/50% spend sprecato, +20/40% conversion rate.
**Esempio**: "Analizza i search terms e genera una lista negative keyword ottimizzata"

#### `gads-search-terms-analyzer` — Mining Search Terms
**Cosa fa**: Mining search terms con classificazione Tier 1-4 (da promuovere a keyword, da monitorare, da escludere, da bloccare), analisi intent, long-tail discovery, keyword competitor.
**Esempio**: "Analizza i search terms degli ultimi 30 giorni e classifica per tier"

#### `gads-report-generator` — Report Automatici
**Cosa fa**: Genera report performance settimanali/mensili/trimestrali con KPI, trend, confronto periodi, insight e action plan prioritizzato.
**Esempio**: "Genera il report mensile Google Ads con confronto mese precedente"

#### `gads-feed-optimizer` — Ottimizzatore Feed
**Cosa fa**: Audit titoli prodotto, rescue prodotti zombie (impression ma no click), strategia custom label, competitivita prezzo, copertura GTIN. Target: +40/80% impression, +25/60% CTR.
**Esempio**: "Audit del feed: trova prodotti zombie e ottimizza i titoli"

---

## 3. Skill — Funzioni API Granulari (38)

Le skill sono le funzioni base. Gli agenti le usano internamente, ma puoi richiamarle direttamente.

### SERP Analysis (7)
- `serp-google-organic` — Ranking organici, SERP features
- `serp-google-maps` — Local pack, ranking Maps
- `serp-google-media` — Immagini, News, Shopping SERP
- `serp-google-specialty` — Eventi, Job, AI Mode, Autocomplete
- `serp-google-finance` — Quotazioni, dati mercato
- `serp-youtube` — Ricerca YouTube, info video, commenti
- `serp-other-engines` — Bing, Yahoo, Baidu, Google Ads

### Keyword Research (4)
- `keyword-volume` — Volumi di ricerca, CPC, competizione, trend mensili
- `keyword-suggestions` — Espansione keyword, correlate
- `keyword-for-site` — Keyword associate a un dominio
- `keyword-trends` — Google Trends, traffico ads storico, trend stagionali

### Backlink Analysis (3)
- `backlink-profile` — Profilo completo: summary, backlink, ancore, referring domain
- `backlink-monitoring` — Link nuovi/persi, competitor link
- `backlink-bulk` — Confronto bulk domini, intersezione backlink

### On-Page Audit (4)
- `onpage-crawl` — Gestione crawl
- `onpage-issues` — Problemi SEO: non-indexable, duplicati, broken link, redirect chain
- `onpage-performance` — Lighthouse, Core Web Vitals, waterfall
- `onpage-content` — Parsing contenuto, screenshot, analisi pagina

### Labs Analytics (2)
- `labs-domain` — Intelligence dominio: traffico, keyword, competitor, sottodomini
- `labs-keywords` — Intelligence keyword: difficolta, intent, volume storico

### Content (2)
- `content-analysis` — Ricerca contenuti, sentiment, trend, rating
- `content-generation` — Generazione testi SEO, meta tag, parafrasi, subtopic

### AI Optimization (4) — PREMIUM
- `ai-overview` — Monitoraggio risposte AI Google (AI Mode, AI Overview)
- `llm-scraper` — Scraping profondo risposte ChatGPT, Gemini, Perplexity
- `llm-mentions` — Tracking menzioni brand/dominio nelle risposte AI
- `llm-responses` — Cattura risposte complete, keyword AI, sentiment

### E-Commerce (2) — PREMIUM
- `google-shopping` — Prodotti, prezzi, seller, confronto competitor
- `amazon` — Prodotti, recensioni, ranking, ASIN detail

### App Data (2) — PREMIUM
- `google-play` — App Android: ranking, recensioni, keyword
- `app-store` — App iOS: ranking, recensioni, keyword

### Business Data (4) — PREMIUM
- `google-business` — Google Business Profile completo
- `reviews-platforms` — Trustpilot, Tripadvisor
- `social-media` — Metriche Pinterest, Reddit
- `business-listings` — Database listing locali

### Domain Analytics (2)
- `tech-detection` — Stack tecnologico dominio
- `whois` — Dati registrazione WHOIS

### Local (1) — PREMIUM
- `local-falcon` — Analisi griglia ranking locale, mappa calore, tracking multi-punto

### Dashboard (1) — PREMIUM
- `graphed-dashboard` — Dashboard interattive con grafici e tabelle via Graphed MCP

---

## TypeScript Library

13 moduli in `src/modules/`: serp, keywords, backlinks, onpage, labs, domain-analytics, content-analysis, content-generation, merchant, app-data, business-data, ai-optimization, local-falcon

```typescript
import { createClient, serp, keywords, backlinks, aiOptimization } from "./src";

const client = createClient();
const results = await serp.googleOrganicLive(client, { keyword: "seo tools" });
const aiResponse = await aiOptimization.chatgptLive(client, { keyword: "best CRM" });
```

## Note Architettura

- Validazione input: Zod schemas in `src/types.ts`
- API client: axios + HTTP Basic Auth
- Endpoint task-based: POST -> poll ready -> GET risultati
- Location default: 2840 (US), lingua: "en"

---

*Suite Google Ads by Matteo Milone — Piano Premium. Copyright 2026 Matteo Milone. Tutti i diritti riservati.*
