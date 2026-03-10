export const LOCAL_CASES_KEY = 'local_cases';

export interface CaseRecord {
  id: number;
  caseHeading: string;
  query: string;
  applicableArticle?: string;
  description: string;
  status: string;
  tags?: string;
}

export interface DraftCaseRecord {
  caseHeading: string;
  userQuery: string;
  tags: string;
  description: string;
  caseStatus: string;
}
