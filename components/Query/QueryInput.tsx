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
    <View style={styles.box}>
      <Text style={styles.label}>Input Query</Text>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#7993B5"
          value={value}
          onChangeText={onChangeText}
          multiline
        />
        <TouchableOpacity
          style={[styles.mic, isListening && styles.micActive]}
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
  box: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 12,
    gap: 8,
  },
  label: {
    color: '#A8C0DD',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
  },
  input: {
    flex: 1,
    minHeight: 102,
    backgroundColor: '#0A162A',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B4B74',
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: '#EAF2FF',
    fontSize: 14,
    textAlignVertical: 'top',
    lineHeight: 20,
  },
  mic: {
    width: 46,
    height: 46,
    borderRadius: 13,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  micActive: {
    backgroundColor: '#F87171',
  },
});

export default QueryInput;
