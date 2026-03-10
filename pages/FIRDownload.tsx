import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import {
  FIRHeader,
  DownloadSection,
  FIRDetailsCard,
  OffenceDetailsCard,
  ComplainantDetailsCard,
  FormButton,
} from '../components/FIR';

interface FIRFormState {
  district: string;
  policeStation: string;
  year: string;
  firNo: string;
  date: string;
  offenceDate: string;
  offenceTime: string;
  address: string;
  complainantName: string;
  fatherName: string;
  birthDate: string;
  nationality: string;
  occupation: string;
  complainantAddress: string;
}

const FIR_TEMPLATE_URL =
  'https://savelifefoundation.org/wp-content/uploads/2016/11/A1-Format-of-FIR-part-of-Step-I.docx';

const createInitialFormState = (): FIRFormState => ({
  district: '',
  policeStation: '',
  year: '',
  firNo: '',
  date: '',
  offenceDate: '',
  offenceTime: '',
  address: '',
  complainantName: '',
  fatherName: '',
  birthDate: '',
  nationality: '',
  occupation: '',
  complainantAddress: '',
});

const requiredFields: Array<keyof FIRFormState> = [
  'district',
  'policeStation',
  'firNo',
  'complainantName',
  'address',
];

const createFirHtml = (form: FIRFormState): string => `
  <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
        h1, h2 { text-align: center; color: #1D4ED8; }
        .section { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
        .field { margin: 8px 0; }
        .label { font-weight: bold; color: #333; }
        .value { margin-left: 10px; }
      </style>
    </head>
    <body>
      <h1>FORM - IF1 (Integrated Form)</h1>
      <h2>FIRST INFORMATION REPORT</h2>
      <div class="section">
        <h3>FIR Details</h3>
        <p class="field"><span class="label">District:</span><span class="value">${form.district}</span></p>
        <p class="field"><span class="label">Police Station:</span><span class="value">${form.policeStation}</span></p>
        <p class="field"><span class="label">Year:</span><span class="value">${form.year}</span></p>
        <p class="field"><span class="label">FIR No:</span><span class="value">${form.firNo}</span></p>
        <p class="field"><span class="label">Date:</span><span class="value">${form.date}</span></p>
      </div>
      <div class="section">
        <h3>Offence Details</h3>
        <p class="field"><span class="label">Offence Date:</span><span class="value">${form.offenceDate}</span></p>
        <p class="field"><span class="label">Offence Time:</span><span class="value">${form.offenceTime}</span></p>
        <p class="field"><span class="label">Address:</span><span class="value">${form.address}</span></p>
      </div>
      <div class="section">
        <h3>Complainant Details</h3>
        <p class="field"><span class="label">Name:</span><span class="value">${form.complainantName}</span></p>
        <p class="field"><span class="label">Father/Husband:</span><span class="value">${form.fatherName}</span></p>
        <p class="field"><span class="label">Date of Birth:</span><span class="value">${form.birthDate}</span></p>
        <p class="field"><span class="label">Nationality:</span><span class="value">${form.nationality}</span></p>
        <p class="field"><span class="label">Occupation:</span><span class="value">${form.occupation}</span></p>
        <p class="field"><span class="label">Address:</span><span class="value">${form.complainantAddress}</span></p>
      </div>
    </body>
  </html>
`;

const FIRDownload: React.FC = () => {
  const [form, setForm] = useState<FIRFormState>(createInitialFormState);
  const [downloading, setDownloading] = useState<boolean>(false);
  const [exportingPdf, setExportingPdf] = useState<boolean>(false);

  const updateField = (fieldName: string, value: string): void => {
    setForm((current) => ({
      ...current,
      [fieldName]: value,
    }));
  };

  const validateRequiredFields = (): boolean => {
    for (const field of requiredFields) {
      if (!String(form[field]).trim()) {
        Alert.alert('Validation Error', `Please fill the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const downloadDocxTemplate = async (): Promise<void> => {
    setDownloading(true);
    try {
      const destination = `${FileSystem.documentDirectory}FIR-Format.docx`;
      await FileSystem.downloadAsync(FIR_TEMPLATE_URL, destination);

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(destination);
      } else {
        Alert.alert('Download Complete', 'FIR format downloaded to your device.');
      }
    } catch {
      Alert.alert('Download Failed', 'Unable to download FIR format right now.');
    } finally {
      setDownloading(false);
    }
  };

  const exportPdf = async (): Promise<void> => {
    if (!validateRequiredFields()) {
      return;
    }

    setExportingPdf(true);

    try {
      const printable = await Print.printToFileAsync({
        html: createFirHtml(form),
      });

      if (!printable?.uri) {
        Alert.alert('Error', 'Failed to generate PDF.');
        return;
      }

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(printable.uri);
      } else {
        Alert.alert('PDF Generated', 'FIR report generated successfully.');
      }
    } catch {
      Alert.alert('Error', 'Failed to generate PDF.');
    } finally {
      setExportingPdf(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FIRHeader title="FIR Studio" subtitle="Download format, fill details, and export structured FIR reports" />

      <View style={styles.stepCard}>
        <Text style={styles.stepText}>Step 1: Download format</Text>
        <Text style={styles.stepText}>Step 2: Fill details</Text>
        <Text style={styles.stepText}>Step 3: Export PDF</Text>
      </View>

      <DownloadSection isDownloading={downloading} onDownload={downloadDocxTemplate} />

      <View style={styles.formCard}>
        <Text style={styles.formTitle}>Generate Custom FIR Report</Text>
        <Text style={styles.formSubtitle}>Enter required details and export a printable FIR summary instantly.</Text>

        <FIRDetailsCard
          formData={{
            district: form.district,
            policeStation: form.policeStation,
            year: form.year,
            firNo: form.firNo,
            date: form.date,
          }}
          onChange={updateField}
        />

        <OffenceDetailsCard
          formData={{
            offenceDate: form.offenceDate,
            offenceTime: form.offenceTime,
            address: form.address,
          }}
          onChange={updateField}
        />

        <ComplainantDetailsCard
          formData={{
            complainantName: form.complainantName,
            fatherName: form.fatherName,
            birthDate: form.birthDate,
            nationality: form.nationality,
            occupation: form.occupation,
            complainantAddress: form.complainantAddress,
          }}
          onChange={updateField}
        />

        <FormButton
          title="Generate FIR PDF"
          loadingTitle="Generating PDF..."
          isLoading={exportingPdf}
          onPress={exportPdf}
          iconName="document"
          backgroundColor="#7DF9FF"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  stepCard: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#25466D',
    backgroundColor: '#0D1B31',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 9,
  },
  stepText: {
    color: '#F6A720',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  formCard: {
    margin: 20,
    marginTop: 0,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#20385C',
    backgroundColor: '#0C1427',
    padding: 14,
  },
  formTitle: {
    color: '#EAF3FF',
    fontSize: 21,
    fontWeight: '800',
  },
  formSubtitle: {
    marginTop: 5,
    marginBottom: 12,
    color: '#9FB4D1',
    fontSize: 13,
    lineHeight: 19,
  },
});

export default FIRDownload;
