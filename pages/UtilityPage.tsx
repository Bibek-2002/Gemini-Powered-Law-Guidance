import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type UtilityNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Utilities'>;

const coreModules: Array<{
  title: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: keyof RootStackParamList;
  accent: string;
}> = [
  {
    title: 'AI Query Console',
    detail: 'Generate legal analysis and structured summary',
    icon: 'sparkles',
    screen: 'Query',
    accent: '#22D3EE',
  },
  {
    title: 'Bare Acts Navigator',
    detail: 'Search sections and open legal text quickly',
    icon: 'book',
    screen: 'Bare Acts',
    accent: '#F59E0B',
  },
  {
    title: 'Case Database',
    detail: 'Store, review, and edit saved case notes',
    icon: 'albums',
    screen: 'Database',
    accent: '#84CC16',
  },
  {
    title: 'FIR Studio',
    detail: 'Fill details and export FIR documents',
    icon: 'create',
    screen: 'FIR Download',
    accent: '#FB7185',
  },
];

const supportModules: Array<{
  title: string;
  screen: keyof RootStackParamList;
  icon: keyof typeof Ionicons.glyphMap;
}> = [
  { title: 'Original Documents', screen: 'Original Documents', icon: 'folder-open' },
  { title: 'Official FIR Format', screen: 'Official FIR Format', icon: 'document' },
  { title: 'Download Build', screen: 'Download', icon: 'download' },
  { title: 'Project Team', screen: 'Team', icon: 'people' },
  { title: 'Privacy Policy', screen: 'Privacy Policy', icon: 'shield-checkmark' },
  { title: 'Terms', screen: 'Terms', icon: 'document-text' },
  { title: 'Accessibility', screen: 'Accessibility', icon: 'eye' },
];

const UtilityPage: React.FC = () => {
  const navigation = useNavigation<UtilityNavigationProp>();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#132B4F', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.eyebrow}>Workspace</Text>
        <Text style={styles.title}>Operations Console</Text>
        <Text style={styles.subtitle}>
          Select any module below. All features remain active with a redesigned interface.
        </Text>
      </LinearGradient>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Core Modules</Text>
        {coreModules.map((module) => (
          <TouchableOpacity
            key={module.title}
            style={[styles.moduleCard, { borderColor: module.accent }]}
            activeOpacity={0.88}
            onPress={() => navigation.navigate(module.screen)}
          >
            <View style={[styles.moduleIcon, { backgroundColor: module.accent }]}>
              <Ionicons name={module.icon} size={18} color="#05111F" />
            </View>
            <View style={styles.moduleTextWrap}>
              <Text style={styles.moduleTitle}>{module.title}</Text>
              <Text style={styles.moduleDetail}>{module.detail}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#8FB8D8" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & Info</Text>
        <View style={styles.supportGrid}>
          {supportModules.map((module) => (
            <TouchableOpacity
              key={module.title}
              style={styles.supportCard}
              onPress={() => navigation.navigate(module.screen)}
              activeOpacity={0.88}
            >
              <Ionicons name={module.icon} size={17} color="#7DF9FF" />
              <Text style={styles.supportText}>{module.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
    borderWidth: 1,
    borderColor: '#26486D',
    padding: 20,
    gap: 8,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    backgroundColor: '#1C3A5F',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: '#7DF9FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  title: {
    color: '#EAF3FF',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 35,
  },
  subtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#0C1427',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#20385C',
    padding: 14,
    gap: 9,
  },
  sectionTitle: {
    color: '#E1EDFF',
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  moduleCard: {
    borderWidth: 1.3,
    borderRadius: 14,
    backgroundColor: '#101D34',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  moduleIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  moduleTextWrap: {
    flex: 1,
    gap: 3,
  },
  moduleTitle: {
    color: '#ECF3FF',
    fontSize: 14,
    fontWeight: '700',
  },
  moduleDetail: {
    color: '#97AFCC',
    fontSize: 12,
    lineHeight: 17,
  },
  supportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 9,
  },
  supportCard: {
    width: '48.5%',
    minHeight: 62,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2C466C',
    backgroundColor: '#111D34',
    paddingHorizontal: 10,
    paddingVertical: 9,
    justifyContent: 'center',
    gap: 5,
  },
  supportText: {
    color: '#D8E7FF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default UtilityPage;
