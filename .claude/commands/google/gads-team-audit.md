---
name: gads:team-audit
description: Lancia il TEAM di 6 agenti paralleli per audit completo account Google Ads — PMax, RSA, Negative KW, Search Terms, Report, Feed
argument-hint: <customer_id> [--domain <domain>] [--start <YYYY-MM-DD>] [--end <YYYY-MM-DD>] [--business-type <ecommerce|lead-gen>]
allowed-tools:
  - Read
  - Bash
  - Write
  - Agent
  - mcp__google-ads__*
---

Lancia il TEAM di 6 agenti paralleli per audit completo account Google Ads.

## Input

$ARGUMENTS — Customer ID (obbligatorio), opzionalmente domain, date range, business type.

## Istruzioni

### Step 1: PARSA ARGOMENTI

Estrai da `$ARGUMENTS`:
- `customer_id` (obbligatorio) — ID account Google Ads (es. `123-456-7890`)
- `--domain` (opzionale) — Dominio per competitive intelligence
- `--start` (opzionale, default: 30 giorni fa) — Data inizio `YYYY-MM-DD`
- `--end` (opzionale, default: oggi) — Data fine `YYYY-MM-DD`
- `--business-type` (opzionale, default: `ecommerce`) — ecommerce o lead-gen

Se `customer_id` non e' fornito, chiedi all'utente.

### Step 2: PULL INIZIALE

Esegui **3 chiamate MCP in parallelo** per contesto base:

1. `mcp__google-ads__get_account_overview(customer_id, start_date, end_date, response_format="json")`
2. `mcp__google-ads__list_campaigns(customer_id, status="enabled", limit=100, response_format="json")`
3. `mcp__google-ads__get_campaign_performance(customer_id, start_date, end_date, status="enabled", limit=100, response_format="json")`

Salva i risultati come contesto condiviso.

### Step 3: LANCIA 6 AGENTI IN PARALLELO

Usa il **Agent tool** per lanciare 6 agenti contemporaneamente in un singolo messaggio.

---

**Agente 1 — PMax Auditor**
```
subagent_type: gads-pmax-auditor
prompt: |
  Esegui un audit completo delle campagne Performance Max.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT:
  {account_overview}
  {campaign_list}
  {campaign_performance}

  Usa i tool MCP mcp__google-ads__* per estrarre dati live.
  Segui il processo definito nel tuo agent file.
  Produci il report completo con issue P1/P2/P3 e score /100.

  Lingua: Italiano.
```

**Agente 2 — RSA Generator**
```
subagent_type: gads-rsa-generator
prompt: |
  Analizza le RSA esistenti e genera ottimizzazioni per i top 3 ad group.
  Account: {customer_id} | Periodo: {start_date} — {end_date}

  DATI ACCOUNT:
  {campaign_list}

  Usa i tool MCP mcp__google-ads__* per estrarre dati live.
  Segui il processo definito nel tuo agent file.
  Genera 15 headline + 4 description per ogni ad group selezionato.
  Produci il report completo con score /100.

  Lingua: Italiano. Headline/description in italiano (o lingua rilevata dall'account).
```

**Agente 3 — Negative KW Optimizer**
```
subagent_type: gads-negative-kw-optimizer
prompt: |
  Analizza search terms e genera negative keyword list ottimizzata.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT:
  {campaign_list}

  Usa i tool MCP mcp__google-ads__* per estrarre search terms report.
  Segui il processo definito nel tuo agent file.
  Esegui N-gram analysis e genera liste negative per livello (account/campagna).
  Produci il report completo con stima risparmio mensile e score /100.

  Lingua: Italiano.
```

**Agente 4 — Search Terms Analyzer**
```
subagent_type: gads-search-terms-analyzer
prompt: |
  Esegui mining search terms per scoprire keyword profittevoli.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}

  DATI ACCOUNT:
  {campaign_list}
  {campaign_performance}

  Usa i tool MCP mcp__google-ads__* per estrarre search terms e keyword performance.
  Segui il processo definito nel tuo agent file.
  Classifica ogni term in Tier 1-4 e per intent.
  Produci il report completo con keyword discovery e score /100.

  Lingua: Italiano.
```

**Agente 5 — Report Generator**
```
subagent_type: gads-report-generator
prompt: |
  Genera il report performance mensile per il cliente.
  Account: {customer_id} | Periodo: {start_date} — {end_date} | Business: {business_type}
  Client: {domain o customer_id}

  DATI ACCOUNT:
  {account_overview}
  {campaign_performance}

  Usa i tool MCP mcp__google-ads__* per dati trend e confronto periodo precedente.
  Segui il processo definito nel tuo agent file.
  Produci report completo con KPI, trend, insights e raccomandazioni.

  Lingua: Italiano.
```

**Agente 6 — Feed Optimizer** (solo se business_type = ecommerce)
```
subagent_type: gads-feed-optimizer
prompt: |
  Esegui audit e ottimizzazione feed Shopping/Merchant Center.
  Account: {customer_id} | Periodo: {start_date} — {end_date}
  Domain: {domain}

  DATI ACCOUNT:
  {campaign_list}

  Usa i tool MCP mcp__google-ads__* per dati shopping performance.
  Se domain fornito, usa DataForSEO per competitive intelligence.
  Segui il processo definito nel tuo agent file.
  Produci report con zombie analysis, title audit e custom label strategy.
  Score /100.

  NOTA: Se non ci sono campagne Shopping o PMax con feed, indica "N/A" e suggerisci attivazione.

  Lingua: Italiano.
```

**NOTA:** Se `business_type` NON e' `ecommerce`, lancia comunque l'Agente 6 ma specificagli di verificare se ci sono dati Shopping e produrre N/A se assenti.

### Step 4: SINTETIZZA

Attendi il completamento di tutti e 6 gli agenti, poi assembla il report finale.

```markdown
# Google Ads Team Audit — {domain o customer_id}

**Account ID:** {customer_id}
**Periodo:** {start_date} — {end_date}
**Business:** {business_type}
**Generato il:** {data_odierna}

---

## SCORECARD
| # | Area | Agente | Score | Stato |
|---|------|--------|-------|-------|
| 1 | PMax Campaigns | PMax Auditor | XX/100 | 🟢/🟡/🔴 |
| 2 | RSA & Ad Copy | RSA Generator | XX/100 | 🟢/🟡/🔴 |
| 3 | Negative Keywords | Neg KW Optimizer | XX/100 | 🟢/🟡/🔴 |
| 4 | Search Terms | Search Terms Analyzer | XX/100 | 🟢/🟡/🔴 |
| 5 | Performance Report | Report Generator | XX/100 | 🟢/🟡/🔴 |
| 6 | Shopping Feed | Feed Optimizer | XX/100 | 🟢/🟡/🔴 |
| | **MEDIA COMPLESSIVA** | | **XX/100** | **🟢/🟡/🔴** |

## TOP 5 AZIONI PRIORITARIE

Cross-reference gli insights di tutti e 6 gli agenti:
- Negative keyword da Search Terms → PMax asset optimization
- RSA headline patterns → Feed title optimization
- Zombie products → PMax restructuring

| # | Azione | Area | Agente | Impatto | Urgenza |
|---|--------|------|--------|---------|---------|
| 1 | [Azione] | [Area] | [Agente] | €{X} | 🔴 24h |
| 2 | [Azione] | [Area] | [Agente] | €{X} | 🔴 24h |
| 3 | [Azione] | [Area] | [Agente] | €{X} | 🟡 Settimana |
| 4 | [Azione] | [Area] | [Agente] | €{X} | 🟡 Settimana |
| 5 | [Azione] | [Area] | [Agente] | €{X} | 🟢 Mese |

## REPORT DETTAGLIATI

### 1. PMax Audit
[Output completo Agente 1]

### 2. RSA Optimization
[Output completo Agente 2]

### 3. Negative Keywords
[Output completo Agente 3]

### 4. Search Terms Analysis
[Output completo Agente 4]

### 5. Performance Report
[Output completo Agente 5]

### 6. Feed Optimization
[Output completo Agente 6]

---

## Prossimi Step
- Implementare azioni P1 (24h)
- Implementare azioni P2 (questa settimana)
- Schedulare review P3 (prossimo mese)
- Prossimo team audit tra 30 giorni
```

### Step 5: SALVA OUTPUT

Salva in: `outputs/{YYYY-MM-DD}/gads-team-audit-{customer_id}.md`

## Regole

- Comunica SEMPRE in italiano
- Lanciare SEMPRE i 6 agenti in parallelo (un singolo messaggio con 6 Agent tool calls)
- Ogni agente produce il suo report autonomamente con score /100
- Il report finale cross-referenzia insights tra agenti
- Ogni azione prioritaria ha impatto economico stimato
- Se un agente fallisce, documentare l'errore e procedere con gli altri 5
- Tono professionale da consulente senior Google Ads
