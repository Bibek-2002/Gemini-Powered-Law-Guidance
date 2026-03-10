import criminalOffenceDigest from './criminal_offence_digest.json';
import procedureTrackBnss from './procedure_track_bnss.json';
import evidenceLogicBsa from './evidence_logic_bsa.json';
import civilRemedyCompass from './civil_remedy_compass.json';
import motorClaimsPlaybook from './motor_claims_playbook.json';
import cyberComplianceSnapshot from './cyber_compliance_snapshot.json';

export interface StatuteSectionBrief {
  section: string;
  topic: string;
  note: string;
}

export interface StatuteBrief {
  code: string;
  title: string;
  objective: string;
  updated: string;
  sections: StatuteSectionBrief[];
}

type RawSection = Partial<StatuteSectionBrief> | null | undefined;
type RawDeck = Partial<StatuteBrief> & {
  sections?: RawSection[] | null;
};

const sanitizeText = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

const normalizeSection = (raw: RawSection): StatuteSectionBrief | null => {
  const section = sanitizeText(raw?.section);
  const topic = sanitizeText(raw?.topic);
  const note = sanitizeText(raw?.note);

  if (!section || !topic || !note) {
    return null;
  }

  return { section, topic, note };
};

const normalizeDeck = (raw: RawDeck): StatuteBrief | null => {
  const code = sanitizeText(raw.code);
  const title = sanitizeText(raw.title);
  const objective = sanitizeText(raw.objective);
  const updated = sanitizeText(raw.updated);
  const sections = (raw.sections ?? []).map(normalizeSection).filter((item): item is StatuteSectionBrief => item !== null);

  if (!code || !title || !objective || !updated || sections.length === 0) {
    return null;
  }

  return {
    code,
    title,
    objective,
    updated,
    sections,
  };
};

const rawDecks: RawDeck[] = [
  criminalOffenceDigest as RawDeck,
  procedureTrackBnss as RawDeck,
  evidenceLogicBsa as RawDeck,
  civilRemedyCompass as RawDeck,
  motorClaimsPlaybook as RawDeck,
  cyberComplianceSnapshot as RawDeck,
];

export const STATUTE_LIBRARY: StatuteBrief[] = rawDecks
  .map(normalizeDeck)
  .filter((deck): deck is StatuteBrief => deck !== null);

