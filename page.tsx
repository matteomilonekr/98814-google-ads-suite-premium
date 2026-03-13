import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Suite Google Ads — Premium | Scalers",
  description:
    "38 skill, 50+ comandi slash, 21 agenti AI e 200+ funzioni API DataForSEO per Claude Code. Piano Premium completo.",
};

const standardCommands = {
  "SERP & Ranking": [
    { cmd: "/google:analyze-serp", desc: "Analisi SERP completa" },
    { cmd: "/google:track-rankings", desc: "Monitoraggio ranking" },
    { cmd: "/google:google-maps", desc: "Maps e local pack" },
    { cmd: "/google:google-specialty", desc: "Events, Jobs, AI Mode" },
    { cmd: "/google:google-finance", desc: "Dati finanziari" },
    { cmd: "/google:youtube-serp", desc: "SERP YouTube" },
    { cmd: "/google:other-engines", desc: "Bing, Yahoo, Baidu" },
  ],
  "Keyword Research": [
    { cmd: "/google:research-keywords", desc: "Ricerca keyword" },
    { cmd: "/google:keyword-volume", desc: "Volumi e CPC" },
    { cmd: "/google:keyword-suggestions", desc: "Espansione seed" },
    { cmd: "/google:keyword-for-site", desc: "Keyword per dominio" },
    { cmd: "/google:keyword-brand", desc: "Keyword brand" },
    { cmd: "/google:keyword-no-brand", desc: "Keyword non-brand" },
  ],
  Backlink: [
    { cmd: "/google:check-backlinks", desc: "Profilo backlink" },
    { cmd: "/google:backlink-monitoring", desc: "Nuovi e persi" },
    { cmd: "/google:backlink-bulk", desc: "Confronto bulk" },
  ],
  "On-Page": [
    { cmd: "/google:onpage-crawl", desc: "Crawl tecnico" },
    { cmd: "/google:onpage-issues", desc: "Problemi SEO" },
    { cmd: "/google:onpage-performance", desc: "Lighthouse / CWV" },
  ],
  Intelligence: [
    { cmd: "/google:find-competitors", desc: "Scoperta competitor" },
    { cmd: "/google:audit-site", desc: "Audit tecnico" },
    { cmd: "/google:analyze-content", desc: "Analisi contenuti" },
    { cmd: "/google:labs-keywords", desc: "Keyword intelligence" },
    { cmd: "/google:whois", desc: "WHOIS dominio" },
  ],
};

const premiumCommands = {
  "Google Ads": [
    { cmd: "/google:gads-report", desc: "Report 10 sezioni, 5 agenti, Scorecard 0-100" },
    { cmd: "/google:gads-team-audit", desc: "Audit 6 agenti: PMax, RSA, Neg KW, Search Terms, Report, Feed" },
  ],
  "AI & LLM Monitoring": [
    { cmd: "/google:monitor-ai", desc: "Risposte AI su ChatGPT, Claude, Gemini, Perplexity" },
    { cmd: "/google:llm-scraper", desc: "Scraping profondo ChatGPT e Gemini" },
    { cmd: "/google:llm-mentions", desc: "Menzioni brand nelle risposte AI" },
    { cmd: "/google:llm-responses", desc: "Risposte complete da tutti i LLM" },
  ],
  "E-Commerce & App": [
    { cmd: "/google:google-shopping", desc: "Prodotti, prezzi, seller" },
    { cmd: "/google:amazon", desc: "Prodotti, recensioni, ranking" },
    { cmd: "/google:app-store", desc: "App iOS: ranking, recensioni" },
    { cmd: "/google:google-play", desc: "App Android: ranking, recensioni" },
  ],
  "Business & Local": [
    { cmd: "/google:google-business", desc: "Google Business Profile" },
    { cmd: "/google:reviews", desc: "Trustpilot e Tripadvisor" },
    { cmd: "/google:social-media", desc: "Pinterest e Reddit" },
    { cmd: "/google:local-rankings", desc: "Local Falcon grid analysis" },
  ],
  "Content & Domain": [
    { cmd: "/google:generate-content", desc: "Testi SEO, meta tag, parafrasi" },
    { cmd: "/google:keyword-trends", desc: "Google Trends, analisi stagionale" },
    { cmd: "/google:labs-domain", desc: "Traffico, keyword, competitor" },
    { cmd: "/google:onpage-content", desc: "HTML, struttura, screenshot" },
    { cmd: "/google:content-search", desc: "Ricerca contenuti + sentiment" },
    { cmd: "/google:tech-detection", desc: "Stack tecnologico completo" },
  ],
  Dashboard: [
    { cmd: "/google:dashboard", desc: "Dashboard interattive via Graphed" },
  ],
};

const skills = [
  { cat: "SERP", count: 7, items: "Google Organic, Maps, Media, Specialty, Finance, YouTube, Other Engines" },
  { cat: "Keywords", count: 4, items: "Volume, Suggestions, For Site, Trends" },
  { cat: "Backlinks", count: 3, items: "Profile, Monitoring, Bulk" },
  { cat: "On-Page", count: 4, items: "Crawl, Issues, Performance, Content" },
  { cat: "Labs", count: 2, items: "Keywords, Domain" },
  { cat: "Content", count: 2, items: "Analysis, Generation" },
  { cat: "AI Optimization", count: 4, items: "AI Overview, LLM Scraper, LLM Mentions, LLM Responses" },
  { cat: "E-Commerce", count: 2, items: "Google Shopping, Amazon" },
  { cat: "Business Data", count: 4, items: "Google Business, Reviews, Social Media, Listings" },
  { cat: "Domain", count: 2, items: "Tech Detection, WHOIS" },
  { cat: "App Data", count: 2, items: "Google Play, App Store" },
  { cat: "Local", count: 1, items: "Local Falcon Grid" },
  { cat: "Dashboard", count: 1, items: "Graphed Interactive" },
];

const seoAgents = [
  { name: "SEO Audit Agent", desc: "Audit completo: crawl + backlink + ranking + raccomandazioni" },
  { name: "Keyword Research Agent", desc: "Ricerca keyword: espansione, clustering, opportunita" },
  { name: "Competitor Analysis Agent", desc: "Profiling competitor: discovery, confronto, gap analysis" },
  { name: "Content Strategy Agent", desc: "Gap analysis contenuti + calendario editoriale + topic cluster" },
  { name: "Local SEO Agent", desc: "SEO locale: listing, recensioni, ranking Maps" },
  { name: "Link Building Agent", desc: "Link building: link competitor, content outreach, broken link" },
];

const gadsStrategicAgents = [
  { name: "Account Strategist", desc: "Architettura account, naming, funnel, budget 70-20-10" },
  { name: "PMax Specialist", desc: "Performance Max, asset group, audience signal, feed-only vs full-asset" },
  { name: "Bidding Optimizer", desc: "Smart Bidding, value-based, portfolio, learning phase, stagionalita" },
  { name: "Tracking & Privacy", desc: "GA4, Enhanced Conversions, Consent Mode v2, server-side tagging" },
  { name: "Shopping & Feeds", desc: "Merchant Center, strategia ibrida PMax + Standard, promozioni" },
  { name: "Video & Display", desc: "YouTube Ads, Display, Demand Gen, Shorts, CTV, sequencing" },
  { name: "Scripts & Automation", desc: "Google Ads Scripts, weather trigger, N-gram, anomaly detection" },
  { name: "Quality & Ads", desc: "Quality Score, RSA 15 headline, estensioni, landing page" },
  { name: "Search & Keywords", desc: "AI Max for Search, match type, negative KW, RLSA, DSA" },
];

const gadsOperationalAgents = [
  { name: "PMax Auditor", desc: "Audit PMax: struttura, asset group, bidding, issue P1/P2/P3" },
  { name: "RSA Generator", desc: "RSA completi: 15 headline, 4 description, sitelink, callout" },
  { name: "Negative KW Optimizer", desc: "Analisi search terms, N-gram, espansione semantica" },
  { name: "Search Terms Analyzer", desc: "Mining: Tier 1-4, intent, long-tail, keyword competitor" },
  { name: "Report Generator", desc: "Report automatici: weekly/monthly, trend KPI, action plan" },
  { name: "Feed Optimizer", desc: "Audit titoli, zombie rescue, custom label, GTIN" },
];

function CommandSection({
  title,
  commands,
  accent,
}: {
  title: string;
  commands: Record<string, { cmd: string; desc: string }[]>;
  accent: string;
}) {
  return (
    <div>
      <h3 className={`mb-4 text-lg font-semibold ${accent}`}>{title}</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(commands).map(([category, cmds]) => (
          <div
            key={category}
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
          >
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
              {category}
            </h4>
            <ul className="space-y-2">
              {cmds.map((c) => (
                <li key={c.cmd} className="text-sm">
                  <code className="text-emerald-400">{c.cmd}</code>
                  <span className="ml-2 text-zinc-500">{c.desc}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PremiumPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Hero */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto max-w-5xl px-6 py-16 text-center">
          <div className="mb-4 inline-block rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400">
            Piano Premium
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Suite Google Ads
          </h1>
          <p className="mt-4 text-lg text-zinc-400">
            La soluzione completa per Google Ads + SEO su Claude Code — powered
            by DataForSEO
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { n: "38", l: "Skill" },
              { n: "50+", l: "Comandi" },
              { n: "21", l: "Agenti AI" },
              { n: "200+", l: "Funzioni API" },
            ].map((s) => (
              <div
                key={s.l}
                className="rounded-xl border border-zinc-800 bg-zinc-900 px-6 py-4 text-center"
              >
                <div className="text-2xl font-bold text-white">{s.n}</div>
                <div className="text-sm text-zinc-500">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-16 space-y-20">
        {/* Standard Commands */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            50+ Comandi <span className="text-amber-400">/google:*</span>
          </h2>
          <p className="mt-2 mb-8 text-zinc-400">
            Tutti i comandi Standard + esclusivi Premium
          </p>
          <div className="space-y-10">
            <CommandSection
              title="24 Comandi Standard (inclusi)"
              commands={standardCommands}
              accent="text-blue-400"
            />
            <CommandSection
              title="26+ Comandi Esclusivi Premium"
              commands={premiumCommands}
              accent="text-amber-400"
            />
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-white">38 Skill Eseguibili</h2>
          <p className="mt-2 text-zinc-400">
            Ogni skill = SKILL.md + script.ts + output JSON
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((s) => (
              <div
                key={s.cat}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="font-semibold text-white">{s.cat}</h3>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400">
                    {s.count}
                  </span>
                </div>
                <p className="mt-2 text-xs text-zinc-500">{s.items}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SEO Agents */}
        <section>
          <h2 className="text-2xl font-bold text-white">21 Agenti AI</h2>
          <p className="mt-2 text-zinc-400">
            6 SEO + 9 Google Ads strategici + 6 Google Ads operativi
          </p>

          <h3 className="mt-8 mb-4 text-lg font-semibold text-blue-400">
            6 Agenti SEO
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {seoAgents.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <h4 className="font-semibold text-white">{a.name}</h4>
                <p className="mt-2 text-sm text-zinc-400">{a.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-4 text-lg font-semibold text-amber-400">
            9 Agenti Google Ads 2026 — Strategia
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gadsStrategicAgents.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-amber-500/20 bg-zinc-900 p-5"
              >
                <h4 className="font-semibold text-white">{a.name}</h4>
                <p className="mt-2 text-sm text-zinc-400">{a.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-4 text-lg font-semibold text-amber-400">
            6 Agenti Google Ads — Operativi
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gadsOperationalAgents.map((a) => (
              <div
                key={a.name}
                className="rounded-xl border border-amber-500/20 bg-zinc-900 p-5"
              >
                <h4 className="font-semibold text-white">{a.name}</h4>
                <p className="mt-2 text-sm text-zinc-400">{a.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Setup */}
        <section>
          <h2 className="text-2xl font-bold text-white">Setup Rapido</h2>
          <div className="mt-6 rounded-xl border border-zinc-800 bg-zinc-900 p-6">
            <pre className="overflow-x-auto text-sm leading-relaxed">
              <code className="text-emerald-400">
{`# Credenziali
export DATAFORSEO_LOGIN=your_login
export DATAFORSEO_PASSWORD=your_password
export LOCAL_FALCON_API_KEY=your_key  # Per Local Falcon

# Installazione
npm install`}
              </code>
            </pre>
          </div>
        </section>

        {/* Comparison */}
        <section>
          <h2 className="text-2xl font-bold text-white">
            Standard vs Premium
          </h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-800 text-left">
                  <th className="py-3 pr-4 text-zinc-400">Feature</th>
                  <th className="py-3 px-4 text-center text-zinc-400">Standard</th>
                  <th className="py-3 pl-4 text-center text-amber-400">Premium</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/50">
                {[
                  ["SEO Toolkit completo", true, true],
                  ["24 comandi slash SEO", true, true],
                  ["6 agenti SEO", true, true],
                  ["9 agenti Google Ads strategici", false, true],
                  ["6 agenti Google Ads operativi", false, true],
                  ["Comandi team multi-agente", false, true],
                  ["AI/LLM Monitoring (4 skill)", false, true],
                  ["E-Commerce Intelligence", false, true],
                  ["App Store Intelligence", false, true],
                  ["Content Generation AI", false, true],
                  ["Local Falcon grid analysis", false, true],
                  ["Dashboard interattive", false, true],
                  ["Domain Intelligence (Labs)", false, true],
                ].map(([feature, std, prm]) => (
                  <tr key={feature as string}>
                    <td className="py-2.5 pr-4 text-zinc-300">{feature as string}</td>
                    <td className="py-2.5 px-4 text-center">
                      {std ? (
                        <span className="text-emerald-400">Si</span>
                      ) : (
                        <span className="text-zinc-600">—</span>
                      )}
                    </td>
                    <td className="py-2.5 pl-4 text-center">
                      <span className="text-emerald-400">Si</span>
                    </td>
                  </tr>
                ))}
                <tr className="border-t border-zinc-700 font-semibold">
                  <td className="py-3 pr-4 text-white">Totale</td>
                  <td className="py-3 px-4 text-center text-zinc-300">22 skill · 24 cmd · 6 agenti</td>
                  <td className="py-3 pl-4 text-center text-amber-400">38 skill · 50+ cmd · 21 agenti</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="rounded-2xl border border-amber-500/20 bg-zinc-900 p-10">
            <h2 className="text-2xl font-bold text-white">
              Pronto per iniziare?
            </h2>
            <p className="mt-3 text-zinc-400">
              Contattaci per attivare il Piano Premium e ottenere accesso a
              tutti i 21 agenti, 50+ comandi e 38 skill.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <a
                href="/suite-google-ads-standard"
                className="inline-block rounded-full border border-zinc-700 px-8 py-3 font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-white"
              >
                Vedi Piano Standard
              </a>
              <a
                href="mailto:info@joinscalers.com"
                className="inline-block rounded-full bg-amber-600 px-8 py-3 font-medium text-white transition-colors hover:bg-amber-500"
              >
                Contattaci
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-800 py-8 text-center text-sm text-zinc-600">
        Suite Google Ads by Matteo Milone — Piano Premium
      </footer>
    </div>
  );
}
