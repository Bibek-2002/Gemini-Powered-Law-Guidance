import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type LandingNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const launchItems: Array<{
  label: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  target: keyof RootStackParamList;
}> = [
  {
    label: 'Query Engine',
    detail: 'Analyze legal issues and map acts',
    icon: 'chatbox-ellipses',
    target: 'Query',
  },
  {
    label: 'Case Vault',
    detail: 'Review and edit saved records',
    icon: 'archive',
    target: 'Database',
  },
  {
    label: 'Bare Acts',
    detail: 'Read sections in searchable format',
    icon: 'library',
    target: 'Bare Acts',
  },
  {
    label: 'FIR Studio',
    detail: 'Create and export FIR reports',
    icon: 'document-text',
    target: 'FIR Download',
  },
];

const Landing: React.FC = () => {
  const navigation = useNavigation<LandingNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#11284A', '#0E7490']} style={styles.hero}>
        <Text style={styles.badge}>LawAI Mobile</Text>
        <Text style={styles.title}>Legal Command Deck</Text>
        <Text style={styles.subtitle}>
          A redesigned workflow app for legal drafting, research, records, and FIR generation.
        </Text>

        <View style={styles.heroActions}>
          <TouchableOpacity style={styles.primaryAction} onPress={() => navigation.navigate('Utilities')}>
            <Ionicons name="apps" size={16} color="#05111F" />
            <Text style={styles.primaryActionText}>Open Workspace</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryAction} onPress={() => navigation.navigate('Vision')}>
            <Text style={styles.secondaryActionText}>Vision</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <Text style={styles.panelTitle}>Quick Launch</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Key Features')}>
            <Text style={styles.panelLink}>All Features</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.launchGrid}>
          {launchItems.map((item) => (
            <TouchableOpacity
              key={item.label}
              style={styles.launchCard}
              activeOpacity={0.88}
              onPress={() => navigation.navigate(item.target)}
            >
              <View style={styles.launchIcon}>
                <Ionicons name={item.icon} size={18} color="#7DF9FF" />
              </View>
              <Text style={styles.launchLabel}>{item.label}</Text>
              <Text style={styles.launchDetail}>{item.detail}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Workflow Sequence</Text>
        <Text style={styles.noteLine}>1. Use Query Engine for legal reasoning output.</Text>
        <Text style={styles.noteLine}>2. Save important responses to Case Vault.</Text>
        <Text style={styles.noteLine}>3. Continue with Bare Acts and FIR Studio modules.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  content: {
    padding: 18,
    paddingBottom: 28,
    gap: 14,
  },
  hero: {
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: '#22406B',
    gap: 10,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1A3557',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#7DF9FF',
    textTransform: 'uppercase',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.9,
  },
  title: {
    color: '#E6F4FF',
    fontSize: 31,
    fontWeight: '800',
    lineHeight: 36,
  },
  subtitle: {
    color: '#AFC4DF',
    fontSize: 14,
    lineHeight: 20,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  primaryAction: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#7DF9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryAction: {
    flex: 0.55,
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#58B5D7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 21, 39, 0.45)',
  },
  primaryActionText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryActionText: {
    color: '#BDEBFF',
    fontSize: 13,
    fontWeight: '700',
  },
  panel: {
    backgroundColor: '#0C1427',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E3255',
    padding: 14,
    gap: 10,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  panelTitle: {
    color: '#DDEAFF',
    fontSize: 16,
    fontWeight: '800',
  },
  panelLink: {
    color: '#7DF9FF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  launchGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  launchCard: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2C4468',
    backgroundColor: '#111D34',
    padding: 12,
    gap: 5,
  },
  launchIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#183255',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  launchLabel: {
    color: '#ECF3FF',
    fontSize: 13,
    fontWeight: '700',
  },
  launchDetail: {
    color: '#9EB3D1',
    fontSize: 11,
    lineHeight: 16,
  },
  noteCard: {
    backgroundColor: '#102038',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E4B71',
    padding: 13,
    gap: 5,
  },
  noteTitle: {
    color: '#7DF9FF',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 1,
  },
  noteLine: {
    color: '#D4E2F7',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default Landing;
