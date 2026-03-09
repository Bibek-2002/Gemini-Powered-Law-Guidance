import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

const OfficialFIRFormat: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadDocx = async () => {
    setIsDownloading(true);
    try {
      const baseDir = (FileSystem as any).documentDirectory ?? (FileSystem as any).cacheDirectory ?? '';
      const fileUri = baseDir + 'FIR-Format.docx';

      await FileSystem.downloadAsync(
        'https://savelifefoundation.org/wp-content/uploads/2016/11/A1-Format-of-FIR-part-of-Step-I.docx',
        fileUri
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Download Complete', 'FIR format downloaded to device storage.');
      }
    } catch (error) {
      Alert.alert('Download Error', 'Unable to download FIR format right now.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.hero}>
        <View style={styles.iconWrap}>
          <Ionicons name="document-text" size={24} color="#05111F" />
        </View>
        <Text style={styles.title}>Official FIR Format</Text>
        <Text style={styles.subtitle}>Download the standard FIR template as a ready-to-share DOCX file.</Text>
      </LinearGradient>

      <TouchableOpacity style={styles.button} onPress={downloadDocx} disabled={isDownloading}>
        <Ionicons name={isDownloading ? 'sync' : 'download'} size={18} color="#05111F" />
        <Text style={styles.buttonText}>{isDownloading ? 'Downloading...' : 'Download FIR Format'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
    padding: 20,
    gap: 14,
  },
  hero: {
    borderRadius: 20,
    padding: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#26486D',
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#EAF4FF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  button: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  buttonText: {
    color: '#05111F',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default OfficialFIRFormat;
