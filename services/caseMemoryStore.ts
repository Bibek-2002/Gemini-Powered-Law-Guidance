import AsyncStorage from '@react-native-async-storage/async-storage';
import { MatterRecord, MATTER_LEDGER_STORAGE_KEY } from '../entities/caseTypes';

const decodeLedgerPayload = (rawValue: string | null): MatterRecord[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item): item is MatterRecord => Boolean(item && typeof item === 'object' && item.id))
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

export const readMatterLedger = async (): Promise<MatterRecord[]> => {
  const rawValue = await AsyncStorage.getItem(MATTER_LEDGER_STORAGE_KEY);
  return decodeLedgerPayload(rawValue);
};

export const writeMatterLedger = async (cases: MatterRecord[]): Promise<void> => {
  await AsyncStorage.setItem(MATTER_LEDGER_STORAGE_KEY, JSON.stringify(cases));
};




