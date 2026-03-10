import React from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface QueryInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onMicPress: () => void;
  isListening: boolean;
  placeholder?: string;
}

const QueryInput: React.FC<QueryInputProps> = ({
  value,
  onChangeText,
  onMicPress,
  isListening,
  placeholder = 'Describe legal issue, facts, and expected help...',
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Input Query</Text>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          multiline
          placeholder={placeholder}
          placeholderTextColor="#7993B5"
          textAlignVertical="top"
          value={value}
          onChangeText={onChangeText}
        />

        <TouchableOpacity
          style={[styles.micButton, isListening && styles.micButtonActive]}
          onPress={onMicPress}
          activeOpacity={0.85}
        >
          <Ionicons name={isListening ? 'mic' : 'mic-outline'} size={19} color="#05111F" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 8,
    padding: 12,
  },
  label: {
    color: '#A8C0DD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 102,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B4B74',
    backgroundColor: '#0A162A',
    color: '#EAF2FF',
    fontSize: 14,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  micButton: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micButtonActive: {
    backgroundColor: '#F87171',
  },
});

export default QueryInput;
