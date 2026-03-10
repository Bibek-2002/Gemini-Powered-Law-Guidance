import React, { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Voice from 'react-native-voice';
import ConsoleHeaderCard from '../uiBlocks/QueryConsole/ConsoleHeaderCard';
import QueryComposer from '../uiBlocks/QueryConsole/QueryComposer';
import AnalysisPanel from '../uiBlocks/QueryConsole/AnalysisPanel';
import ExecuteAnalysisButton from '../uiBlocks/QueryConsole/ExecuteAnalysisButton';
import DraftReadyBanner from '../uiBlocks/QueryConsole/DraftReadyBanner';
import DraftCaseSheet from '../uiBlocks/QueryConsole/DraftCaseSheet';
import { fetchLegalAnalysis, LegalResponsePayload } from '../dataLayer/legalInsightGateway';
import { DraftCaseRecord, CaseRecord } from '../models/caseModels';
import { loadCases, persistCases } from '../dataLayer/caseLedgerStore';

const OUTPUT_PLACEHOLDER = 'Response will appear here...';

const createInitialDraft = (): DraftCaseRecord => ({
  caseHeading: '',
  userQuery: '',
  tags: '',
  description: '',
  caseStatus: 'closed',
});

const serializeActs = (acts: Record<string, string>): string => {
  return Object.entries(acts)
    .map(([section, reason]) => `**${section}** ${reason}`)
    .join('\n');
};

const QueryConsoleScreen: React.FC = () => {
  const [queryText, setQueryText] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<LegalResponsePayload | string>(OUTPUT_PLACEHOLDER);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [saveHintVisible, setSaveHintVisible] = useState<boolean>(false);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [requestError, setRequestError] = useState<string>('');
  const [draftCase, setDraftCase] = useState<DraftCaseRecord>(createInitialDraft());
  const [analysisActs, setAnalysisActs] = useState<Record<string, string>>({});

  const canSubmit = useMemo(() => Boolean(queryText.trim()) && !isSubmitting, [queryText, isSubmitting]);

  const toggleVoiceCapture = async (): Promise<void> => {
    try {
      if (voiceEnabled) {
        await Voice.stopListening();
      } else {
        await Voice.startListening();
      }
      setVoiceEnabled((current) => !current);
    } catch {
      setVoiceEnabled(false);
    }
  };

  const buildDraftFromAnalysis = (analysis: LegalResponsePayload): DraftCaseRecord => ({
    caseHeading: 'Legal Analysis Result',
    userQuery: queryText.trim(),
    tags: Object.keys(analysis.acts ?? {}).join(', '),
    description: analysis.description || 'Detailed case description here.',
    caseStatus: 'under investigation',
  });

  const runAnalysis = async (): Promise<void> => {
    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setRequestError('');

    try {
      const payload = await fetchLegalAnalysis(queryText.trim());
      setAnalysisResult(payload);
      setAnalysisActs(payload.acts ?? {});
      setDraftCase(buildDraftFromAnalysis(payload));
      setSaveHintVisible(true);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to process your query.';
      setRequestError(message);
      setAnalysisResult('');
      setAnalysisActs({});
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateDraftField = (field: string, value: string): void => {
    setDraftCase((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveCaseToLocalStore = async (): Promise<void> => {
    try {
      const existing = await loadCases();
      const newCase: CaseRecord = {
        id: Date.now(),
        caseHeading: draftCase.caseHeading,
        query: draftCase.userQuery,
        applicableArticle: serializeActs(analysisActs),
        description: draftCase.description,
        status: draftCase.caseStatus,
        tags: draftCase.tags,
      };

      await persistCases([newCase, ...existing]);
      Alert.alert('Success', 'Case saved successfully to local storage');
      setEditorOpen(false);
      setSaveHintVisible(false);
    } catch {
      Alert.alert('Error', 'Failed to save case locally');
    }
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <ConsoleHeaderCard />

      <View style={styles.noticeCard}>
        <Text style={styles.noticeLabel}>Tip</Text>
        <Text style={styles.noticeText}>Include facts, timeline, and location for better legal section mapping.</Text>
      </View>

      <View style={styles.stack}>
        <AnalysisPanel response={analysisResult} isLoading={isSubmitting} error={requestError} />

        <QueryComposer value={queryText} onChangeText={setQueryText} onMicPress={toggleVoiceCapture} isListening={voiceEnabled} />

        <ExecuteAnalysisButton onPress={runAnalysis} disabled={!canSubmit} />

        <DraftReadyBanner
          visible={saveHintVisible}
          onPress={() => {
            setSaveHintVisible(false);
            setEditorOpen(true);
          }}
        />

        <DraftCaseSheet
          visible={editorOpen}
          caseDetails={draftCase}
          onClose={() => setEditorOpen(false)}
          onSave={saveCaseToLocalStore}
          onInputChange={updateDraftField}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 30,
    gap: 12,
  },
  noticeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#25466D',
    backgroundColor: '#0D1B31',
    gap: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  noticeLabel: {
    color: '#F6A720',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  noticeText: {
    flex: 1,
    color: '#CFE0F6',
    fontSize: 12,
    lineHeight: 17,
  },
  stack: {
    gap: 12,
  },
});

export default QueryConsoleScreen;
