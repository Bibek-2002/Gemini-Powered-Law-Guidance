export interface GuidanceSummaryPayload {
  acts: Record<string, string>;
  description: string;
}

interface ModelContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

interface ApiErrorPayload {
  error?: {
    message?: string;
  };
}

const API_MODEL =
  process.env.EXPO_PUBLIC_LAW_ASSISTANT_MODEL?.trim() ||
  process.env.EXPO_PUBLIC_GEMINI_MODEL?.trim() ||
  'gemini-3-flash-preview';

const MODEL_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${API_MODEL}:generateContent`;

const buildGuidancePrompt = (query: string): string => {
  return `
You are an Indian legal workflow assistant.

Respond only as JSON using this schema:
{
  "acts": {
    "Section or Article": "Why it is relevant"
  },
  "description": "Actionable legal summary"
}

Rules:
- Use Indian law context only.
- Keep acts concise and practical.
- Do not output markdown or code fences.
- Keep description clear and directly usable.

User query:
${query}
`.trim();
};

const trimCodeFences = (text: string): string => {
  return text
    .replace(/```(?:json)?/gi, '')
    .replace(/```/g, '')
    .trim();
};

const normalizeJsonCandidate = (text: string): string => {
  return text
    .replace(/\uFEFF/g, '')
    .replace(/[\u201C\u201D]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .trim();
};

const stripTrailingCommas = (text: string): string => text.replace(/,\s*([}\]])/g, '$1');

const extractJsonObjectSegments = (text: string): string[] => {
  const segments: string[] = [];
  let depth = 0;
  let start = -1;
  let inString = false;
  let escaped = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];

    if (inString) {
      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }
      if (char === '"') {
        inString = false;
      }
      continue;
    }

    if (char === '"') {
      inString = true;
      continue;
    }

    if (char === '{') {
      if (depth === 0) {
        start = index;
      }
      depth += 1;
      continue;
    }

    if (char === '}' && depth > 0) {
      depth -= 1;
      if (depth === 0 && start >= 0) {
        segments.push(text.slice(start, index + 1));
        start = -1;
      }
    }
  }

  return segments;
};

const tryParseJsonCandidate = (candidate: string): unknown | null => {
  const normalized = normalizeJsonCandidate(candidate);
  const attempts = [normalized, stripTrailingCommas(normalized)];

  for (const attempt of attempts) {
    try {
      const parsed = JSON.parse(attempt);
      if (typeof parsed === 'string') {
        const inner = parsed.trim();
        if (
          (inner.startsWith('{') && inner.endsWith('}')) ||
          (inner.startsWith('[') && inner.endsWith(']'))
        ) {
          try {
            return JSON.parse(inner);
          } catch {
            return parsed;
          }
        }
      }
      return parsed;
    } catch {
      // Continue through parse attempts.
    }
  }

  return null;
};

const parseGuidanceJson = (rawText: string): unknown => {
  const compact = trimCodeFences(rawText);
  const candidates = [compact, ...extractJsonObjectSegments(compact)];

  for (const candidate of candidates) {
    const parsed = tryParseJsonCandidate(candidate);
    if (parsed !== null) {
      return parsed;
    }
  }

  throw new Error('Model returned invalid JSON response.');
};

const pickString = (...values: unknown[]): string => {
  for (const value of values) {
    if (typeof value === 'string' && value.trim()) {
      return value.trim();
    }
  }
  return '';
};

const extractActsFromText = (text: string): Record<string, string> => {
  const acts: Record<string, string> = {};
  const lines = text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  for (const line of lines) {
    const normalized = line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, '');
    const match = normalized.match(
      /^((?:section|article)\s+[A-Za-z0-9./()\- ]+)\s*[:\-]\s*(.+)$/i,
    );
    if (!match) {
      continue;
    }

    const section = match[1].trim();
    const reason = match[2].trim();
    if (section && reason) {
      acts[section] = reason;
    }
  }

  return acts;
};

const buildFallbackPayload = (rawText: string): GuidanceSummaryPayload => {
  const cleanText = trimCodeFences(rawText);
  return {
    acts: extractActsFromText(cleanText),
    description: cleanText,
  };
};

const normalizeGuidancePayload = (payload: unknown): GuidanceSummaryPayload => {
  if (!payload || typeof payload !== 'object') {
    if (typeof payload === 'string') {
      return buildFallbackPayload(payload);
    }
    return { acts: {}, description: '' };
  }

  const source = payload as { acts?: unknown; description?: unknown };
  const normalizedActs: Record<string, string> = {};

  if (source.acts && typeof source.acts === 'object' && !Array.isArray(source.acts)) {
    for (const [key, value] of Object.entries(source.acts as Record<string, unknown>)) {
      const normalizedKey = key.trim();
      const normalizedValue = String(value ?? '').trim();
      if (normalizedKey && normalizedValue) {
        normalizedActs[normalizedKey] = normalizedValue;
      }
    }
  }

  if (Array.isArray(source.acts)) {
    for (const actEntry of source.acts) {
      if (!actEntry || typeof actEntry !== 'object') {
        continue;
      }

      const item = actEntry as Record<string, unknown>;
      const section = pickString(
        item.section,
        item.article,
        item.act,
        item.title,
        item.name,
        item.heading,
      );
      const reason = pickString(
        item.reason,
        item.relevance,
        item.explanation,
        item.description,
        item.summary,
      );

      if (section && reason) {
        normalizedActs[section] = reason;
      }
    }
  }

  if (Object.keys(normalizedActs).length === 0) {
    for (const [key, value] of Object.entries(source as Record<string, unknown>)) {
      if (key.toLowerCase() === 'description' || key.toLowerCase() === 'summary' || key === 'acts') {
        continue;
      }

      const normalizedKey = key.trim();
      const normalizedValue = pickString(value);
      if (normalizedKey && normalizedValue) {
        normalizedActs[normalizedKey] = normalizedValue;
      }
    }
  }

  const description = pickString(
    source.description,
    (source as Record<string, unknown>).summary,
    (source as Record<string, unknown>).analysis,
    (source as Record<string, unknown>).actionableSummary,
  );

  return {
    acts: normalizedActs,
    description,
  };
};

const resolveApiKey = (): string => {
  const key =
    process.env.EXPO_PUBLIC_LAW_ASSISTANT_API_KEY?.trim() ||
    process.env.EXPO_PUBLIC_GEMINI_API_KEY?.trim();

  if (!key) {
    throw new Error('Missing EXPO_PUBLIC_LAW_ASSISTANT_API_KEY in environment.');
  }

  return key;
};

const extractCandidateText = (responsePayload: ModelContentResponse): string => {
  return (
    responsePayload.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('\n')
      .trim() ?? ''
  );
};

const getApiErrorMessage = async (response: Response): Promise<string | null> => {
  try {
    const raw = (await response.json()) as ApiErrorPayload;
    return raw.error?.message?.trim() || null;
  } catch {
    return null;
  }
};

export const requestGuidanceSummary = async (userInput: string): Promise<GuidanceSummaryPayload> => {
  const apiKey = resolveApiKey();
  const endpoint = `${MODEL_ENDPOINT}?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: buildGuidancePrompt(userInput) }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
      }),
    });

    if (!response.ok) {
      const apiMessage = await getApiErrorMessage(response);
      throw new Error(apiMessage || `Model request failed with status ${response.status}.`);
    }

    const payload = (await response.json()) as ModelContentResponse;
    const candidateText = extractCandidateText(payload);
    if (!candidateText) {
      throw new Error('Model returned an empty response.');
    }

    let normalized: GuidanceSummaryPayload;

    try {
      const parsed = parseGuidanceJson(candidateText);
      normalized = normalizeGuidancePayload(parsed);
    } catch {
      normalized = buildFallbackPayload(candidateText);
    }

    if (!normalized.description && Object.keys(normalized.acts).length === 0) {
      throw new Error('Model response did not contain legal analysis.');
    }

    return normalized;
  } catch (error: unknown) {
    const fallbackMessage = error instanceof Error ? error.message : 'Failed to fetch legal analysis.';
    throw new Error(fallbackMessage);
  }
};

