import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const sections = [
  {
    title: 'Data Scope',
    text: 'LawAI Mobile stores case-related content locally to support history and workflow continuity.',
  },
  {
    title: 'Usage Purpose',
    text: 'Stored data is used only to power modules such as query history, saved cases, and FIR exports.',
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

const PrivacyPolicy: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#16345D', '#0B4A6F']} style={styles.header}>
        <Text style={styles.headerTag}>Policy</Text>
        <Text style={styles.headerTitle}>Privacy Overview</Text>
        <Text style={styles.headerSubtitle}>
          How data is handled in the current LawAI Mobile release.
        </Text>
      </LinearGradient>

      <View style={styles.sectionWrap}>
        {sections.map((section) => (
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
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 26,
    gap: 14,
  },
  header: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#26486D',
  },
  headerTag: {
    color: '#7DF9FF',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '800',
    marginBottom: 8,
  },
  headerTitle: {
    color: '#EAF4FF',
    fontSize: 27,
    fontWeight: '800',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  sectionWrap: {
    gap: 10,
  },
  sectionCard: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
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

export default PrivacyPolicy;
