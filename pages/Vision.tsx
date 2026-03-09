import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type VisionNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Vision'>;

const principles = [
  {
    title: 'Field-Ready Operation',
    detail: 'The app should remain clear and usable in high-pressure legal workflows.',
  },
  {
    title: 'Assistive, Not Replacing',
    detail: 'AI supports legal drafting speed; final decisions stay with professionals.',
  },
  {
    title: 'Persistent Case Context',
    detail: 'Saved records should preserve continuity between queries and document work.',
  },
  {
    title: 'Modular Expandability',
    detail: 'Independent modules allow controlled growth without feature lock-in.',
  },
];

const Vision: React.FC = () => {
  const navigation = useNavigation<VisionNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#1B3B67', '#0A596E']} style={styles.header}>
        <Text style={styles.headerTag}>Vision</Text>
        <Text style={styles.headerTitle}>Practical Legal Workflow Platform</Text>
        <Text style={styles.headerSubtitle}>
          LawAI Mobile focuses on real productivity and traceable legal operations.
        </Text>
      </LinearGradient>

      <View style={styles.manifestoCard}>
        <Text style={styles.manifestoTitle}>Direction</Text>
        <Text style={styles.manifestoText}>
          Reduce repetitive legal drafting effort while preserving accuracy, accountability, and
          structured case memory.
        </Text>
      </View>

      <View style={styles.principlesWrap}>
        {principles.map((item, index) => (
          <View key={item.title} style={styles.principleCard}>
            <Text style={styles.principleIndex}>0{index + 1}</Text>
            <View style={styles.principleTextWrap}>
              <Text style={styles.principleTitle}>{item.title}</Text>
              <Text style={styles.principleDetail}>{item.detail}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity style={[styles.actionBtn, styles.primary]} onPress={() => navigation.navigate('Key Features')}>
          <Text style={styles.primaryText}>View Features</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, styles.secondary]} onPress={() => navigation.navigate('Utilities')}>
          <Text style={styles.secondaryText}>Open Workspace</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
    marginBottom: 8,
  },
  headerSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  manifestoCard: {
    backgroundColor: '#0D1B31',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#26486D',
    padding: 15,
  },
  manifestoTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  manifestoText: {
    color: '#D7E7FF',
    fontSize: 13,
    lineHeight: 19,
  },
  principlesWrap: {
    gap: 10,
  },
  principleCard: {
    flexDirection: 'row',
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 13,
    gap: 11,
  },
  principleIndex: {
    color: '#7DF9FF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 1,
  },
  principleTextWrap: {
    flex: 1,
  },
  principleTitle: {
    color: '#EAF3FF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  principleDetail: {
    color: '#9DB3D0',
    fontSize: 12,
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    borderRadius: 12,
    minHeight: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: {
    backgroundColor: '#7DF9FF',
  },
  secondary: {
    backgroundColor: '#101D34',
    borderWidth: 1,
    borderColor: '#294569',
  },
  primaryText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryText: {
    color: '#D5E5FD',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default Vision;
