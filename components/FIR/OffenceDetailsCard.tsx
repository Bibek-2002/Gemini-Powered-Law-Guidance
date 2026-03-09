import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OffenceDetailsCardProps {
  formData: {
    offenceDate: string;
    offenceTime: string;
    address: string;
  };
  onChange: (name: string, value: string) => void;
}

const OffenceDetailsCard: React.FC<OffenceDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="warning" size={18} color="#F6A720" />
        <Text style={styles.cardTitle}>Offence Details</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Offence Date</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#7993B5"
            value={formData.offenceDate}
            onChangeText={(value) => onChange('offenceDate', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Offence Time</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM"
            placeholderTextColor="#7993B5"
            value={formData.offenceTime}
            onChangeText={(value) => onChange('offenceTime', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Place of Occurrence *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter detailed address of the offence"
          placeholderTextColor="#7993B5"
          value={formData.address}
          onChangeText={(value) => onChange('address', value)}
          multiline
          numberOfLines={3}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#101D34',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#294569',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#EAF3FF',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#A8C0DD',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2B4B74',
    borderRadius: 9,
    paddingHorizontal: 11,
    paddingVertical: 10,
    fontSize: 14,
    backgroundColor: '#0A162A',
    color: '#EAF2FF',
  },
  textArea: {
    minHeight: 82,
    textAlignVertical: 'top',
  },
});

export default OffenceDetailsCard;
