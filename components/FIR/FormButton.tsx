import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FormButtonProps {
  title: string;
  loadingTitle: string;
  isLoading: boolean;
  onPress: () => void;
  iconName: keyof typeof Ionicons.glyphMap;
  backgroundColor?: string;
}

const FormButton: React.FC<FormButtonProps> = ({
  title,
  loadingTitle,
  isLoading,
  onPress,
  iconName,
  backgroundColor = '#7DF9FF',
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, isLoading && styles.buttonDisabled]}
      onPress={onPress}
      disabled={isLoading}
      activeOpacity={0.85}
    >
      <View style={[styles.buttonContent, { backgroundColor }]}>
        {isLoading ? (
          <ActivityIndicator color="#05111F" size="small" />
        ) : (
          <Ionicons name={iconName} size={18} color="#05111F" />
        )}
        <Text style={styles.buttonText}>{isLoading ? loadingTitle : title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 11,
    overflow: 'hidden',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 7,
  },
  buttonText: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default FormButton;
