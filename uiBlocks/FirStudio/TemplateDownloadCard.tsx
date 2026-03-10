import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DownloadSectionProps {
  isDownloading: boolean;
  onDownload: () => void;
}

const TemplateDownloadCard: React.FC<DownloadSectionProps> = ({ isDownloading, onDownload }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconWrap}>
          <Ionicons name="download" size={18} color="#05111F" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.title}>Official FIR Format</Text>
          <Text style={styles.subtitle}>Download official DOCX template for reference.</Text>
        </View>
      </View>

      <TouchableOpacity style={[styles.button, isDownloading && styles.buttonDisabled]} onPress={onDownload} disabled={isDownloading}>
        {isDownloading ? <ActivityIndicator color="#05111F" size="small" /> : <Ionicons name="download-outline" size={18} color="#05111F" />}
        <Text style={styles.buttonText}>{isDownloading ? 'Downloading...' : 'Download FIR Format'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    marginBottom: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 12,
    padding: 14,
  },
  header: {
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
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#E9F3FF',
    fontSize: 16,
    fontWeight: '800',
  },
  subtitle: {
    color: '#9FB4D1',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 2,
  },
  button: {
    minHeight: 46,
    borderRadius: 11,
    backgroundColor: '#7DF9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default TemplateDownloadCard;
