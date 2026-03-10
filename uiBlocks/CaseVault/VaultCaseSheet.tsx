import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TagList from './CaseTagChips';
import StatusBadge from './CaseStatusPill';
import { CaseRecord } from '../../models/caseModels';

interface CaseModalProps {
  visible: boolean;
  caseItem: CaseRecord | null;
  isEditing: boolean;
  editedData: Partial<CaseRecord>;
  onClose: () => void;
  onEditToggle: () => void;
  onSave: () => void;
  onInputChange: (name: string, value: string) => void;
  onRemoveTag: (index: number) => void;
}

const VaultCaseSheet: React.FC<CaseModalProps> = ({
  visible,
  caseItem,
  isEditing,
  editedData,
  onClose,
  onEditToggle,
  onSave,
  onInputChange,
  onRemoveTag,
}) => {
  if (!caseItem) {
    return null;
  }

  const renderApplicableArticles = (): React.ReactElement => {
    if (!caseItem.applicableArticle) {
      return <Text style={styles.noDataText}>No applicable articles</Text>;
    }

    const articleLines = caseItem.applicableArticle
      .split('**')
      .filter((_, index) => index % 2 !== 0)
      .map((line) => line.trim())
      .filter(Boolean);

    if (articleLines.length === 0) {
      return <Text style={styles.noDataText}>No applicable articles</Text>;
    }

    return (
      <View style={styles.articlesBox}>
        {articleLines.map((line, index) => (
          <Text key={`${line}-${index}`} style={styles.articleText}>* {line}</Text>
        ))}
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="#6B7280" />
          </TouchableOpacity>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Text style={styles.title}>{isEditing ? 'Edit Case' : 'Case Details'}</Text>
              <StatusBadge status={caseItem.status} />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Case Heading</Text>
              {isEditing ? (
                <TextInput
                  value={editedData.caseHeading || ''}
                  onChangeText={(text) => onInputChange('caseHeading', text)}
                  style={styles.input}
                  placeholder="Enter case heading"
                  placeholderTextColor="#7993B5"
                />
              ) : (
                <Text style={styles.valueText}>{caseItem.caseHeading}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Query</Text>
              {isEditing ? (
                <TextInput
                  value={editedData.query || ''}
                  onChangeText={(text) => onInputChange('query', text)}
                  style={[styles.input, styles.multilineInput]}
                  multiline
                  placeholder="Enter case query"
                  placeholderTextColor="#7993B5"
                />
              ) : (
                <Text style={styles.valueText}>{caseItem.query}</Text>
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Tags</Text>
              {isEditing ? <TagList tags={editedData.tags} editable onRemoveTag={onRemoveTag} /> : <TagList tags={caseItem.tags} />}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Applicable Articles</Text>
              {isEditing ? (
                <TextInput
                  value={editedData.applicableArticle || ''}
                  onChangeText={(text) => onInputChange('applicableArticle', text)}
                  style={styles.input}
                  placeholder="Enter applicable articles"
                  placeholderTextColor="#7993B5"
                />
              ) : (
                renderApplicableArticles()
              )}
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.valueText}>{caseItem.description}</Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              {isEditing ? (
                <TextInput
                  value={editedData.status || ''}
                  onChangeText={(text) => onInputChange('status', text)}
                  style={styles.input}
                  placeholder="Enter status"
                  placeholderTextColor="#7993B5"
                />
              ) : (
                <Text style={styles.valueText}>{caseItem.status}</Text>
              )}
            </View>

            <View style={styles.actions}>
              <TouchableOpacity onPress={onEditToggle} style={styles.editButton}>
                <Text style={styles.editButtonText}>{isEditing ? 'Cancel Edit' : 'Edit Case'}</Text>
              </TouchableOpacity>

              {isEditing ? (
                <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(4, 10, 24, 0.72)',
  },
  modal: {
    width: '90%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingRight: 30,
  },
  title: {
    flex: 1,
    color: '#EAF3FF',
    fontSize: 24,
    fontWeight: '700',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#A8C0DD',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  valueText: {
    color: '#A3B8D4',
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#0A162A',
    color: '#EAF3FF',
    fontSize: 16,
    padding: 12,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  articlesBox: {
    borderRadius: 8,
    backgroundColor: '#0A2230',
    padding: 12,
  },
  articleText: {
    color: '#A3B8D4',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  noDataText: {
    color: '#7993B5',
    fontSize: 14,
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 20,
  },
  editButton: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#1A2E4C',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  editButtonText: {
    color: '#C8DCF8',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  saveButtonText: {
    color: '#05111F',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default VaultCaseSheet;
