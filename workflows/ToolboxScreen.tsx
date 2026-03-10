import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../appRoutes';

type UtilityNavigation = NativeStackNavigationProp<RootStackParamList, 'Modules'>;

interface CoreModule {
  title: string;
  detail: string;
  icon: keyof typeof Ionicons.glyphMap;
  screen: keyof RootStackParamList;
  accent: string;
}

interface SupportModule {
  title: string;
  screen: keyof RootStackParamList;
  icon: keyof typeof Ionicons.glyphMap;
}

const coreModules: CoreModule[] = [
  {
    title: 'AI Advisory Console',
    detail: 'Generate legal analysis and structured summary',
    icon: 'sparkles',
    screen: 'Advisor',
    accent: '#22D3EE',
  },
  {
    title: 'Statute Explorer Navigator',
    detail: 'Search sections and open legal text quickly',
    icon: 'book',
    screen: 'Statutes',
    accent: '#F59E0B',
  },
  {
    title: 'Docket Records',
    detail: 'Store, review, and edit saved case notes',
    icon: 'albums',
    screen: 'Docket',
    accent: '#84CC16',
  },
  {
    title: 'Incident Studio',
    detail: 'Fill details and export incident documents',
    icon: 'create',
    screen: 'Incident Studio',
    accent: '#FB7185',
  },
];

const supportModules: SupportModule[] = [
  { title: 'Archive', screen: 'Archive', icon: 'folder-open' },
  { title: 'Incident Template', screen: 'Incident Template', icon: 'document' },
  { title: 'Download Build', screen: 'Releases', icon: 'download' },
  { title: 'Project Team', screen: 'Contributors', icon: 'people' },
  { title: 'Privacy', screen: 'Privacy', icon: 'shield-checkmark' },
  { title: 'Legal', screen: 'Legal', icon: 'document-text' },
  { title: 'Access', screen: 'Access', icon: 'eye' },
];

const ToolboxScreen: React.FC = () => {
  const navigation = useNavigation<UtilityNavigation>();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
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
            style={[styles.coreCard, { borderColor: module.accent }]}
            onPress={() => navigation.navigate(module.screen)}
          >
            <View style={[styles.coreIcon, { backgroundColor: module.accent }]}>
              <Ionicons name={module.icon} size={18} color="#05111F" />
            </View>
            <View style={styles.coreTextWrap}>
              <Text style={styles.coreTitle}>{module.title}</Text>
              <Text style={styles.coreDetail}>{module.detail}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color="#8FB8D8" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support & Info</Text>
        <View style={styles.supportGrid}>
          {supportModules.map((module) => (
            <TouchableOpacity key={module.title} style={styles.supportCard} onPress={() => navigation.navigate(module.screen)}>
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
    borderColor: '#26486D',
    gap: 8,
    padding: 20,
  },
  eyebrow: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    backgroundColor: '#1C3A5F',
    color: '#7DF9FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
    paddingHorizontal: 10,
    paddingVertical: 5,
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
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#20385C',
    backgroundColor: '#0C1427',
    gap: 9,
    padding: 14,
  },
  sectionTitle: {
    color: '#E1EDFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  coreCard: {
    borderWidth: 1.3,
    borderRadius: 14,
    backgroundColor: '#101D34',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
  },
  coreIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coreTextWrap: {
    flex: 1,
    gap: 3,
  },
  coreTitle: {
    color: '#ECF3FF',
    fontSize: 14,
    fontWeight: '700',
  },
  coreDetail: {
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
    justifyContent: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  supportText: {
    color: '#D8E7FF',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 16,
  },
});

export default ToolboxScreen;
