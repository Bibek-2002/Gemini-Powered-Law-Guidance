import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface FIRDetailsCardProps {
  formData: {
    district: string;
    policeStation: string;
    year: string;
    firNo: string;
    date: string;
  };
  onChange: (name: string, value: string) => void;
}

const FIRDetailsCard: React.FC<FIRDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="shield-checkmark" size={18} color="#7DF9FF" />
        <Text style={styles.cardTitle}>FIR Details</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>District *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter district"
            placeholderTextColor="#7993B5"
            value={formData.district}
            onChangeText={(value) => onChange('district', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Police Station *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter police station"
            placeholderTextColor="#7993B5"
            value={formData.policeStation}
            onChangeText={(value) => onChange('policeStation', value)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Year</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter year"
            placeholderTextColor="#7993B5"
            value={formData.year}
            onChangeText={(value) => onChange('year', value)}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>FIR No. *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter FIR number"
            placeholderTextColor="#7993B5"
            value={formData.firNo}
            onChangeText={(value) => onChange('firNo', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Date</Text>
        <TextInput
          style={styles.input}
          placeholder="DD/MM/YYYY"
          placeholderTextColor="#7993B5"
          value={formData.date}
          onChangeText={(value) => onChange('date', value)}
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
});

export default FIRDetailsCard;
