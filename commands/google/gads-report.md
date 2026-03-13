---
description: Report Google Ads completo — 5 agenti paralleli, 10 sezioni, Scorecard 0-100, Playbook 2026
argument-hint: <customer_id> [--domain <domain>] [--start <YYYY-MM-DD>] [--end <YYYY-MM-DD>] [--business-type <ecommerce|lead-gen|SaaS|local>]
---

Genera un report Google Ads completo Top 0.01% — 5 agenti paralleli, 10 sezioni, Scorecard 0-100.

## Input

$ARGUMENTS — Customer ID (obbligatorio), opzionalmente domain, date range, business type.

## Istruzioni

### Step 1: PARSA ARGOMENTI

Estrai da `$ARGUMENTS`:
- `customer_id` (obbligatorio) — ID account Google Ads (es. `123-456-7890`)
- `--domain` (opzionale) — Dominio per arricchimento DataForSEO
- `--start` (opzionale, default: 30 giorni fa) — Data inizio `YYYY-MM-DD`
- `--end` (opzionale, default: oggi) — Data fine `YYYY-MM-DD`
- `--business-type` (opzionale, default: `ecommerce`) — Tipo business: ecommerce, lead-gen, SaaS, local

Se `customer_id` non e' fornito, chiedi all'utente.

### Step 2: PULL INIZIALE ACCOUNT-LEVEL

Esegui **3 chiamate MCP in parallelo** per raccogliere il contesto account:

1. `mcp__google-ads__get_account_overview(customer_id, start_date, end_date, response_format="json")`
2. `mcp__google-ads__get_campaign_performance(customer_id, start_date, end_date, status="enabled", limit=100, response_format="json")`
3. `mcp__google-ads__list_campaigns(customer_id, status="enabled", limit=100, response_format="json")`

Salva i risultati come contesto condiviso per gli agenti.

### Step 3: LANCIA 5 AGENTI IN PARALLELO

Usa il **Agent tool** per lanciare 5 agenti contemporaneamente in un singolo messaggio. Ogni agente riceve:
- `customer_id`, `start_date`, `end_date`, `domain`, `business_type`
- I dati account-level raccolti nello Step 2
- Le GAQL queries specifiche da eseguire

---

**Agente 1 — Account & Performance** (Sezioni 1, 2, 7)
```
subagent_type: gads-account-strategist
prompt: |
  Sei l'Account & Performance Analyst per il report Google Ads 2026.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}
  Domain: {domain}

  DATI ACCOUNT GIA' RACCOLTI:
  {account_overview_data}
  {campaign_performance_data}

  IL TUO COMPITO: Produci 3 sezioni del report usando GAQL queries + MCP tools.

  ## SEZIONE 1: Riepilogo Esecutivo

  Calcola e presenta:
  - MER (Marketing Efficiency Ratio) = Revenue totale / Spesa ads totale
  - Profit ROAS target = 1 / Margine (es. 40% margine = 2.5x breakeven)
  - ROAS effettivo vs Profit ROAS → semaforo (🟢 >= 4.0 | 🟡 2.0-3.99 | 🔴 < 2.0)
  - CAC (Cost per Acquisition) e trend vs periodo precedente
  - Conversioni totali, valore conversioni, spend totale
  - New vs Returning customers (se disponibile)

  GAQL Query 1 — KPI Principali:
  ```
  SELECT
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.all_conversions,
    metrics.all_conversions_value,
    metrics.clicks,
    metrics.impressions,
    metrics.ctr,
    metrics.average_cpc,
    metrics.cost_per_conversion,
    metrics.conversions_from_interactions_rate
  FROM customer
  WHERE segments.date BETWEEN '{start_date}' AND '{end_date}'
  ```

  GAQL Query 2 — Periodo precedente (confronto):
  Calcola il periodo precedente di uguale durata e ripeti la query sopra.

  ## SEZIONE 2: Breakdown Campagne

  Usa i dati campaign_performance gia' forniti + questa GAQL:

  GAQL Query 3 — Campaign per tipo con impression share:
  ```
  SELECT
    campaign.id,
    campaign.name,
    campaign.advertising_channel_type,
    campaign.advertising_channel_sub_type,
    campaign.bidding_strategy_type,
    campaign.status,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.clicks,
    metrics.ctr,
    metrics.average_cpc,
    metrics.cost_per_conversion,
    metrics.search_impression_share,
    metrics.search_budget_lost_impression_share,
    metrics.search_rank_lost_impression_share,
    metrics.content_impression_share
  FROM campaign
  WHERE campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ORDER BY metrics.cost_micros DESC
  ```

  Presenta:
  - Tabella campagne ordinate per spend con semafori ROAS
  - Breakdown per tipo: Search, PMax, Shopping, Demand Gen, Video, Display
  - % spend e % conversioni per tipo
  - PMax channel split (se disponibile)
  - Cannibalizzazione brand: Search brand vs PMax brand overlap

  ## SEZIONE 7: Bidding & Budget

  GAQL Query 4 — Day-of-week pacing:
  ```
  SELECT
    segments.day_of_week,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.clicks
  FROM campaign
  WHERE campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ```

  Presenta:
  - Bidding strategy per campagna (Target ROAS, Target CPA, Max Conv, etc.)
  - Target vs Actual per ogni strategia
  - Lost IS (Budget) → semaforo (🟢 < 10% | 🟡 10-25% | 🔴 > 25%)
  - Lost IS (Rank) → semaforo
  - Day-of-week performance heatmap
  - Budget utilization rate
  - Raccomandazioni bidding con impatto economico stimato

  ## OUTPUT FORMAT

  Rispondi con le 3 sezioni complete in markdown con:
  - Tabelle dati
  - Semafori (🟢🟡🔴) per ogni metrica chiave
  - Score 0-100 per ogni sezione
  - Top insight per sezione

  Lingua: Italiano.
```

---

**Agente 2 — Search & Keywords** (Sezioni 4, 5)
```
subagent_type: gads-search-keywords
prompt: |
  Sei il Search & Keywords Analyst per il report Google Ads 2026.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT GIA' RACCOLTI:
  {campaign_list_data}

  IL TUO COMPITO: Produci 2 sezioni del report usando GAQL queries + MCP tools.

  ## SEZIONE 4: Keyword & Search Terms

  GAQL Query 5 — Keyword con match type e metriche:
  ```
  SELECT
    ad_group_criterion.keyword.text,
    ad_group_criterion.keyword.match_type,
    ad_group.name,
    campaign.name,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.clicks,
    metrics.ctr,
    metrics.average_cpc,
    metrics.cost_per_conversion
  FROM keyword_view
  WHERE campaign.status = 'ENABLED'
    AND ad_group.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ORDER BY metrics.cost_micros DESC
  LIMIT 200
  ```

  GAQL Query 6 — Search terms con zero conversioni (sprechi):
  Usa `mcp__google-ads__search_terms_report(customer_id, start_date, end_date, limit=500)`
  Filtra: terms con cost > 0 e conversions = 0, ordina per cost DESC.

  Presenta:
  - Match type distribution (% Exact, Phrase, Broad per spend e conversioni)
  - Top 20 keywords per spend con ROAS/CPA e semafori
  - N-gram analysis: parole ricorrenti nei search terms (1-gram, 2-gram, 3-gram)
  - Zero-conversion spend: totale speso su terms che non convertono
  - Intent theme clusters: raggruppamento search terms per intent
  - Raccomandazioni negative keywords

  ## SEZIONE 5: Quality Score

  GAQL Query 7 — QS con i 3 pilastri:
  ```
  SELECT
    ad_group_criterion.keyword.text,
    ad_group_criterion.quality_info.quality_score,
    ad_group_criterion.quality_info.creative_quality_score,
    ad_group_criterion.quality_info.search_predicted_ctr,
    ad_group_criterion.quality_info.post_click_quality_score,
    ad_group.name,
    campaign.name,
    metrics.impressions,
    metrics.cost_micros,
    metrics.clicks,
    metrics.conversions
  FROM keyword_view
  WHERE campaign.status = 'ENABLED'
    AND ad_group.status = 'ENABLED'
    AND ad_group_criterion.quality_info.quality_score IS NOT NULL
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ORDER BY metrics.impressions DESC
  LIMIT 200
  ```

  Calcola e presenta:
  - QS medio ponderato = SUM(QS * impressions) / SUM(impressions) → semaforo (🟢 >= 7.0 | 🟡 5.0-6.9 | 🔴 < 5.0)
  - Distribuzione QS: % keywords con QS 1-3, 4-6, 7-10
  - 3 Pilastri: Expected CTR, Ad Relevance, Landing Page Experience (distribuzione Above/Average/Below)
  - QS Priority Score = QS * Impressions * Ad Group Spend → top 20 keywords con QS basso e alto impatto
  - Impatto economico stimato: migliorare QS da X a Y risparmia Z% CPC
  - Raccomandazioni prioritizzate per pilastro

  ## OUTPUT FORMAT

  Rispondi con le 2 sezioni complete in markdown con:
  - Tabelle dati
  - Semafori (🟢🟡🔴) per ogni metrica chiave
  - Score 0-100 per ogni sezione
  - Top insight per sezione

  Lingua: Italiano.
```

---

**Agente 3 — Shopping & Feed** (Sezione 8)
```
subagent_type: gads-shopping-feeds
prompt: |
  Sei lo Shopping & Feed Analyst per il report Google Ads 2026.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT GIA' RACCOLTI:
  {campaign_list_data}

  IL TUO COMPITO: Produci la sezione Shopping del report.

  NOTA: Se l'account non ha campagne Shopping o PMax con feed, indica "N/A — Nessuna campagna Shopping attiva" e assegna score N/A.

  ## SEZIONE 8: Shopping & Feed

  GAQL Query 8 — Shopping performance per prodotto:
  Usa `mcp__google-ads__gads_shopping_performance_view(customer_id, start_date, end_date, limit=500)`

  GAQL Query 9 — PMax asset group performance:
  ```
  SELECT
    asset_group.id,
    asset_group.name,
    asset_group.status,
    campaign.name,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.clicks
  FROM asset_group
  WHERE campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ```

  GAQL Query 10 — Campagne Shopping/PMax IS:
  ```
  SELECT
    campaign.name,
    campaign.advertising_channel_type,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.search_impression_share,
    metrics.search_budget_lost_impression_share
  FROM campaign
  WHERE campaign.advertising_channel_type IN ('SHOPPING', 'PERFORMANCE_MAX')
    AND campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ```

  Calcola e presenta:
  - Zombie products % = Prodotti con 0 impressioni / Prodotti totali * 100 → semaforo (🟢 < 15% | 🟡 15-30% | 🔴 > 30%)
  - Hero concentration: % revenue dai top 10% prodotti
  - Feed coverage: prodotti attivi vs totali
  - Price competitiveness (se dati disponibili)
  - PMax vs Standard Shopping performance comparison
  - Asset group performance ranking
  - Raccomandazioni: zombie rescue, feed optimization, hybrid strategy

  ## OUTPUT FORMAT

  Rispondi con la sezione completa in markdown con:
  - Tabelle dati
  - Semafori (🟢🟡🔴)
  - Score 0-100 per la sezione
  - Top insight

  Lingua: Italiano.
```

---

**Agente 4 — Video & Creative** (Sezioni 3, 9)
```
subagent_type: gads-video-display
prompt: |
  Sei il Video & Creative Analyst per il report Google Ads 2026.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT GIA' RACCOLTI:
  {campaign_list_data}

  IL TUO COMPITO: Produci 2 sezioni del report usando GAQL queries + MCP tools.

  ## SEZIONE 3: Creative & Annunci

  GAQL Query 11 — RSA Ad Strength e performance:
  ```
  SELECT
    ad_group_ad.ad.responsive_search_ad.headlines,
    ad_group_ad.ad.responsive_search_ad.descriptions,
    ad_group_ad.ad.type,
    ad_group_ad.ad_strength,
    ad_group_ad.status,
    ad_group.name,
    campaign.name,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.clicks,
    metrics.ctr
  FROM ad_group_ad
  WHERE campaign.status = 'ENABLED'
    AND ad_group_ad.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ORDER BY metrics.cost_micros DESC
  LIMIT 100
  ```

  Presenta:
  - Ad Strength distribution: % Excellent, Good, Average, Poor → semaforo (🟢 Good+ > 70% | 🟡 40-70% | 🔴 < 40%)
  - RSA saturation: quanti ad group hanno 15 headline (massimo)
  - Top 10 ads per CTR e per conversioni
  - Ad type distribution: RSA, Responsive Display, Video, PMax
  - Headlines piu' performanti (pattern analysis)
  - Raccomandazioni creative con impatto stimato

  ## SEZIONE 9: Video & Demand Gen

  GAQL Query 12 — Video campaign metrics:
  ```
  SELECT
    campaign.name,
    campaign.advertising_channel_type,
    campaign.advertising_channel_sub_type,
    metrics.cost_micros,
    metrics.impressions,
    metrics.clicks,
    metrics.conversions,
    metrics.video_views,
    metrics.video_view_rate,
    metrics.average_cpv,
    metrics.video_quartile_p25_rate,
    metrics.video_quartile_p50_rate,
    metrics.video_quartile_p75_rate,
    metrics.video_quartile_p100_rate
  FROM campaign
  WHERE campaign.advertising_channel_type IN ('VIDEO', 'DEMAND_GEN')
    AND campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ```

  NOTA: Se non ci sono campagne Video/Demand Gen, indica "N/A — Nessuna campagna Video/Demand Gen attiva" e suggerisci l'attivazione.

  Presenta:
  - VTR (View-Through Rate) → semaforo (🟢 > 35% | 🟡 25-35% | 🔴 < 25%)
  - Completion rates (25%, 50%, 75%, 100%)
  - CPV medio e trend
  - Demand Gen performance (se presente)
  - Video sequencing assessment
  - Attributed brand search lift (se misurabile)
  - Raccomandazioni video strategy

  ## OUTPUT FORMAT

  Rispondi con le 2 sezioni complete in markdown con:
  - Tabelle dati
  - Semafori (🟢🟡🔴)
  - Score 0-100 per ogni sezione
  - Top insight per sezione

  Lingua: Italiano.
```

---

**Agente 5 — Tracking & Measurement** (Sezioni 6, 10)
```
subagent_type: gads-tracking-privacy
prompt: |
  Sei il Tracking & Measurement Analyst per il report Google Ads 2026.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT GIA' RACCOLTI:
  {account_overview_data}

  IL TUO COMPITO: Produci 2 sezioni del report usando GAQL queries + MCP tools.

  ## SEZIONE 6: Tracking & Salute Dati

  GAQL Query 13 — Conversion actions e attributi:
  ```
  SELECT
    conversion_action.name,
    conversion_action.type,
    conversion_action.status,
    conversion_action.category,
    conversion_action.counting_type,
    conversion_action.attribution_model_settings.attribution_model,
    conversion_action.include_in_conversions_bidding,
    metrics.conversions,
    metrics.all_conversions,
    metrics.conversions_value,
    metrics.all_conversions_value
  FROM conversion_action
  WHERE conversion_action.status = 'ENABLED'
  ```

  GAQL Query 14 — Conversion lag analysis:
  ```
  SELECT
    segments.conversion_lag_bucket,
    metrics.conversions,
    metrics.conversions_value
  FROM campaign
  WHERE campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ```

  Calcola e presenta:
  - Enhanced Conversions match rate proxy = all_conversions / conversions (per azione)
  - Conversion actions audit: quante azioni, quante in bidding, quante ridondanti
  - Attribution model distribution (DDA vs Last Click vs altri)
  - Conversion lag: % conversioni entro 1 giorno, 3 giorni, 7 giorni, 14+ giorni
  - Consent Mode v2 readiness assessment
  - Offline conversion import status
  - Raccomandazioni tracking prioritizzate

  ## SEZIONE 10: Misurazione Avanzata

  GAQL Query 15 — Geographic performance:
  ```
  SELECT
    geographic_view.country_criterion_id,
    geographic_view.location_type,
    metrics.cost_micros,
    metrics.conversions,
    metrics.conversions_value,
    metrics.impressions,
    metrics.clicks
  FROM geographic_view
  WHERE campaign.status = 'ENABLED'
    AND segments.date BETWEEN '{start_date}' AND '{end_date}'
  ORDER BY metrics.cost_micros DESC
  LIMIT 50
  ```

  Presenta:
  - DDA (Data-Driven Attribution) adoption: % conversioni con DDA
  - Cross-device conversion % (se disponibile da all_conversions vs conversions)
  - Geo analysis: top regioni/paesi per CPA e ROAS
  - Incrementality readiness: checklist (holdback experiments, brand lift, conversion lift)
  - Measurement maturity score: da L1 (solo last click) a L5 (full incrementality)
  - Raccomandazioni misurazione con roadmap

  ## OUTPUT FORMAT

  Rispondi con le 2 sezioni complete in markdown con:
  - Tabelle dati
  - Semafori (🟢🟡🔴)
  - Score 0-100 per ogni sezione
  - Top insight per sezione

  Lingua: Italiano.
```

---

### Step 4: SINTETIZZA IL REPORT FINALE

Attendi il completamento di tutti e 5 gli agenti, poi assembla il report finale.

#### Calcolo Scorecard 0-100

Raccogli lo score 0-100 di ogni sezione dai 5 agenti e calcola:

| # | Sezione | Peso |
|---|---------|------|
| 1 | Riepilogo Esecutivo | 15% |
| 2 | Breakdown Campagne | 10% |
| 3 | Creative & Annunci | 10% |
| 4 | Keyword & Search Terms | 12% |
| 5 | Quality Score | 10% |
| 6 | Tracking & Salute Dati | 12% |
| 7 | Bidding & Budget | 10% |
| 8 | Shopping & Feed | 8% |
| 9 | Video & Demand Gen | 5% |
| 10 | Misurazione Avanzata | 8% |

**Score Finale = SUM(Score_sezione * Peso)**

Se una sezione e' N/A (es. Shopping su account lead-gen), ridistribuisci il peso proporzionalmente.

Semaforo finale:
- 🟢 Score >= 75: Account ben ottimizzato
- 🟡 Score 50-74: Margine di miglioramento significativo
- 🔴 Score < 50: Intervento urgente necessario

#### Appendice: Arricchimento Competitivo (DataForSEO)

Se `--domain` e' fornito, usa i moduli DataForSEO per arricchire:
- `labs.domainRankOverview(client, { target: domain })` → organic traffic, keywords, rank
- `domainAnalytics.technologiesLookup(client, { target: domain })` → tech stack (GA4, GTM, ad pixels)
- `keywords.adTrafficByKeywords(client, { keywords: [top_brand_keywords] })` → benchmark CPC
- `labs.domainCompetitors(client, { target: domain, limit: 5 })` → competitor landscape

#### Template Output Finale

```markdown
# Report Google Ads 2026 — {domain o customer_id}

**Account ID:** {customer_id}
**Periodo:** {start_date} — {end_date}
**Tipo Business:** {business_type}
**Generato il:** {data_odierna}

---

## SCORECARD FINALE

| # | Area | Score | Stato | Insight Chiave |
|---|------|-------|-------|----------------|
| 1 | Riepilogo Esecutivo | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 2 | Breakdown Campagne | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 3 | Creative & Annunci | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 4 | Keyword & Search Terms | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 5 | Quality Score | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 6 | Tracking & Salute Dati | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 7 | Bidding & Budget | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 8 | Shopping & Feed | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 9 | Video & Demand Gen | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| 10 | Misurazione Avanzata | XX/100 | 🟢/🟡/🔴 | [1 riga] |
| | **SCORE COMPLESSIVO** | **XX/100** | **🟢/🟡/🔴** | |

---

## TOP 5 AZIONI PRIORITARIE

| # | Azione | Area | Impatto Stimato | Urgenza |
|---|--------|------|-----------------|---------|
| 1 | [Azione concreta] | [Sezione] | [€/% miglioramento] | 🔴 Immediata |
| 2 | [Azione concreta] | [Sezione] | [€/% miglioramento] | 🔴 Immediata |
| 3 | [Azione concreta] | [Sezione] | [€/% miglioramento] | 🟡 Questa settimana |
| 4 | [Azione concreta] | [Sezione] | [€/% miglioramento] | 🟡 Prossime 2 settimane |
| 5 | [Azione concreta] | [Sezione] | [€/% miglioramento] | 🟢 Prossimo mese |

---

## 1. Riepilogo Esecutivo
[Output Agente 1 — Sezione 1]

## 2. Breakdown Campagne
[Output Agente 1 — Sezione 2]

## 3. Creative & Annunci
[Output Agente 4 — Sezione 3]

## 4. Keyword & Search Terms
[Output Agente 2 — Sezione 4]

## 5. Quality Score
[Output Agente 2 — Sezione 5]

## 6. Tracking & Salute Dati
[Output Agente 5 — Sezione 6]

## 7. Bidding & Budget
[Output Agente 1 — Sezione 7]

## 8. Shopping & Feed
[Output Agente 3 — Sezione 8]

## 9. Video & Demand Gen
[Output Agente 4 — Sezione 9]

## 10. Misurazione Avanzata
[Output Agente 5 — Sezione 10]

---

## APPENDICE: Arricchimento Competitivo (DataForSEO)

### Domain Overview
| Metrica | Valore |
|---------|--------|
| Organic Traffic | XXX |
| Organic Keywords | XXX |
| Domain Rank | XX |
| Organic Cost Equivalent | $XXX |

### Tech Stack Rilevato
- Analytics: [GA4/GTM/...]
- Ad Pixels: [Google Ads Tag/...]
- CMS: [...]

### Benchmark CPC (Top Keywords)
| Keyword | Volume | CPC Medio | Competition |
|---------|--------|-----------|-------------|

### Competitor Landscape
| Competitor | Common Keywords | Traffic | Overlap |
|------------|----------------|---------|---------|

---

## Prossimi Step
- Implementare le Top 5 azioni prioritarie
- Schedulare review settimanale per monitorare progressi
- Prossimo report completo tra 30 giorni
```

### Step 5: SALVA OUTPUT

Salva il report completo in:
```
outputs/{YYYY-MM-DD}/gads-report-{customer_id}.md
```

Dove `{YYYY-MM-DD}` e' la data odierna e `{customer_id}` e' l'ID account (con trattini rimossi).

Crea la directory `outputs/{YYYY-MM-DD}/` se non esiste.

---

## Soglie Semaforo (Riferimento Completo)

| Metrica | 🟢 Verde | 🟡 Giallo | 🔴 Rosso |
|---------|----------|-----------|----------|
| ROAS | >= 4.0 | 2.0-3.99 | < 2.0 |
| Lost IS (Budget) | < 10% | 10-25% | > 25% |
| Lost IS (Rank) | < 15% | 15-30% | > 30% |
| QS Medio Ponderato | >= 7.0 | 5.0-6.9 | < 5.0 |
| Zombie Products % | < 15% | 15-30% | > 30% |
| VTR Video | > 35% | 25-35% | < 25% |
| Ad Strength Good+ | > 70% | 40-70% | < 40% |
| CTR Search | > 5% | 3-5% | < 3% |
| EC Match Rate | > 1.2x | 1.0-1.2x | ~1.0x |
| DDA Adoption | 100% | Parziale | 0% |
| Conversion Lag < 3d | > 70% | 50-70% | < 50% |
| Zero-Conv Spend % | < 15% | 15-30% | > 30% |

## Formule Chiave (Riferimento)

- `MER = Revenue totale / Spesa ads totale`
- `Profit ROAS = 1 / Margine` (es. 40% margine → 2.5x breakeven)
- `Weighted QS = SUM(QS * impressions) / SUM(impressions)`
- `QS Priority Score = QS * Impressions * Ad Group Spend` (ordinamento decrescente per trovare le keyword ad alto impatto con QS basso)
- `Zombie % = Prodotti 0 impressioni / Prodotti totali * 100`
- `EC Match Rate Proxy = all_conversions / conversions` (rapporto > 1.2 indica buon match rate Enhanced Conversions)
- `Budget Utilization = Spend effettivo / Budget giornaliero * 100`

## Regole

- Comunica SEMPRE in italiano
- Lanciare SEMPRE i 5 agenti in parallelo (un singolo messaggio con 5 Agent tool calls)
- Ogni sezione DEVE avere score 0-100 e semaforo
- Ogni criticita' DEVE avere una soluzione proposta con impatto economico stimato
- Se una sezione e' N/A (es. Shopping su account senza feed), segnalarlo chiaramente e ridistribuire il peso
- Tono professionale da consulente senior Google Ads
- Usare GAQL queries specifiche, NON inventare dati
- Se una GAQL query fallisce, documentare l'errore e procedere con i dati disponibili
- Il file output DEVE essere salvato in `outputs/`
