import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../routeRegistry';

type VisionNavigation = NativeStackNavigationProp<RootStackParamList, 'Principles'>;

const principles = [
  { title: 'Field-Ready Operation', detail: 'The app should remain clear and usable in high-pressure legal workflows.' },
  { title: 'Assistive, Not Replacing', detail: 'AI supports legal drafting speed; final decisions stay with professionals.' },
  { title: 'Persistent Case Context', detail: 'Saved records should preserve continuity between queries and document work.' },
  { title: 'Modular Expandability', detail: 'Independent modules allow controlled growth without feature lock-in.' },
];

const ProductPrinciplesScreen: React.FC = () => {
  const navigation = useNavigation<VisionNavigation>();

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#1B3B67', '#0A596E']} style={styles.header}>
        <Text style={styles.headerTag}>Principles</Text>
        <Text style={styles.headerTitle}>Practical Legal Workflow Platform</Text>
        <Text style={styles.headerSubtitle}>NyayaFlow Assist focuses on real productivity and traceable legal operations.</Text>
      </LinearGradient>

      <View style={styles.directionCard}>
        <Text style={styles.directionTitle}>Direction</Text>
        <Text style={styles.directionText}>
          Reduce repetitive legal drafting effort while preserving accuracy, accountability, and structured case memory.
        </Text>
      </View>

      <View style={styles.principles}>
        {principles.map((principle, index) => (
          <View key={principle.title} style={styles.principleCard}>
            <Text style={styles.principleIndex}>0{index + 1}</Text>
            <View style={styles.principleBody}>
              <Text style={styles.principleTitle}>{principle.title}</Text>
              <Text style={styles.principleText}>{principle.detail}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.actionButton, styles.primaryAction]} onPress={() => navigation.navigate('Capabilities')}>
          <Text style={styles.primaryText}>View Features</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryAction]} onPress={() => navigation.navigate('Modules')}>
          <Text style={styles.secondaryText}>Open Workspace</Text>
        </TouchableOpacity>
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
  header: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#26486D',
    padding: 20,
  },
  headerTag: {
    color: '#7DF9FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
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
  directionCard: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#26486D',
    backgroundColor: '#0D1B31',
    padding: 15,
  },
  directionTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  directionText: {
    color: '#D7E7FF',
    fontSize: 13,
    lineHeight: 19,
  },
  principles: {
    gap: 10,
  },
  principleCard: {
    flexDirection: 'row',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 11,
    padding: 13,
  },
  principleIndex: {
    color: '#7DF9FF',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 1,
  },
  principleBody: {
    flex: 1,
  },
  principleTitle: {
    color: '#EAF3FF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  principleText: {
    color: '#9DB3D0',
    fontSize: 12,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    minHeight: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryAction: {
    backgroundColor: '#7DF9FF',
  },
  secondaryAction: {
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
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

export default ProductPrinciplesScreen;
