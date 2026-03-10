import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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

const ReportIdentityCard: React.FC<FIRDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={18} color="#7DF9FF" />
        <Text style={styles.title}>FIR Details</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>District *</Text>
          <TextInput
            style={styles.input}
            value={formData.district}
            onChangeText={(value) => onChange('district', value)}
            placeholder="Enter district"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Police Station *</Text>
          <TextInput
            style={styles.input}
            value={formData.policeStation}
            onChangeText={(value) => onChange('policeStation', value)}
            placeholder="Enter police station"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Year</Text>
          <TextInput
            style={styles.input}
            value={formData.year}
            onChangeText={(value) => onChange('year', value)}
            keyboardType="numeric"
            placeholder="Enter year"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>FIR No. *</Text>
          <TextInput
            style={styles.input}
            value={formData.firNo}
            onChangeText={(value) => onChange('firNo', value)}
            placeholder="Enter FIR number"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Date</Text>
        <TextInput
          style={styles.input}
          value={formData.date}
          onChangeText={(value) => onChange('date', value)}
          placeholder="DD/MM/YYYY"
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
});

export default ReportIdentityCard;
