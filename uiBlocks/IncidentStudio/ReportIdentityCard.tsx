import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IdentityDetailsCardProps {
  formData: {
    jurisdiction: string;
    authorityDesk: string;
    referenceYear: string;
    reportId: string;
    filedOn: string;
  };
  onChange: (name: 'jurisdiction' | 'authorityDesk' | 'referenceYear' | 'reportId' | 'filedOn', value: string) => void;
}

const ReportIdentityCard: React.FC<IdentityDetailsCardProps> = ({ formData, onChange }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Ionicons name="shield-checkmark" size={18} color="#7DF9FF" />
        <Text style={styles.title}>Report Identity</Text>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Jurisdiction *</Text>
          <TextInput
            style={styles.input}
            value={formData.jurisdiction}
            onChangeText={(value) => onChange('jurisdiction', value)}
            placeholder="Enter jurisdiction"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Authority Desk *</Text>
          <TextInput
            style={styles.input}
            value={formData.authorityDesk}
            onChangeText={(value) => onChange('authorityDesk', value)}
            placeholder="Enter authority desk"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.group}>
          <Text style={styles.label}>Reference Year</Text>
          <TextInput
            style={styles.input}
            value={formData.referenceYear}
            onChangeText={(value) => onChange('referenceYear', value)}
            keyboardType="numeric"
            placeholder="Enter year"
            placeholderTextColor="#7993B5"
          />
        </View>

        <View style={styles.group}>
          <Text style={styles.label}>Report ID *</Text>
          <TextInput
            style={styles.input}
            value={formData.reportId}
            onChangeText={(value) => onChange('reportId', value)}
            placeholder="Enter report ID"
            placeholderTextColor="#7993B5"
          />
        </View>
      </View>

      <View style={styles.group}>
        <Text style={styles.label}>Filed On</Text>
        <TextInput
          style={styles.input}
          value={formData.filedOn}
          onChangeText={(value) => onChange('filedOn', value)}
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
