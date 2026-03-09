import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TagList from './TagList';
import StatusBadge from './StatusBadge';

interface CaseItem {
  id: number;
  caseHeading: string;
  query: string;
  applicableArticle?: string;
  description: string;
  status: string;
  tags?: string;
}

interface CaseModalProps {
  visible: boolean;
  caseItem: CaseItem | null;
  isEditing: boolean;
  editedData: Partial<CaseItem>;
  onClose: () => void;
  onEditToggle: () => void;
  onSave: () => void;
  onInputChange: (name: string, value: string) => void;
  onRemoveTag: (index: number) => void;
}

const CaseModal: React.FC<CaseModalProps> = ({
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
  if (!caseItem) return null;

  const renderApplicableArticles = () => {
    if (!caseItem.applicableArticle) return null;

    const articles = caseItem.applicableArticle.split('**').filter((part, idx) => idx % 2 !== 0);

    return (
      <View style={styles.articlesContainer}>
        {articles.map((article, index) => (
          <Text key={index} style={styles.articleText}>
            * {article.trim()}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
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
              {isEditing ? (
                <TagList tags={editedData.tags} editable onRemoveTag={onRemoveTag} />
              ) : (
                <TagList tags={caseItem.tags} />
              )}
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
                renderApplicableArticles() || <Text style={styles.noDataText}>No applicable articles</Text>
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

              {isEditing && (
                <TouchableOpacity onPress={onSave} style={styles.saveButton}>
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </TouchableOpacity>
              )}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(4, 10, 24, 0.72)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: '#101D34',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
    borderWidth: 1,
    borderColor: '#294569',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingRight: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#EAF3FF',
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#A8C0DD',
    marginBottom: 8,
  },
  valueText: {
    fontSize: 16,
    color: '#A3B8D4',
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: '#294569',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#0A162A',
    color: '#EAF3FF',
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  articlesContainer: {
    backgroundColor: '#0A2230',
    padding: 12,
    borderRadius: 8,
  },
  articleText: {
    fontSize: 14,
    color: '#A3B8D4',
    marginBottom: 4,
    lineHeight: 20,
  },
  noDataText: {
    fontSize: 14,
    color: '#7993B5',
    fontStyle: 'italic',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    gap: 12,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#1A2E4C',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#C8DCF8',
    fontSize: 16,
    fontWeight: '500',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#7DF9FF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#05111F',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CaseModal;



