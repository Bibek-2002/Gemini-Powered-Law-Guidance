import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ReporterDetailsCardProps {
  formData: {
    reporterName: string;
    guardianName: string;
    dateOfBirth: string;
    citizenship: string;
    occupation: string;
    contactAddress: string;
  };
  onChange: (
    name: 'reporterName' | 'guardianName' | 'dateOfBirth' | 'citizenship' | 'occupation' | 'contactAddress',
    value: string
  ) => void;
}

const ReporterInfoCard: React.FC<ReporterDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="person" size={18} color="#84CC16" />
        <Text style={styles.title}>Reporter Profile</Text>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Reporter Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.reporterName}
          onChangeText={(value) => onChange('reporterName', value)}
          placeholder="Enter reporter name"
          placeholderTextColor="#7993B5"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Guardian / Contact Person</Text>
          <TextInput
            style={styles.input}
            value={formData.guardianName}
            onChangeText={(value) => onChange('guardianName', value)}
            placeholder="Enter name"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput
            style={styles.input}
            value={formData.dateOfBirth}
            onChangeText={(value) => onChange('dateOfBirth', value)}
            placeholder="DD/MM/YYYY"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Citizenship</Text>
          <TextInput
            style={styles.input}
            value={formData.citizenship}
            onChangeText={(value) => onChange('citizenship', value)}
            placeholder="Enter citizenship"
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
        <Text style={styles.label}>Contact Address</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.contactAddress}
          onChangeText={(value) => onChange('contactAddress', value)}
          multiline
          numberOfLines={3}
          placeholder="Enter contact address"
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
