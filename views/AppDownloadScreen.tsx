import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const APK_URL = 'https://drive.google.com/uc?export=download&id=1lPszpovE10_TFEdpZn9Ufbg13sfMSxAz';

const AppDownloadScreen: React.FC = () => {
  const openAndroidDownload = (): void => {
    Linking.openURL(APK_URL);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroLabel}>Install</Text>
        <Text style={styles.heroTitle}>Get Gemini-Powered-Law-Guidance</Text>
        <Text style={styles.heroSubtitle}>
          Download the latest Android package for full access to all legal workflow modules.
        </Text>
      </LinearGradient>

      <TouchableOpacity style={styles.platformCard} onPress={openAndroidDownload}>
        <View style={styles.platformIcon}>
          <Ionicons name="logo-android" size={24} color="#05111F" />
        </View>
        <View style={styles.platformCopy}>
          <Text style={styles.platformTitle}>Android Package</Text>
          <Text style={styles.platformSubtitle}>Direct APK delivery</Text>
        </View>
        <Ionicons name="download" size={20} color="#7DF9FF" />
      </TouchableOpacity>

      <View style={styles.notesCard}>
        <Text style={styles.notesTitle}>Release Notes</Text>
        <Text style={styles.notesText}>- Complete interface redesign</Text>
        <Text style={styles.notesText}>- Core legal modules preserved</Text>
        <Text style={styles.notesText}>- Streamlined navigation structure</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  content: {
    gap: 14,
    padding: 18,
    paddingBottom: 26,
  },
  hero: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#26486D',
    padding: 20,
  },
  heroLabel: {
    color: '#7DF9FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#EAF4FF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  platformCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
  },
  platformIcon: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  platformCopy: {
    flex: 1,
  },
  platformTitle: {
    color: '#E8F2FF',
    fontSize: 15,
    fontWeight: '700',
  },
  platformSubtitle: {
    color: '#9EB4D1',
    fontSize: 12,
    marginTop: 2,
  },
  notesCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#24466E',
    backgroundColor: '#0D1B31',
    gap: 5,
    padding: 14,
  },
  notesTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
    marginBottom: 3,
  },
  notesText: {
    color: '#D5E6FD',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default AppDownloadScreen;

