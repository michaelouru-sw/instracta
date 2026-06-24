// Generates a module/lesson outline for a new course. Tries, in order:
// 1. The user's own AI provider key from Account Settings (profile.ai_provider
//    / profile.ai_api_key — Pro/Enterprise only, set via src/pages/Account.jsx)
// 2. VITE_OPENAI_API_KEY, if set (fine for local testing — move behind a
//    server/edge function before shipping to real users, since the key
//    would otherwise be exposed in the bundle)
// 3. A deterministic template, so the flow still works with zero config.

const SYSTEM_PROMPT = `You design course outlines for an eLearning authoring tool.
Given a topic, audience, and difficulty, return a JSON object:
{
  "modules": [
    { "title": "...", "lessons": [{ "title": "...", "type": "standard" }] }
  ]
}
Use 3-5 modules and 3-5 lessons per module. Lesson "type" must be one of:
standard, quiz, assignment, video, interactive. Return JSON only, no prose.`;

export async function generateOutline({ topic, audience, difficulty }, profile = null) {
  const input = { topic, audience, difficulty };

  if (profile?.ai_api_key && profile.ai_provider && profile.ai_provider !== "default") {
    try {
      return await generateWithProvider(profile.ai_provider, input, profile.ai_api_key);
    } catch (err) {
      console.error(`AI outline generation via ${profile.ai_provider} failed, falling back:`, err);
    }
  }

  const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  if (apiKey) {
    try {
      return await generateWithOpenAI(input, apiKey);
    } catch (err) {
      console.error("AI outline generation failed, falling back to template:", err);
    }
  }

  return generateTemplateOutline(input);
}

function generateWithProvider(provider, input, apiKey) {
  switch (provider) {
    case "openai":
      return generateWithOpenAI(input, apiKey);
    case "anthropic":
      return generateWithAnthropic(input, apiKey);
    case "gemini":
      return generateWithGemini(input, apiKey);
    default:
      throw new Error(`Unsupported AI provider: ${provider}`);
  }
}

async function generateWithOpenAI({ topic, audience, difficulty }, apiKey) {
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        {
          role: "user",
          content: `Topic: ${topic}\nAudience: ${audience}\nDifficulty: ${difficulty}`,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI request failed: ${res.status}`);
  const data = await res.json();
  return parseOutlineJson(data.choices[0].message.content);
}

async function generateWithAnthropic({ topic, audience, difficulty }, apiKey) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-5",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Topic: ${topic}\nAudience: ${audience}\nDifficulty: ${difficulty}`,
        },
      ],
    }),
  });
  if (!res.ok) throw new Error(`Anthropic request failed: ${res.status}`);
  const data = await res.json();
  return parseOutlineJson(data.content[0].text);
}

async function generateWithGemini({ topic, audience, difficulty }, apiKey) {
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${SYSTEM_PROMPT}\n\nTopic: ${topic}\nAudience: ${audience}\nDifficulty: ${difficulty}`,
              },
            ],
          },
        ],
        generationConfig: { responseMimeType: "application/json" },
      }),
    }
  );
  if (!res.ok) throw new Error(`Gemini request failed: ${res.status}`);
  const data = await res.json();
  return parseOutlineJson(data.candidates[0].content.parts[0].text);
}

function parseOutlineJson(text) {
  const parsed = JSON.parse(text);
  if (!Array.isArray(parsed.modules)) throw new Error("Malformed outline response");
  return parsed.modules;
}

function generateTemplateOutline({ topic }) {
  const stages = ["Foundations", "Core Concepts", "Practical Application", "Assessment & Review"];
  return stages.map((stage, i) => ({
    title: `Module ${i + 1}: ${stage} of ${topic}`,
    lessons: [
      { title: `Introduction to ${stage}`, type: "standard" },
      { title: `Key principles of ${stage.toLowerCase()}`, type: "standard" },
      i === stages.length - 1
        ? { title: `${topic} knowledge check`, type: "quiz" }
        : { title: `Applying ${stage.toLowerCase()} in practice`, type: "interactive" },
    ],
  }));
}
