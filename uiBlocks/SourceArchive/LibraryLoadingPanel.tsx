import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

interface LoadingStateProps {
  message?: string;
  size?: 'small' | 'large';
  color?: string;
}

const LibraryLoadingPanel: React.FC<LoadingStateProps> = ({
  message = 'Loading documents...',
  size = 'large',
  color = '#7DF9FF',
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  message: {
    marginTop: 16,
    color: '#A3B8D4',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default LibraryLoadingPanel;
