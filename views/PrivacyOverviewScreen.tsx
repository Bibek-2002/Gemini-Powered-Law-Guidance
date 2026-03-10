import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const privacySections = [
  {
    title: 'Data Scope',
    text: 'Gemini Powered Law Assistant stores case-related content locally to support history and workflow continuity.',
  },
  {
    title: 'Usage Purpose',
    text: 'Stored data is used only to power modules such as query history, saved cases, and incident exports.',
  },
  {
    title: 'Retention',
    text: 'Records remain on-device until the user edits or removes them using in-app controls.',
  },
  {
    title: 'External Services',
    text: 'Certain query responses may use configured AI providers depending on current setup.',
  },
  {
    title: 'Policy Updates',
    text: 'Policy content may be revised in future releases, effective from in-app publication date.',
  },
];

const PrivacyOverviewScreen: React.FC = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#16345D', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroTag}>Policy</Text>
        <Text style={styles.heroTitle}>Privacy Overview</Text>
        <Text style={styles.heroSubtitle}>How data is handled in the current Gemini Powered Law Assistant release.</Text>
      </LinearGradient>

      <View style={styles.sectionList}>
        {privacySections.map((section) => (
          <View key={section.title} style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionText}>{section.text}</Text>
          </View>
        ))}
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
  heroTag: {
    color: '#7DF9FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#EAF4FF',
    fontSize: 27,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionList: {
    gap: 10,
  },
  sectionCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    padding: 13,
  },
  sectionTitle: {
    color: '#E9F3FF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  sectionText: {
    color: '#9FB4D1',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PrivacyOverviewScreen;


