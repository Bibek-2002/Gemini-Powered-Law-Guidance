import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DownloadSectionProps {
  isDownloading: boolean;
  onDownload: () => void;
}

const DownloadSection: React.FC<DownloadSectionProps> = ({ isDownloading, onDownload }) => {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={styles.iconWrap}>
          <Ionicons name="download" size={18} color="#05111F" />
        </View>
        <View style={styles.sectionHeaderText}>
          <Text style={styles.sectionTitle}>Official FIR Format</Text>
          <Text style={styles.sectionDescription}>Download official DOCX template for reference.</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.primaryButton, isDownloading && styles.buttonDisabled]}
        onPress={onDownload}
        disabled={isDownloading}
      >
        {isDownloading ? (
          <ActivityIndicator color="#05111F" size="small" />
        ) : (
          <Ionicons name="download-outline" size={18} color="#05111F" />
        )}
        <Text style={styles.primaryButtonText}>{isDownloading ? 'Downloading...' : 'Download FIR Format'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 14,
    gap: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionHeaderText: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E9F3FF',
  },
  sectionDescription: {
    fontSize: 12,
    color: '#9FB4D1',
    lineHeight: 18,
    marginTop: 2,
  },
  primaryButton: {
    minHeight: 46,
    borderRadius: 11,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  primaryButtonText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default DownloadSection;
