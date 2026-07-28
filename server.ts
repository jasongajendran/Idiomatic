import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", name: "Idiomatic API" });
});

app.post("/api/translate", async (req, res) => {
  try {
    const { text, tone = "balanced" } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text string is required" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const prompt = `You are Idiomatic, an expert tech workplace jargon translator and code mapper.
Analyze the following text (corporate email, Slack message, or PR comment):
"""${text}"""

Return a JSON object ONLY (no markdown formatting, no code fences, pure valid JSON) with the following structure:
{
  "jargonIndex": number (0 to 100 representing jargon density),
  "summaryTone": string (e.g. "Passive Aggressive Corporate", "Polite Pressure", "Dev Lead Trade-off"),
  "detectedJargon": [
    {
      "term": string,
      "literal": string,
      "realMeaning": string,
      "codeAnalogy": string (short pseudocode/JS snippet),
      "alternative": string
    }
  ],
  "plainEnglish": string (direct, honest translation of what is actually meant),
  "codeFunctionMapping": string (a valid executable-looking TypeScript/JS function snippet representing the logic behind this corporate message),
  "suggestedResponses": {
    "directTechnical": string,
    "diplomatic": string,
    "executiveSummary": string
  }
}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
        });

        let raw = response.text?.trim() || "";
        if (raw.startsWith("```json")) {
          raw = raw.replace(/^```json\s*/, "").replace(/\s*```$/, "");
        } else if (raw.startsWith("```")) {
          raw = raw.replace(/^```\s*/, "").replace(/\s*```$/, "");
        }

        const parsed = JSON.parse(raw);
        return res.json({ success: true, data: parsed, source: "gemini" });
      } catch (err) {
        console.warn("Gemini API call failed, falling back to local heuristic parser:", err);
      }
    }

    // Heuristic fallback parser
    const fallback = parseJargonLocally(text, tone);
    return res.json({ success: true, data: fallback, source: "local" });
  } catch (error) {
    console.error("Translation error:", error);
    return res.status(500).json({ error: "Failed to process translation" });
  }
});

function parseJargonLocally(text: string, tone: string) {
  const lower = text.toLowerCase();
  const detectedJargon: Array<{
    term: string;
    literal: string;
    realMeaning: string;
    codeAnalogy: string;
    alternative: string;
  }> = [];

  const dictionary: Record<string, { literal: string; realMeaning: string; codeAnalogy: string; alternative: string }> = {
    "circle back": {
      literal: "Loop around in a circular direction",
      realMeaning: "I don't have an answer right now or want to postpone this until you forget.",
      codeAnalogy: "setInterval(discussTopic, 86400000); // Deferred indefinitely",
      alternative: "Let's revisit this on Friday after checking the metrics."
    },
    "move the needle": {
      literal: "Physically shift a gauge needle",
      realMeaning: "Make a measurable, quantifiable impact on key business metrics.",
      codeAnalogy: "if (metric.delta > 0.15) { notifyStakeholders(); }",
      alternative: "Achieve measurable performance improvement."
    },
    "take it offline": {
      literal: "Disconnect from the internet",
      realMeaning: "Stop clogging this group meeting with a niche debate that only 2 people care about.",
      codeAnalogy: "groupThread.filter(msg => !isNicheDebate).dispatch();",
      alternative: "Let's schedule a 10-min 1-on-1 to align."
    },
    "bandwidth": {
      literal: "Data rate supported by a network connection",
      realMeaning: "Available time, energy, or cognitive capacity to take on new tasks.",
      codeAnalogy: "const availableCapacity = maxLimit - currentWorkload.length;",
      alternative: "I do not have capacity for additional tasks this sprint."
    },
    "bikeshedding": {
      literal: "Debating the color of a bicycle shed",
      realMeaning: "Spending disproportionate time discussing trivial details while ignoring complex core logic.",
      codeAnalogy: "if (PR.hasTrivialColorChange && !PR.hasCoreArchitecturalFix) { warn(); }",
      alternative: "Focus on critical architecture first."
    },
    "yagni": {
      literal: "You Ain't Gonna Need It",
      realMeaning: "Don't build premature abstractions or features until they are actually required.",
      codeAnalogy: "function buildFeature() { if (!actualDemand) return null; }",
      alternative: "Keep scope strictly focused on current needs."
    },
    "technical debt": {
      literal: "Financial debt incurred by technology",
      realMeaning: "Implied future cost of rework caused by choosing an easy, quick solution now instead of a proper architecture.",
      codeAnalogy: "let interestRate = 1.5; function applyShortcut() { maintenanceCost *= interestRate; }",
      alternative: "Short-term trade-off requiring scheduled refactoring."
    },
    "lgtm": {
      literal: "Looks Good To Me",
      realMeaning: "I skimmed your code, looks fine, please merge before CI breaks.",
      codeAnalogy: "if (PR.changes < 500) return 'Approved';",
      alternative: "Code reviewed and approved for merge."
    }
  };

  let jargonCount = 0;
  for (const [key, val] of Object.entries(dictionary)) {
    if (lower.includes(key)) {
      jargonCount++;
      detectedJargon.push({
        term: key.toUpperCase(),
        literal: val.literal,
        realMeaning: val.realMeaning,
        codeAnalogy: val.codeAnalogy,
        alternative: val.alternative
      });
    }
  }

  const jargonIndex = Math.min(100, Math.max(15, Math.round((jargonCount * 25) + (text.length > 50 ? 20 : 5))));

  return {
    jargonIndex,
    summaryTone: jargonCount > 2 ? "Corporate Vernacular Heavy" : "Mixed Workplace Technical",
    detectedJargon,
    plainEnglish: `Core translation: "${text.trim()}". In plain tech terms: This message is asking for alignment and prioritizing deliverables without committing immediate resources.`,
    codeFunctionMapping: `function executeWorkplaceDirective(payload: { input: string }) {
  // Parsed Jargon Index: ${jargonIndex}%
  const capacity = checkDeveloperBandwidth();
  if (capacity.isExhausted) {
    throw new QueueFullException("Defer request to next sprint planning");
  }
  return { status: "DEFERRED", action: "Schedule 1-on-1 alignment" };
}`,
    suggestedResponses: {
      directTechnical: "Thanks for the note. I've logged this in Jira ticket ID-204 for sprint evaluation based on engineering priorities.",
      diplomatic: "Appreciate the update! Let's align on the scope during our upcoming sync so we can allocate bandwidth accordingly.",
      executiveSummary: "Acknowledged. Impact assessment queued for Q3 capacity planning."
    }
  };
}

// Start Server with Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Idiomatic Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
