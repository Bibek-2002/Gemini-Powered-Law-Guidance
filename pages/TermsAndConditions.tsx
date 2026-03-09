import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const terms = [
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

const TermsAndConditions: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#16345D', '#0B4A6F']} style={styles.header}>
        <Text style={styles.headerTag}>Legal</Text>
        <Text style={styles.headerTitle}>Terms and Conditions</Text>
        <Text style={styles.headerSubtitle}>
          Baseline usage terms for all operational modules.
        </Text>
      </LinearGradient>

      <View style={styles.listWrap}>
        {terms.map((item) => (
          <View key={item.title} style={styles.termCard}>
            <Text style={styles.termTitle}>{item.title}</Text>
            <Text style={styles.termText}>{item.text}</Text>
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
  listWrap: {
    gap: 10,
  },
  termCard: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 13,
  },
  termTitle: {
    color: '#EAF2FF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  termText: {
    color: '#9FB4D1',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default TermsAndConditions;
