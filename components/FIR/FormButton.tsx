import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
    <TouchableOpacity style={[styles.container, isLoading && styles.disabled]} onPress={onPress} disabled={isLoading} activeOpacity={0.85}>
      <View style={[styles.content, { backgroundColor }]}> 
        {isLoading ? <ActivityIndicator color="#05111F" size="small" /> : <Ionicons name={iconName} size={18} color="#05111F" />}
        <Text style={styles.text}>{isLoading ? loadingTitle : title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 11,
    overflow: 'hidden',
    marginTop: 8,
  },
  disabled: {
    opacity: 0.65,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  text: {
    color: '#05111F',
    fontSize: 13,
    fontWeight: '800',
  },
});

export default FormButton;
