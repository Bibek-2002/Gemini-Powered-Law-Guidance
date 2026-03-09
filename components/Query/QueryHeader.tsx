import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QueryHeaderProps {
  title?: string;
  subtitle?: string;
}

const QueryHeader: React.FC<QueryHeaderProps> = ({
  title = 'AI Query Console',
  subtitle = 'Analyze legal scenarios and convert output into case entries',
}) => {
  return (
    <View style={styles.wrap}>
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
  wrap: {
    backgroundColor: '#101D34',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 15,
    gap: 8,
  },
  badge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7DF9FF',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
  },
  badgeText: {
    color: '#05111F',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
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

export default QueryHeader;
