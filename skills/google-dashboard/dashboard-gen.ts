import * as fs from "fs";
import * as path from "path";
import * as https from "https";

const SKILLS_DIR = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(__dirname, "output");
const ENV_PATH = path.join(__dirname, "..", "..", "..", ".env");

function loadEnv(): Record<string, string> {
  const env: Record<string, string> = {};
  if (fs.existsSync(ENV_PATH)) {
    const lines = fs.readFileSync(ENV_PATH, "utf-8").split("\n");
    for (const line of lines) {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) env[match[1].trim()] = match[2].trim();
    }
  }
  return env;
}

function collectSkillOutputs(): { skill: string; file: string; data: any }[] {
  const collected: { skill: string; file: string; data: any }[] = [];
  const skillDirs = fs.readdirSync(SKILLS_DIR, { withFileTypes: true });

  for (const dir of skillDirs) {
    if (!dir.isDirectory() || dir.name === "graphed-dashboard") continue;
    const outputPath = path.join(SKILLS_DIR, dir.name, "output");
    if (!fs.existsSync(outputPath)) continue;

    const files = fs.readdirSync(outputPath).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      try {
        const raw = fs.readFileSync(path.join(outputPath, file), "utf-8");
        const data = JSON.parse(raw);
        collected.push({ skill: dir.name, file, data });
      } catch {
        // skip
      }
    }
  }
  return collected;
}

function truncateData(data: any, maxItems = 20): any {
  if (Array.isArray(data)) return data.slice(0, maxItems);
  if (data?.tasks?.[0]?.result?.[0]?.items) {
    const clone = JSON.parse(JSON.stringify(data));
    clone.tasks[0].result[0].items = clone.tasks[0].result[0].items.slice(0, maxItems);
    return clone;
  }
  return data;
}

function callTheSys(
  apiKey: string,
  prompt: string,
  dataContext: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "c1/anthropic/claude-sonnet-4/v-20250930",
      messages: [
        {
          role: "system",
          content:
            "You are an expert data visualization assistant. Create rich, interactive dashboard components with charts, tables, cards, and KPIs. Use Card, Header, Table, DataTile, MiniCard, MiniCardBlock, BarChart, TextContent and other available components. Make the dashboard comprehensive and visually appealing.",
        },
        {
          role: "user",
          content: `${prompt}\n\nHere is the data to visualize:\n\n${dataContext}`,
        },
      ],
      stream: false,
    });

    const req = https.request(
      {
        hostname: "api.thesys.dev",
        path: "/v1/embed/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk: Buffer) => (data += chunk.toString()));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (json.error) {
              reject(new Error(json.error.message));
              return;
            }
            const content = json.choices?.[0]?.message?.content || "";
            resolve(content);
          } catch (e) {
            reject(e);
          }
        });
      }
    );

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function c1ToHtml(c1Response: string): string {
  // Extract JSON from <content thesys="true">...</content>
  const match = c1Response.match(/<content thesys="true">([\s\S]*?)<\/content>/);
  if (!match) return `<div class="card"><p>${c1Response}</p></div>`;

  let json: any;
  try {
    // Decode HTML entities
    const decoded = match[1]
      .replace(/&quot;/g, '"')
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&#39;/g, "'");
    json = JSON.parse(decoded);
  } catch {
    return `<div class="card"><pre>${match[1]}</pre></div>`;
  }

  return renderComponent(json.component || json);
}

function renderComponent(node: any): string {
  if (!node || typeof node === "string") return node || "";
  if (typeof node !== "object") return String(node);

  const { component, props } = node;
  if (!component) return "";

  const children = props?.children;
  const childHtml = Array.isArray(children)
    ? children.map(renderComponent).join("\n")
    : typeof children === "object"
      ? renderComponent(children)
      : children || "";

  switch (component) {
    case "Card":
      return `<div class="card">${childHtml}</div>`;
    case "Header":
      return `<div class="header"><h2>${props?.title || ""}</h2>${props?.subtitle ? `<p class="subtitle">${props.subtitle}</p>` : ""}</div>`;
    case "TextContent":
      return `<div class="text-content">${props?.textMarkdown || ""}</div>`;
    case "Table":
      return renderTable(props);
    case "DataTile":
      return `<div class="data-tile"><span class="amount">${props?.amount || ""}</span><span class="desc">${props?.description || ""}</span>${props?.child ? renderComponent(props.child) : ""}</div>`;
    case "MiniCard":
      return `<div class="mini-card">${props?.lhs ? renderComponent(props.lhs) : ""}${props?.rhs ? renderComponent(props.rhs) : ""}</div>`;
    case "MiniCardBlock":
      return `<div class="mini-card-block">${childHtml}</div>`;
    case "Icon":
      return `<span class="icon">${props?.name || ""}</span>`;
    case "BarChart":
    case "Chart":
      return renderChart(props);
    case "Badge":
      return `<span class="badge ${props?.variant || ""}">${props?.label || props?.text || childHtml}</span>`;
    case "Divider":
      return `<hr class="divider">`;
    case "Accordion":
      return `<details class="accordion"><summary>${props?.title || ""}</summary>${childHtml}</details>`;
    case "AccordionItem":
      return `<details class="accordion-item"><summary>${props?.title || ""}</summary>${childHtml}</details>`;
    case "List":
      return `<ul class="list">${childHtml}</ul>`;
    case "ListItem":
      return `<li class="list-item">${props?.title ? `<strong>${props.title}</strong>` : ""}${props?.description ? `<span>${props.description}</span>` : ""}${childHtml}</li>`;
    case "ProgressBar":
      return `<div class="progress-bar"><div class="progress-fill" style="width:${props?.value || 0}%"></div><span>${props?.label || ""} ${props?.value || 0}%</span></div>`;
    case "Link":
      return `<a href="${props?.url || "#"}" target="_blank">${props?.label || childHtml}</a>`;
    case "Image":
      return `<img src="${props?.src || ""}" alt="${props?.alt || ""}" class="image">`;
    default:
      return `<div class="${component.toLowerCase()}">${childHtml || JSON.stringify(props || {}, null, 2)}</div>`;
  }
}

function renderTable(props: any): string {
  const headers = props?.headers || props?.columns || [];
  const rows = props?.rows || props?.data || [];
  if (!headers.length && !rows.length) return "";

  let html = `<div class="table-wrapper"><table>`;
  if (headers.length) {
    html += `<thead><tr>${headers.map((h: any) => `<th>${typeof h === "string" ? h : h?.label || h?.title || ""}</th>`).join("")}</tr></thead>`;
  }
  if (rows.length) {
    html += `<tbody>`;
    for (const row of rows) {
      const cells = Array.isArray(row) ? row : row?.cells || Object.values(row);
      html += `<tr>${cells.map((c: any) => `<td>${typeof c === "object" ? (c?.value ?? c?.text ?? renderComponent(c)) : c}</td>`).join("")}</tr>`;
    }
    html += `</tbody>`;
  }
  html += `</table></div>`;
  return html;
}

function renderChart(props: any): string {
  const data = props?.data || props?.bars || [];
  if (!data.length) return `<div class="chart-placeholder">Chart data unavailable</div>`;

  const maxVal = Math.max(...data.map((d: any) => d.value || d.y || 0));
  let html = `<div class="bar-chart">`;
  for (const d of data) {
    const val = d.value || d.y || 0;
    const label = d.label || d.x || d.name || "";
    const pct = maxVal > 0 ? (val / maxVal) * 100 : 0;
    html += `<div class="bar-row"><span class="bar-label">${label}</span><div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div><span class="bar-value">${val.toLocaleString()}</span></div>`;
  }
  html += `</div>`;
  return html;
}

function generateHtmlPage(dashboardHtml: string, title: string): string {
  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0f1117; color: #e1e4e8; padding: 24px; min-height: 100vh; }
  .dashboard { max-width: 1200px; margin: 0 auto; }
  .dashboard-title { font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #fff; }
  .dashboard-subtitle { font-size: 14px; color: #8b949e; margin-bottom: 32px; }
  .card { background: #161b22; border: 1px solid #30363d; border-radius: 12px; padding: 24px; margin-bottom: 20px; }
  .header h2 { font-size: 20px; font-weight: 600; color: #f0f6fc; margin-bottom: 4px; }
  .header .subtitle { font-size: 14px; color: #8b949e; margin-bottom: 16px; }
  .text-content { font-size: 15px; line-height: 1.6; color: #c9d1d9; }
  .mini-card-block { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; margin: 16px 0; }
  .mini-card { background: #1c2128; border: 1px solid #30363d; border-radius: 10px; padding: 20px; }
  .data-tile { display: flex; flex-direction: column; gap: 4px; }
  .data-tile .amount { font-size: 28px; font-weight: 700; color: #58a6ff; }
  .data-tile .desc { font-size: 13px; color: #8b949e; }
  .icon { font-size: 12px; color: #3fb950; }
  .table-wrapper { overflow-x: auto; margin: 12px 0; }
  table { width: 100%; border-collapse: collapse; font-size: 14px; }
  thead { background: #1c2128; }
  th { padding: 12px 16px; text-align: left; color: #8b949e; font-weight: 600; border-bottom: 2px solid #30363d; }
  td { padding: 10px 16px; border-bottom: 1px solid #21262d; color: #c9d1d9; }
  tr:hover td { background: #1c2128; }
  .bar-chart { margin: 16px 0; }
  .bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 10px; }
  .bar-label { width: 140px; font-size: 13px; color: #8b949e; text-align: right; flex-shrink: 0; }
  .bar-track { flex: 1; height: 24px; background: #21262d; border-radius: 6px; overflow: hidden; }
  .bar-fill { height: 100%; background: linear-gradient(90deg, #388bfd, #58a6ff); border-radius: 6px; transition: width 0.5s ease; }
  .bar-value { width: 80px; font-size: 13px; color: #c9d1d9; font-weight: 600; }
  .badge { display: inline-block; padding: 2px 10px; border-radius: 20px; font-size: 12px; font-weight: 600; background: #1f6feb33; color: #58a6ff; }
  .badge.success, .badge.green { background: #23863533; color: #3fb950; }
  .badge.warning, .badge.yellow { background: #9e6a0333; color: #d29922; }
  .badge.error, .badge.red { background: #f8514933; color: #f85149; }
  .divider { border: none; border-top: 1px solid #21262d; margin: 16px 0; }
  .accordion, .accordion-item { border: 1px solid #30363d; border-radius: 8px; margin-bottom: 8px; }
  .accordion summary, .accordion-item summary { padding: 12px 16px; cursor: pointer; font-weight: 600; color: #c9d1d9; }
  .accordion > :not(summary), .accordion-item > :not(summary) { padding: 0 16px 16px; }
  .list { list-style: none; padding: 0; }
  .list-item { padding: 10px 0; border-bottom: 1px solid #21262d; }
  .list-item strong { color: #f0f6fc; margin-right: 8px; }
  .progress-bar { position: relative; height: 20px; background: #21262d; border-radius: 10px; overflow: hidden; margin: 8px 0; }
  .progress-fill { height: 100%; background: linear-gradient(90deg, #388bfd, #58a6ff); border-radius: 10px; }
  .progress-bar span { position: absolute; right: 8px; top: 2px; font-size: 12px; color: #fff; }
  a { color: #58a6ff; text-decoration: none; }
  a:hover { text-decoration: underline; }
  .image { max-width: 100%; border-radius: 8px; }
  .chart-placeholder { padding: 40px; text-align: center; color: #484f58; font-style: italic; }
  .meta { text-align: center; margin-top: 40px; padding: 20px; color: #484f58; font-size: 12px; }
</style>
</head>
<body>
<div class="dashboard">
  <div class="dashboard-title">${title}</div>
  <div class="dashboard-subtitle">Generated by TheSys C1 &mdash; ${new Date().toLocaleString("it-IT")}</div>
  ${dashboardHtml}
  <div class="meta">Powered by TheSys C1 Generative UI &times; Anti-Gravity SEO Suite</div>
</div>
</body>
</html>`;
}

async function main() {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const env = loadEnv();
  const apiKey = process.env.THESYS_API_KEY || env.THESYS_API_KEY;

  if (!apiKey) {
    console.error("[Dashboard] THESYS_API_KEY not found in .env or environment");
    process.exit(1);
  }

  const customPrompt = process.argv.slice(2).join(" ");

  console.log("[Dashboard] Collecting skill outputs...");
  const outputs = collectSkillOutputs();

  if (outputs.length === 0) {
    console.log("[Dashboard] No skill outputs found. Run some skills first.");
    console.log("  Example: npx tsx .claude/skills/keyword-volume/script.ts 'seo tools'");
    process.exit(1);
  }

  console.log(`[Dashboard] Found ${outputs.length} files from ${new Set(outputs.map((o) => o.skill)).size} skills`);

  // Prepare data summary for TheSys
  const dataSummary = outputs
    .map((o) => {
      const truncated = truncateData(o.data);
      return `### ${o.skill} / ${o.file}\n\`\`\`json\n${JSON.stringify(truncated, null, 2).slice(0, 3000)}\n\`\`\``;
    })
    .join("\n\n");

  const prompt =
    customPrompt ||
    "Create a comprehensive SEO dashboard with: 1) KPI cards showing key metrics at the top, 2) tables with the most important data, 3) bar charts for comparisons. Make it professional and data-rich. Use all the data provided.";

  console.log("[Dashboard] Calling TheSys C1 API...");
  const c1Response = await callTheSys(apiKey, prompt, dataSummary);

  // Save raw C1 response
  fs.writeFileSync(path.join(OUTPUT_DIR, "c1-response.json"), c1Response);
  console.log("[Dashboard] C1 response saved to output/c1-response.json");

  // Convert to HTML
  const dashboardHtml = c1ToHtml(c1Response);
  const title = customPrompt ? "Custom Dashboard" : "SEO Analytics Dashboard";
  const fullPage = generateHtmlPage(dashboardHtml, title);

  const htmlPath = path.join(OUTPUT_DIR, "dashboard.html");
  fs.writeFileSync(htmlPath, fullPage);
  console.log(`[Dashboard] Dashboard saved to ${htmlPath}`);
  console.log(`[Dashboard] Open in browser: file://${htmlPath}`);
}

main().catch((err) => {
  console.error("[Dashboard] Error:", err.message);
  process.exit(1);
});
