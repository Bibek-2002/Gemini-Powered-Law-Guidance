import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PdfItem {
  id: number;
  act_name: string;
  description: string;
}

interface PdfCardProps {
  pdf: PdfItem;
  onDownload: (id: number) => void;
  isDownloading?: boolean;
}

const PdfCard: React.FC<PdfCardProps> = ({ pdf, onDownload, isDownloading = false }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Ionicons name="document" size={20} color="#05111F" />
        </View>
        <View style={styles.info}>
          <Text style={styles.title} numberOfLines={2}>
            {pdf.act_name}
          </Text>
          <Text style={styles.description} numberOfLines={3}>
            {pdf.description}
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.downloadButton, isDownloading && styles.downloadingButton]}
        onPress={() => onDownload(pdf.id)}
        disabled={isDownloading}
      >
        <Text style={[styles.downloadText, isDownloading && styles.downloadingText]}>
          {isDownloading ? 'Downloading...' : 'Download'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#294569',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#EAF3FF',
    marginBottom: 6,
    lineHeight: 20,
  },
  description: {
    fontSize: 12,
    color: '#A3B8D4',
    lineHeight: 17,
  },
  downloadButton: {
    backgroundColor: '#7DF9FF',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 9,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  downloadingButton: {
    backgroundColor: '#6983A4',
  },
  downloadText: {
    color: '#05111F',
    fontSize: 12,
    fontWeight: '800',
  },
  downloadingText: {
    color: '#E6F0FF',
  },
});

export default PdfCard;
