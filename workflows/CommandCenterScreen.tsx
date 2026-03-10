import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../appRoutes';

type HomeNavigation = NativeStackNavigationProp<RootStackParamList, 'Hub'>;

interface LaunchCardItem {
  label: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  target: keyof RootStackParamList;
}

const quickLaunchItems: LaunchCardItem[] = [
  { label: 'Advisory Engine', detail: 'Analyze legal issues and map acts', icon: 'chatbox-ellipses', target: 'Advisor' },
  { label: 'Docket Vault', detail: 'Review and edit saved records', icon: 'archive', target: 'Docket' },
  { label: 'Statutes', detail: 'Read sections in searchable format', icon: 'library', target: 'Statutes' },
  { label: 'Incident Studio', detail: 'Create and export incident reports', icon: 'document-text', target: 'Incident Studio' },
];

const CommandCenterScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavigation>();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#11284A', '#0E7490']} style={styles.hero}>
        <Text style={styles.badge}>NyayaNexus Studio</Text>
        <Text style={styles.title}>Legal Command Deck</Text>
        <Text style={styles.subtitle}>
          A redesigned workflow app for legal drafting, research, records, and incident reporting.
        </Text>

        <View style={styles.heroButtons}>
          <TouchableOpacity style={styles.primaryButton} onPress={() => navigation.navigate('Modules')}>
            <Ionicons name="apps" size={16} color="#05111F" />
            <Text style={styles.primaryText}>Open Workspace</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation.navigate('Principles')}>
            <Text style={styles.secondaryText}>Principles</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Launch</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Capabilities')}>
            <Text style={styles.sectionLink}>All Features</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {quickLaunchItems.map((item) => (
            <TouchableOpacity key={item.label} style={styles.card} onPress={() => navigation.navigate(item.target)}>
              <View style={styles.cardIcon}>
                <Ionicons name={item.icon} size={18} color="#7DF9FF" />
              </View>
              <Text style={styles.cardTitle}>{item.label}</Text>
              <Text style={styles.cardSubtitle}>{item.detail}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.notes}>
        <Text style={styles.notesTitle}>Workflow Sequence</Text>
        <Text style={styles.notesText}>1. Use Advisory Engine for legal reasoning output.</Text>
        <Text style={styles.notesText}>2. Save important responses to Docket Vault.</Text>
        <Text style={styles.notesText}>3. Continue with Statute Explorer and Incident Studio modules.</Text>
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
    paddingBottom: 28,
  },
  hero: {
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#22406B',
    gap: 10,
    padding: 20,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#1A3557',
    color: '#7DF9FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
  heroButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  primaryButton: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    backgroundColor: '#7DF9FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  secondaryButton: {
    flex: 0.55,
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#58B5D7',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 21, 39, 0.45)',
  },
  primaryText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
  secondaryText: {
    color: '#BDEBFF',
    fontSize: 13,
    fontWeight: '700',
  },
  section: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E3255',
    backgroundColor: '#0C1427',
    gap: 10,
    padding: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#DDEAFF',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionLink: {
    color: '#7DF9FF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  card: {
    width: '48%',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#2C4468',
    backgroundColor: '#111D34',
    gap: 5,
    padding: 12,
  },
  cardIcon: {
    width: 30,
    height: 30,
    borderRadius: 9,
    backgroundColor: '#183255',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  cardTitle: {
    color: '#ECF3FF',
    fontSize: 13,
    fontWeight: '700',
  },
  cardSubtitle: {
    color: '#9EB3D1',
    fontSize: 11,
    lineHeight: 16,
  },
  notes: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2E4B71',
    backgroundColor: '#102038',
    gap: 5,
    padding: 13,
  },
  notesTitle: {
    color: '#7DF9FF',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 1,
  },
  notesText: {
    color: '#D4E2F7',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default CommandCenterScreen;
