import React from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DraftCaseRecord } from '../../domain/caseModels';

interface CaseModalProps {
  visible: boolean;
  caseDetails: DraftCaseRecord;
  onClose: () => void;
  onSave: () => void;
  onInputChange: (key: string, value: string) => void;
}

const formFields: Array<{ label: string; key: keyof DraftCaseRecord; multiline?: boolean }> = [
  { label: 'Case Heading', key: 'caseHeading' },
  { label: 'User Query', key: 'userQuery' },
  { label: 'Tags', key: 'tags' },
  { label: 'Description', key: 'description', multiline: true },
  { label: 'Case Status', key: 'caseStatus' },
];

const DraftCaseSheet: React.FC<CaseModalProps> = ({ visible, caseDetails, onClose, onSave, onInputChange }) => {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <Text style={styles.title}>Case Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          {formFields.map((field) => (
            <View key={field.key} style={styles.fieldGroup}>
              <Text style={styles.label}>{field.label}</Text>
              <TextInput
                style={[styles.input, field.multiline && styles.textArea]}
                value={caseDetails[field.key]}
                onChangeText={(text) => onInputChange(field.key, text)}
                multiline={field.multiline}
                placeholder={`Enter ${field.label.toLowerCase()}`}
                placeholderTextColor="#7993B5"
              />
            </View>
          ))}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Ionicons name="save" size={20} color="#05111F" />
              <Text style={styles.saveButtonText}>Save Case</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
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
    maxHeight: '80%',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    color: '#EAF3FF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  fieldGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#A8C0DD',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
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
  textArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  actions: {
    marginTop: 20,
  },
  saveButton: {
    borderRadius: 8,
    backgroundColor: '#7DF9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    padding: 12,
  },
  saveButtonText: {
    color: '#05111F',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  cancelButton: {
    borderRadius: 8,
    backgroundColor: '#1A2E4C',
    alignItems: 'center',
    padding: 12,
  },
  cancelButtonText: {
    color: '#C8DCF8',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DraftCaseSheet;

