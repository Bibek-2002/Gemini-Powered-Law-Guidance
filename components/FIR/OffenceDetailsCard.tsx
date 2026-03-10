import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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
      <View style={styles.header}>
        <Ionicons name="warning" size={18} color="#F6A720" />
        <Text style={styles.title}>Offence Details</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Offence Date</Text>
          <TextInput
            style={styles.input}
            value={formData.offenceDate}
            onChangeText={(value) => onChange('offenceDate', value)}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Offence Time</Text>
          <TextInput
            style={styles.input}
            value={formData.offenceTime}
            onChangeText={(value) => onChange('offenceTime', value)}
            placeholder="HH:MM"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Place of Occurrence *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.address}
          onChangeText={(value) => onChange('address', value)}
          multiline
          numberOfLines={3}
          placeholder="Enter detailed address of the offence"
          placeholderTextColor="#7993B5"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    marginBottom: 12,
    padding: 14,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  title: {
    color: '#EAF3FF',
    fontSize: 15,
    fontWeight: '800',
  },
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  group: {
    flex: 1,
    marginBottom: 10,
  },
  label: {
    color: '#A8C0DD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  input: {
    borderRadius: 9,
    borderWidth: 1,
    borderColor: '#2B4B74',
    backgroundColor: '#0A162A',
    color: '#EAF2FF',
    fontSize: 14,
    paddingHorizontal: 11,
    paddingVertical: 10,
  },
  textArea: {
    minHeight: 82,
    textAlignVertical: 'top',
  },
});

export default OffenceDetailsCard;
