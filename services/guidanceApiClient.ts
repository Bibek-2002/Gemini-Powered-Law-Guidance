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

const trimCodeFences = (text: string): string => text.replace(/```json/gi, '').replace(/```/g, '').trim();

const parseGuidanceJson = (rawText: string): unknown => {
  const compact = trimCodeFences(rawText);
  try {
    return JSON.parse(compact);
  } catch {
    const start = compact.indexOf('{');
    const end = compact.lastIndexOf('}');
    if (start < 0 || end < 0 || end <= start) {
      throw new Error('Model returned invalid JSON response.');
    }
    return JSON.parse(compact.slice(start, end + 1));
  }
};

const normalizeGuidancePayload = (payload: unknown): GuidanceSummaryPayload => {
  if (!payload || typeof payload !== 'object') {
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

  return {
    acts: normalizedActs,
    description: typeof source.description === 'string' ? source.description.trim() : '',
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

    const parsed = parseGuidanceJson(candidateText);
    const normalized = normalizeGuidancePayload(parsed);

    if (!normalized.description && Object.keys(normalized.acts).length === 0) {
      throw new Error('Model response did not contain legal analysis.');
    }

    return normalized;
  } catch (error: unknown) {
    const fallbackMessage = error instanceof Error ? error.message : 'Failed to fetch legal analysis.';
    throw new Error(fallbackMessage);
  }
};

