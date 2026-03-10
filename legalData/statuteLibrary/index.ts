import criminalOffenceDigest from './criminal_offence_digest.json';
import procedureTrackBnss from './procedure_track_bnss.json';
import evidenceLogicBsa from './evidence_logic_bsa.json';
import civilRemedyCompass from './civil_remedy_compass.json';
import motorClaimsPlaybook from './motor_claims_playbook.json';
import cyberComplianceSnapshot from './cyber_compliance_snapshot.json';

export interface StatuteSectionNote {
  section: string;
  topic: string;
  note: string;
}

export interface StatuteDeckBrief {
  code: string;
  title: string;
  objective: string;
  updated: string;
  sections: StatuteSectionNote[];
}

type RawSection = Partial<StatuteSectionNote> | null | undefined;
type RawDeck = Partial<StatuteDeckBrief> & {
  sections?: RawSection[] | null;
};

const sanitizeText = (value: unknown): string => {
  return typeof value === 'string' ? value.trim() : '';
};

const normalizeSection = (raw: RawSection): StatuteSectionNote | null => {
  const section = sanitizeText(raw?.section);
  const topic = sanitizeText(raw?.topic);
  const note = sanitizeText(raw?.note);

  if (!section || !topic || !note) {
    return null;
  }

  return { section, topic, note };
};

const normalizeDeck = (raw: RawDeck): StatuteDeckBrief | null => {
  const code = sanitizeText(raw.code);
  const title = sanitizeText(raw.title);
  const objective = sanitizeText(raw.objective);
  const updated = sanitizeText(raw.updated);
  const sections = (raw.sections ?? []).map(normalizeSection).filter((item): item is StatuteSectionNote => item !== null);

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

export const STATUTE_REFERENCE_LIBRARY: StatuteDeckBrief[] = rawDecks
  .map(normalizeDeck)
  .filter((deck): deck is StatuteDeckBrief => deck !== null);


