import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ComplainantDetailsCardProps {
  formData: {
    complainantName: string;
    fatherName: string;
    birthDate: string;
    nationality: string;
    occupation: string;
    complainantAddress: string;
  };
  onChange: (name: string, value: string) => void;
}

const ComplainantDetailsCard: React.FC<ComplainantDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Ionicons name="person" size={18} color="#84CC16" />
        <Text style={styles.cardTitle}>Complainant Details</Text>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter complainant full name"
          placeholderTextColor="#7993B5"
          value={formData.complainantName}
          onChangeText={(value) => onChange('complainantName', value)}
        />
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Father/Husband Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            placeholderTextColor="#7993B5"
            value={formData.fatherName}
            onChangeText={(value) => onChange('fatherName', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#7993B5"
            value={formData.birthDate}
            onChangeText={(value) => onChange('birthDate', value)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Nationality</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter nationality"
            placeholderTextColor="#7993B5"
            value={formData.nationality}
            onChangeText={(value) => onChange('nationality', value)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Occupation</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter occupation"
            placeholderTextColor="#7993B5"
            value={formData.occupation}
            onChangeText={(value) => onChange('occupation', value)}
          />
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter complainant address"
          placeholderTextColor="#7993B5"
          value={formData.complainantAddress}
          onChangeText={(value) => onChange('complainantAddress', value)}
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

export default ComplainantDetailsCard;
