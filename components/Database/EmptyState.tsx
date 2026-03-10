import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  message = 'No cases available',
  subMessage = 'Cases will appear here once they are added to the database.',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name="document-text-outline" size={46} color="#7DF9FF" />
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.subMessage}>{subMessage}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    color: '#EAF3FF',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subMessage: {
    color: '#9FB4D1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default EmptyState;
