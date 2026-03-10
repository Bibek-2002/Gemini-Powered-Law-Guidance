import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Alert, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import VaultHeaderCard from '../uiBlocks/DocketVault/VaultHeaderCard';
import VaultCaseTile from '../uiBlocks/DocketVault/VaultCaseTile';
import VaultCaseSheet from '../uiBlocks/DocketVault/VaultCaseSheet';
import ScrollResetButton from '../uiBlocks/DocketVault/ScrollResetButton';
import VaultEmptyPanel from '../uiBlocks/DocketVault/VaultEmptyPanel';
import { MatterRecord } from '../entities/caseTypes';
import { readMatterLedger, writeMatterLedger } from '../services/caseMemoryStore';

const DocketVaultScreen: React.FC = () => {
  const [ledgerRecords, setLedgerRecords] = useState<MatterRecord[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<MatterRecord | null>(null);
  const [isEditorEnabled, setIsEditorEnabled] = useState<boolean>(false);
  const [draftRecord, setDraftRecord] = useState<Partial<MatterRecord>>({});
  const [showScrollTopButton, setShowScrollTopButton] = useState<boolean>(false);
  const scrollRef = useRef<ScrollView>(null);

  const totalRecords = useMemo(() => ledgerRecords.length, [ledgerRecords.length]);

  const refreshLedger = useCallback(async () => {
    const stored = await readMatterLedger();
    setLedgerRecords(stored);
  }, []);

  useEffect(() => {
    refreshLedger();
  }, [refreshLedger]);

  const openRecord = (recordId: number, editMode: boolean): void => {
    const match = ledgerRecords.find((record) => record.id === recordId);
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

    const nextRecords = ledgerRecords.map((record) =>
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
      await writeMatterLedger(nextRecords);
      setLedgerRecords(nextRecords);
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
        <VaultHeaderCard count={totalRecords} />

        <View style={styles.infoBand}>
          <Text style={styles.infoText}>
            Tap any record to view full details. Use Edit to update tags, status, or descriptions.
          </Text>
        </View>

        {ledgerRecords.length === 0 ? (
          <VaultEmptyPanel />
        ) : (
          <FlatList
            data={ledgerRecords}
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
