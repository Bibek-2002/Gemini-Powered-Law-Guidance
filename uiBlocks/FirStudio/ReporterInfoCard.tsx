import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
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

const ReporterInfoCard: React.FC<ComplainantDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="person" size={18} color="#84CC16" />
        <Text style={styles.title}>Complainant Details</Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.complainantName}
          onChangeText={(value) => onChange('complainantName', value)}
          placeholder="Enter complainant full name"
          placeholderTextColor="#7993B5"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Father/Husband Name</Text>
          <TextInput
            style={styles.input}
            value={formData.fatherName}
            onChangeText={(value) => onChange('fatherName', value)}
            placeholder="Enter name"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={formData.birthDate}
            onChangeText={(value) => onChange('birthDate', value)}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Nationality</Text>
          <TextInput
            style={styles.input}
            value={formData.nationality}
            onChangeText={(value) => onChange('nationality', value)}
            placeholder="Enter nationality"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Occupation</Text>
          <TextInput
            style={styles.input}
            value={formData.occupation}
            onChangeText={(value) => onChange('occupation', value)}
            placeholder="Enter occupation"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.complainantAddress}
          onChangeText={(value) => onChange('complainantAddress', value)}
          multiline
          numberOfLines={3}
          placeholder="Enter complainant address"
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

export default ReporterInfoCard;
