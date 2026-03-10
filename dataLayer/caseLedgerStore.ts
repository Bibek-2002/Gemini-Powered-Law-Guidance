import AsyncStorage from '@react-native-async-storage/async-storage';
import { CaseRecord, LOCAL_CASES_KEY } from '../models/caseModels';

const parseCasePayload = (rawValue: string | null): CaseRecord[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is CaseRecord => Boolean(item && typeof item === 'object' && item.id))
      .map((item) => ({
        id: Number(item.id),
        caseHeading: String(item.caseHeading ?? ''),
        query: String(item.query ?? ''),
        applicableArticle: typeof item.applicableArticle === 'string' ? item.applicableArticle : '',
        description: String(item.description ?? ''),
        status: String(item.status ?? ''),
        tags: typeof item.tags === 'string' ? item.tags : '',
      }));
  } catch {
    return [];
  }
};

export const loadCases = async (): Promise<CaseRecord[]> => {
  const rawValue = await AsyncStorage.getItem(LOCAL_CASES_KEY);
  return parseCasePayload(rawValue);
};

export const persistCases = async (cases: CaseRecord[]): Promise<void> => {
  await AsyncStorage.setItem(LOCAL_CASES_KEY, JSON.stringify(cases));
};
