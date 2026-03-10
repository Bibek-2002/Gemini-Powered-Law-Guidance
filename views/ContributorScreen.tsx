import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const teamMembers = [
  { initials: 'PM', role: 'Product Operations', summary: 'Coordinates release goals, scope, and delivery checkpoints.' },
  { initials: 'AI', role: 'AI Systems', summary: 'Maintains legal response structure and model integration quality.' },
  { initials: 'FE', role: 'Mobile Experience', summary: 'Builds interaction flows and visual behavior across screens.' },
  { initials: 'BE', role: 'Data & Integrations', summary: 'Handles storage, contracts, and module interoperability.' },
  { initials: 'QA', role: 'Quality Assurance', summary: 'Runs regression checks across core legal workflows.' },
  { initials: 'RS', role: 'Legal Research', summary: 'Validates legal references and source consistency.' },
];

const ContributorScreen: React.FC = () => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroTag}>Contributors</Text>
        <Text style={styles.heroTitle}>LawAI Mobile Team</Text>
        <Text style={styles.heroSubtitle}>
          Cross-functional collaboration behind product reliability and legal workflow execution.
        </Text>
      </LinearGradient>

      <View style={styles.members}>
        {teamMembers.map((member) => (
          <View key={`${member.initials}-${member.role}`} style={styles.memberCard}>
            <View style={styles.memberAvatar}>
              <Text style={styles.memberAvatarText}>{member.initials}</Text>
            </View>
            <View style={styles.memberBody}>
              <Text style={styles.memberRole}>{member.role}</Text>
              <Text style={styles.memberSummary}>{member.summary}</Text>
            </View>
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
    borderColor: '#274A70',
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
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  members: {
    gap: 10,
  },
  memberCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 11,
    padding: 12,
  },
  memberAvatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#7DF9FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  memberAvatarText: {
    color: '#05111F',
    fontSize: 14,
    fontWeight: '800',
  },
  memberBody: {
    flex: 1,
  },
  memberRole: {
    color: '#E8F2FF',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 3,
  },
  memberSummary: {
    color: '#9FB4D1',
    fontSize: 12,
    lineHeight: 17,
  },
});

export default ContributorScreen;
