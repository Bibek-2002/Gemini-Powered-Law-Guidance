import axios from 'axios';

export interface LegalResponsePayload {
  acts: Record<string, string>;
  description: string;
}

interface GenerateContentResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
}

const GEMINI_MODEL = process.env.EXPO_PUBLIC_GEMINI_MODEL?.trim() || 'gemini-3-flash-preview';
const GEMINI_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const createPrompt = (query: string): string => {
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

const stripFences = (text: string): string => text.replace(/```json/gi, '').replace(/```/g, '').trim();

const parseJsonResponse = (rawText: string): unknown => {
  const compact = stripFences(rawText);
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

const normalizePayload = (payload: unknown): LegalResponsePayload => {
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

const getApiKey = (): string => {
  const key = process.env.EXPO_PUBLIC_GEMINI_API_KEY?.trim();
  if (!key) {
    throw new Error('Missing EXPO_PUBLIC_GEMINI_API_KEY in environment.');
  }
  return key;
};

const extractCandidateText = (response: GenerateContentResponse): string => {
  const joined =
    response.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? '')
      .join('\n')
      .trim() ?? '';
  return joined;
};

export const fetchLegalAnalysis = async (userInput: string): Promise<LegalResponsePayload> => {
  const apiKey = getApiKey();
  const url = `${GEMINI_ENDPOINT}?key=${encodeURIComponent(apiKey)}`;

  try {
    const response = await axios.post<GenerateContentResponse>(
      url,
      {
        contents: [{ parts: [{ text: createPrompt(userInput) }] }],
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 1024,
          responseMimeType: 'application/json',
        },
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    const candidateText = extractCandidateText(response.data);
    if (!candidateText) {
      throw new Error('Gemini returned an empty response.');
    }

    const parsed = parseJsonResponse(candidateText);
    const normalized = normalizePayload(parsed);

    if (!normalized.description && Object.keys(normalized.acts).length === 0) {
      throw new Error('Gemini response did not contain legal analysis.');
    }

    return normalized;
  } catch (error: unknown) {
    const apiMessage = (
      error as { response?: { data?: { error?: { message?: string } } } }
    ).response?.data?.error?.message;
    const fallbackMessage = error instanceof Error ? error.message : 'Failed to fetch legal analysis.';
    throw new Error(apiMessage || fallbackMessage);
  }
};
