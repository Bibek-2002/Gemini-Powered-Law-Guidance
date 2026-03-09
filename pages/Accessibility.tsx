import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const bullets = [
  'High contrast text and hierarchy for long-form legal reading.',
  'Consistent touch targets across form-heavy screens and action cards.',
  'Scrollable content blocks with predictable spacing and grouping.',
  'Readable layout behavior for compact and larger mobile displays.',
  'Clear labels to reduce friction during FIR and case entry workflows.',
];

const Accessibility: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#16345D', '#0B4A6F']} style={styles.header}>
        <Text style={styles.headerTag}>Standards</Text>
        <Text style={styles.headerTitle}>Accessibility Statement</Text>
        <Text style={styles.headerSubtitle}>
          Design commitments for practical and readable legal workflows.
        </Text>
      </LinearGradient>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current Focus Areas</Text>
        {bullets.map((item) => (
          <View key={item} style={styles.bulletRow}>
            <View style={styles.bulletDot} />
            <Text style={styles.bulletText}>{item}</Text>
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
  card: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 13,
    gap: 9,
  },
  cardTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  bulletDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#7DF9FF',
    marginTop: 6,
  },
  bulletText: {
    flex: 1,
    color: '#D8E7FF',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default Accessibility;
