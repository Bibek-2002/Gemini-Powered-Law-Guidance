import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const termsSections = [
  {
    title: '1. Acceptable Use',
    text: 'Use the platform only for lawful legal-assistance and documentation workflows.',
  },
  {
    title: '2. Informational Output',
    text: 'AI-generated content is assistive and should be reviewed before formal use.',
  },
  {
    title: '3. User Responsibility',
    text: 'Users remain responsible for decisions, submissions, and data validity.',
  },
  {
    title: '4. Service Availability',
    text: 'Some modules depend on device/network conditions and may vary by environment.',
  },
  {
    title: '5. Updates',
    text: 'Terms may be revised in future releases. Continued usage implies acceptance.',
  },
];

const TermsGuideScreen: React.FC = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#16345D', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroTag}>Legal</Text>
        <Text style={styles.heroTitle}>Terms and Conditions</Text>
        <Text style={styles.heroSubtitle}>Baseline usage terms for all operational modules.</Text>
      </LinearGradient>

      <View style={styles.sectionList}>
        {termsSections.map((section) => (
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
    color: '#EAF2FF',
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

export default TermsGuideScreen;
