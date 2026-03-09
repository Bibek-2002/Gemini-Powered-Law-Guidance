import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type FeaturesNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Key Features'>;

const featureCards = [
  {
    icon: 'sparkles',
    title: 'Structured AI Replies',
    text: 'Query engine returns legal sections and summary output in one response.',
  },
  {
    icon: 'save',
    title: 'One-Tap Case Save',
    text: 'Important responses can be stored instantly for later review.',
  },
  {
    icon: 'albums',
    title: 'Editable Case Vault',
    text: 'Saved records support updates to tags, notes, and case status.',
  },
  {
    icon: 'document',
    title: 'FIR Export Flow',
    text: 'Generate report-ready FIR documents directly from the app.',
  },
  {
    icon: 'library',
    title: 'Bare Acts Library',
    text: 'Search law sections and open source text without extra navigation.',
  },
  {
    icon: 'folder-open',
    title: 'Reference Documents',
    text: 'Browse and filter legal documents in an independent local view.',
  },
];

const KeyFeatures: React.FC = () => {
  const navigation = useNavigation<FeaturesNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroTag}>Capabilities</Text>
        <Text style={styles.heroTitle}>Feature Matrix</Text>
        <Text style={styles.heroSubtitle}>All core tools remain available with a complete UI redesign.</Text>
      </LinearGradient>

      <View style={styles.featureGrid}>
        {featureCards.map((feature) => (
          <View key={feature.title} style={styles.featureCard}>
            <View style={styles.iconPill}>
              <Ionicons name={feature.icon as keyof typeof Ionicons.glyphMap} size={18} color="#05111F" />
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.flowBox}>
        <Text style={styles.flowTitle}>Workflow Chain</Text>
        <Text style={styles.flowStep}>1. Ask and analyze in Query Console.</Text>
        <Text style={styles.flowStep}>2. Save selected output to Case Vault.</Text>
        <Text style={styles.flowStep}>3. Extend into Bare Acts or FIR Studio.</Text>
      </View>

      <View style={styles.footerActions}>
        <TouchableOpacity style={[styles.footerButton, styles.primary]} onPress={() => navigation.navigate('Utilities')}>
          <Text style={styles.primaryText}>Open Workspace</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.footerButton, styles.secondary]} onPress={() => navigation.navigate('Vision')}>
          <Text style={styles.secondaryText}>Project Vision</Text>
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
  hero: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#26486D',
  },
  heroTag: {
    color: '#7DF9FF',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '800',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#EAF4FF',
    fontSize: 29,
    lineHeight: 35,
    fontWeight: '800',
    marginBottom: 7,
  },
  heroSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  featureCard: {
    width: '48%',
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2A4468',
    padding: 12,
    minHeight: 158,
    gap: 6,
  },
  iconPill: {
    width: 31,
    height: 31,
    borderRadius: 9,
    backgroundColor: '#7DF9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  featureTitle: {
    color: '#EAF3FF',
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 18,
  },
  featureText: {
    color: '#9AB1CE',
    fontSize: 11,
    lineHeight: 17,
  },
  flowBox: {
    backgroundColor: '#0D1B31',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#25466D',
    padding: 14,
    gap: 5,
  },
  flowTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  flowStep: {
    color: '#D8E8FF',
    fontSize: 12,
    lineHeight: 18,
  },
  footerActions: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    flex: 1,
    borderRadius: 12,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  primary: {
    backgroundColor: '#7DF9FF',
  },
  secondary: {
    borderWidth: 1,
    borderColor: '#2F4C74',
    backgroundColor: '#101D34',
  },
  primaryText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryText: {
    color: '#C8DCF8',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default KeyFeatures;
