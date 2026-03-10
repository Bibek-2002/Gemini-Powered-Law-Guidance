import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import VaultHeaderCard from '../fragments/DocketVault/VaultHeaderCard';
import VaultCaseTile from '../fragments/DocketVault/VaultCaseTile';
import VaultCaseSheet from '../fragments/DocketVault/VaultCaseSheet';
import ScrollResetButton from '../fragments/DocketVault/ScrollResetButton';
import VaultEmptyPanel from '../fragments/DocketVault/VaultEmptyPanel';
import { CaseRecord } from '../domain/caseModels';
import { loadCases, persistCases } from '../integrations/caseLedgerStore';

const DocketVaultScreen: React.FC = () => {
  const [records, setRecords] = useState<CaseRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<CaseRecord | null>(null);
  const [isEditorEnabled, setIsEditorEnabled] = useState<boolean>(false);
  const [draftRecord, setDraftRecord] = useState<Partial<CaseRecord>>({});
  const [showScrollTopButton, setShowScrollTopButton] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const count = useMemo(() => records.length, [records.length]);

  const refreshRecords = useCallback(async () => {
    const stored = await loadCases();
    setRecords(stored);
  }, []);

  useEffect(() => {
    refreshRecords();
  }, [refreshRecords]);

  const openRecord = (recordId: number, editMode: boolean): void => {
    const match = records.find((record) => record.id === recordId);
    if (!match) {
      return;
    }
    setSelectedRecord(match);
    setDraftRecord(match);
    setIsEditorEnabled(editMode);
  };

  const closeModal = (): void => {
    setSelectedRecord(null);
    setIsEditorEnabled(false);
    setDraftRecord({});
  };

  const toggleEditor = (): void => {
    setIsEditorEnabled((current) => !current);
  };

  const patchDraftValue = (fieldName: string, fieldValue: string): void => {
    setDraftRecord((current) => ({
      ...current,
      [fieldName]: fieldValue,
    }));
  };

  const removeTagByIndex = (tagIndex: number): void => {
    const sourceTags = String(draftRecord.tags ?? selectedRecord?.tags ?? '');
    if (!sourceTags) {
      return;
    }

    const nextTags = sourceTags
      .replace(/[\[\]']+/g, '')
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);

    nextTags.splice(tagIndex, 1);
    patchDraftValue('tags', nextTags.join(', '));
  };

  const saveRecordChanges = async (): Promise<void> => {
    if (!selectedRecord) {
      return;
    }

    const nextRecords = records.map((record) =>
      record.id === selectedRecord.id
        ? {
            ...record,
            caseHeading: draftRecord.caseHeading || record.caseHeading,
            query: draftRecord.query || record.query,
            applicableArticle: draftRecord.applicableArticle ?? record.applicableArticle,
            description: draftRecord.description || record.description,
            status: draftRecord.status || record.status,
            tags: draftRecord.tags ?? record.tags,
          }
        : record
    );

    try {
      await persistCases(nextRecords);
      setRecords(nextRecords);
      closeModal();
      Alert.alert('Success', 'Changes saved successfully');
    } catch {
      Alert.alert('Error', 'Failed to save changes');
    }
  };

  const handleScroll = (yOffset: number): void => {
    setShowScrollTopButton(yOffset > 200);
  };

  const scrollToTop = (): void => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={(event) => handleScroll(event.nativeEvent.contentOffset.y)}
      >
        <VaultHeaderCard count={count} />

        <View style={styles.infoBand}>
          <Text style={styles.infoText}>
            Tap any record to view full details. Use Edit to update tags, status, or descriptions.
          </Text>
        </View>

        {records.length === 0 ? (
          <VaultEmptyPanel />
        ) : (
          <FlatList
            data={records}
            keyExtractor={(item) => String(item.id)}
            scrollEnabled={false}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <VaultCaseTile caseItem={item} onShowDetails={(id) => openRecord(id, false)} onEdit={(id) => openRecord(id, true)} />
            )}
          />
        )}
      </ScrollView>

      <ScrollResetButton visible={showScrollTopButton} onPress={scrollToTop} />

      <VaultCaseSheet
        visible={Boolean(selectedRecord)}
        caseItem={selectedRecord}
        isEditing={isEditorEnabled}
        editedData={draftRecord}
        onClose={closeModal}
        onEditToggle={toggleEditor}
        onSave={saveRecordChanges}
        onInputChange={patchDraftValue}
        onRemoveTag={removeTagByIndex}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  scrollView: {
    flex: 1,
  },
  infoBand: {
    marginHorizontal: 20,
    marginBottom: 8,
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#25466D',
    backgroundColor: '#0D1B31',
  },
  infoText: {
    color: '#D5E6FD',
    fontSize: 12,
    lineHeight: 17,
  },
  list: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 24,
  },
});

export default DocketVaultScreen;
