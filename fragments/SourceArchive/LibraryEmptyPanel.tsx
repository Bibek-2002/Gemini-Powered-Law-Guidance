import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface EmptyStateProps {
  message?: string;
  subMessage?: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const LibraryEmptyPanel: React.FC<EmptyStateProps> = ({
  message = 'No documents found',
  subMessage = 'Try adjusting your search criteria or check back later.',
  iconName = 'folder',
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Ionicons name={iconName} size={46} color="#7DF9FF" />
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
    paddingHorizontal: 20,
    paddingVertical: 60,
  },
  content: {
    alignItems: 'center',
  },
  message: {
    color: '#EAF3FF',
    fontSize: 18,
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

export default LibraryEmptyPanel;
