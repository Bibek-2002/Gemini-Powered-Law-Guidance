export const MATTER_LEDGER_STORAGE_KEY = 'matter_ledger_records';

export interface MatterRecord {
  id: number;
  caseHeading: string;
  query: string;
  applicableArticle?: string;
  description: string;
  status: string;
  tags?: string;
}

export interface DraftMatterRecord {
  caseHeading: string;
  userQuery: string;
  tags: string;
  description: string;
  caseStatus: string;
}

