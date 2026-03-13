import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { transformStream } from "@crayonai/stream";
import { DBMessage, getMessageStore } from "./messageStore";
import fs from "fs";
import path from "path";

function loadJsonFiles(dir: string, label: string, sections: string[]) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      loadJsonFiles(fullPath, `${label}/${entry.name}`, sections);
      continue;
    }
    if (!entry.name.endsWith(".json")) continue;
    if (["c1-response.json", "dashboard-summary.json", "test-report.json", "real-test-report.json"].includes(entry.name)) continue;
    try {
      const raw = fs.readFileSync(fullPath, "utf-8");
      const data = JSON.parse(raw);

      let resultData = data;
      if (data?.tasks?.[0]?.result) {
        resultData = data.tasks[0].result;
      }

      const truncated = JSON.stringify(resultData, null, 2).slice(0, 4000);
      sections.push(`## ${label}/${entry.name}\n\`\`\`json\n${truncated}\n\`\`\``);
    } catch {
      // skip
    }
  }
}

function loadAllOutputs(): string {
  const suiteRoot = path.join(process.cwd(), "..");
  const sections: string[] = [];

  // 1. outputs/ directory (main data source)
  const outputsDir = path.join(suiteRoot, "outputs");
  if (fs.existsSync(outputsDir)) {
    const dateDirs = fs.readdirSync(outputsDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .sort((a, b) => b.name.localeCompare(a.name)); // most recent first
    if (dateDirs.length > 0) {
      loadJsonFiles(path.join(outputsDir, dateDirs[0].name), dateDirs[0].name, sections);
    }
  }

  // 2. .claude/skills/*/output/ (skill outputs)
  const skillsDir = path.join(suiteRoot, ".claude", "skills");
  if (fs.existsSync(skillsDir)) {
    const dirs = fs.readdirSync(skillsDir, { withFileTypes: true });
    for (const dir of dirs) {
      if (!dir.isDirectory()) continue;
      const outputDir = path.join(skillsDir, dir.name, "output");
      if (fs.existsSync(outputDir)) {
        loadJsonFiles(outputDir, `skills/${dir.name}`, sections);
      }
    }
  }

  return sections.length > 0
    ? sections.join("\n\n")
    : "No data found. Run some SEO skills first to generate data.";
}

const SYSTEM_PROMPT = `You are an expert SEO data analyst and dashboard designer for the Anti-Gravity SEO Suite.
You have access to real SEO data collected via DataForSEO API. Use this data to create rich, interactive dashboards.

When creating dashboards, use these components:
- Card, Header, MiniCardBlock, MiniCard, DataTile for KPIs
- Table with tableHeader and tableBody for data tables
- BarChartV2 for charts and comparisons
- TextContent for insights and analysis
- SectionBlock for organized sections
- TagBlock for status labels
- ProgressBar for metrics
- Badge for categories

Always create visually rich, data-driven responses. Show actual numbers from the data.
Respond in Italian when the user writes in Italian.

--- SEO DATA FROM SKILLS ---

${loadAllOutputs()}

--- END SEO DATA ---`;

export async function POST(req: NextRequest) {
  const { prompt, threadId, responseId } = (await req.json()) as {
    prompt: DBMessage;
    threadId: string;
    responseId: string;
  };
  const client = new OpenAI({
    baseURL: "https://api.thesys.dev/v1/embed/",
    apiKey: process.env.THESYS_API_KEY,
  });
  const messageStore = getMessageStore(threadId);

  // Inject system prompt on first message of thread
  if (messageStore.messageList.length === 0) {
    messageStore.addMessage({
      role: "system",
      content: SYSTEM_PROMPT,
    });
  }

  messageStore.addMessage(prompt);

  const llmStream = await client.chat.completions.create({
    model: "c1/anthropic/claude-sonnet-4/v-20250930",
    messages: messageStore.getOpenAICompatibleMessageList(),
    stream: true,
  });

  const responseStream = transformStream(
    llmStream,
    (chunk) => {
      return chunk.choices?.[0]?.delta?.content ?? "";
    },
    {
      onEnd: ({ accumulated }) => {
        const message = accumulated.filter((message) => message).join("");
        messageStore.addMessage({
          role: "assistant",
          content: message,
          id: responseId,
        });
      },
    }
  ) as ReadableStream<string>;

  return new NextResponse(responseStream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
