import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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

const DocumentTileCard: React.FC<PdfCardProps> = ({ pdf, onDownload, isDownloading = false }) => {
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="document" size={20} color="#05111F" />
        </View>
        <View style={styles.copy}>
          <Text style={styles.title} numberOfLines={2}>{pdf.act_name}</Text>
          <Text style={styles.description} numberOfLines={3}>{pdf.description}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.button, isDownloading && styles.buttonDisabled]}
        onPress={() => onDownload(pdf.id)}
        disabled={isDownloading}
      >
        <Text style={[styles.buttonText, isDownloading && styles.buttonTextDisabled]}>
          {isDownloading ? 'Downloading...' : 'Download'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    marginBottom: 10,
    padding: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  copy: {
    flex: 1,
  },
  title: {
    color: '#EAF3FF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 6,
  },
  description: {
    color: '#A3B8D4',
    fontSize: 12,
    lineHeight: 17,
  },
  button: {
    alignSelf: 'flex-end',
    borderRadius: 9,
    backgroundColor: '#7DF9FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  buttonDisabled: {
    backgroundColor: '#6983A4',
  },
  buttonText: {
    color: '#05111F',
    fontSize: 12,
    fontWeight: '800',
  },
  buttonTextDisabled: {
    color: '#E6F0FF',
  },
});

export default DocumentTileCard;
