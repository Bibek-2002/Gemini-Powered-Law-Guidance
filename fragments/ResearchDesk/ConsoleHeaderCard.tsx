import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QueryHeaderProps {
  title?: string;
  subtitle?: string;
}

const ConsoleHeaderCard: React.FC<QueryHeaderProps> = ({
  title = 'AI Advisory Console',
  subtitle = 'Analyze legal scenarios and convert output into case entries',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Ionicons name="sparkles" size={14} color="#05111F" />
        <Text style={styles.badgeText}>Live Assistant</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 8,
    padding: 15,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 999,
    backgroundColor: '#7DF9FF',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    color: '#05111F',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  title: {
    color: '#EAF4FF',
    fontSize: 24,
    fontWeight: '800',
  },
  subtitle: {
    color: '#A6BDD9',
    fontSize: 13,
    lineHeight: 19,
  },
});

export default ConsoleHeaderCard;
