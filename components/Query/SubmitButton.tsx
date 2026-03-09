import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SubmitButtonProps {
  onPress: () => void;
  title?: string;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  onPress,
  title = 'Analyze and Generate',
  disabled = false,
}) => {
  return (
    <TouchableOpacity style={[styles.wrap, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
      <View style={styles.content}>
        <Ionicons name="flash" size={17} color="#05111F" />
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    borderRadius: 12,
    backgroundColor: '#7DF9FF',
  },
  content: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  text: {
    color: '#05111F',
    fontSize: 14,
    fontWeight: '800',
  },
  disabled: {
    opacity: 0.45,
  },
});

export default SubmitButton;
