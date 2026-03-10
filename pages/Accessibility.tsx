import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const commitments = [
  'High contrast text and hierarchy for long-form legal reading.',
  'Consistent touch targets across form-heavy screens and action cards.',
  'Scrollable content blocks with predictable spacing and grouping.',
  'Readable layout behavior for compact and larger mobile displays.',
  'Clear labels to reduce friction during FIR and case entry workflows.',
];

const Accessibility: React.FC = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#16345D', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroTag}>Standards</Text>
        <Text style={styles.heroTitle}>Accessibility Statement</Text>
        <Text style={styles.heroSubtitle}>Design commitments for practical and readable legal workflows.</Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Focus Areas</Text>
        {commitments.map((line) => (
          <View key={line} style={styles.row}>
            <View style={styles.dot} />
            <Text style={styles.rowText}>{line}</Text>
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
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 9,
    padding: 13,
  },
  cardTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#7DF9FF',
    marginTop: 6,
  },
  rowText: {
    flex: 1,
    color: '#D8E7FF',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default Accessibility;
