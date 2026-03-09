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

const FormToPDF: React.FC = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [formData, setFormData] = useState({
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

  const handleChange = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ['district', 'policeStation', 'firNo', 'complainantName', 'address'] as const;
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        Alert.alert('Validation Error', `Please fill the ${field} field.`);
        return false;
      }
    }
    return true;
  };

  const downloadDocx = async () => {
    setIsDownloading(true);
    try {
      const fileUri = FileSystem.documentDirectory + 'FIR-Format.docx';
      await FileSystem.downloadAsync(
        'https://savelifefoundation.org/wp-content/uploads/2016/11/A1-Format-of-FIR-part-of-Step-I.docx',
        fileUri
      );

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert('Download Complete', 'FIR format downloaded to your device.');
      }
    } catch (error) {
      Alert.alert('Download Failed', 'Unable to download FIR format right now.');
    } finally {
      setIsDownloading(false);
    }
  };

  const generatePDF = async () => {
    if (!validateForm()) return;
    setIsGeneratingPDF(true);

    const htmlContent = `
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
          <p class="field"><span class="label">District:</span><span class="value">${formData.district}</span></p>
          <p class="field"><span class="label">Police Station:</span><span class="value">${formData.policeStation}</span></p>
          <p class="field"><span class="label">Year:</span><span class="value">${formData.year}</span></p>
          <p class="field"><span class="label">FIR No:</span><span class="value">${formData.firNo}</span></p>
          <p class="field"><span class="label">Date:</span><span class="value">${formData.date}</span></p>
        </div>
        <div class="section">
          <h3>Offence Details</h3>
          <p class="field"><span class="label">Offence Date:</span><span class="value">${formData.offenceDate}</span></p>
          <p class="field"><span class="label">Offence Time:</span><span class="value">${formData.offenceTime}</span></p>
          <p class="field"><span class="label">Address:</span><span class="value">${formData.address}</span></p>
        </div>
        <div class="section">
          <h3>Complainant Details</h3>
          <p class="field"><span class="label">Name:</span><span class="value">${formData.complainantName}</span></p>
          <p class="field"><span class="label">Father/Husband:</span><span class="value">${formData.fatherName}</span></p>
          <p class="field"><span class="label">Date of Birth:</span><span class="value">${formData.birthDate}</span></p>
          <p class="field"><span class="label">Nationality:</span><span class="value">${formData.nationality}</span></p>
          <p class="field"><span class="label">Occupation:</span><span class="value">${formData.occupation}</span></p>
          <p class="field"><span class="label">Address:</span><span class="value">${formData.complainantAddress}</span></p>
        </div>
      </body>
      </html>
    `;

    try {
      const result = await Print.printToFileAsync({ html: htmlContent });
      if (result?.uri) {
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(result.uri);
        } else {
          Alert.alert('PDF Generated', 'FIR report generated successfully.');
        }
      } else {
        Alert.alert('Error', 'Failed to generate PDF.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to generate PDF.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <FIRHeader
        title="FIR Studio"
        subtitle="Download format, fill details, and export structured FIR reports"
      />

      <View style={styles.metaStrip}>
        <Text style={styles.metaItem}>Step 1: Download format</Text>
        <Text style={styles.metaItem}>Step 2: Fill details</Text>
        <Text style={styles.metaItem}>Step 3: Export PDF</Text>
      </View>

      <DownloadSection isDownloading={isDownloading} onDownload={downloadDocx} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Generate Custom FIR Report</Text>
        <Text style={styles.sectionDescription}>
          Enter required details and export a printable FIR summary instantly.
        </Text>

        <FIRDetailsCard
          formData={{
            district: formData.district,
            policeStation: formData.policeStation,
            year: formData.year,
            firNo: formData.firNo,
            date: formData.date,
          }}
          onChange={handleChange}
        />

        <OffenceDetailsCard
          formData={{
            offenceDate: formData.offenceDate,
            offenceTime: formData.offenceTime,
            address: formData.address,
          }}
          onChange={handleChange}
        />

        <ComplainantDetailsCard
          formData={{
            complainantName: formData.complainantName,
            fatherName: formData.fatherName,
            birthDate: formData.birthDate,
            nationality: formData.nationality,
            occupation: formData.occupation,
            complainantAddress: formData.complainantAddress,
          }}
          onChange={handleChange}
        />

        <FormButton
          title="Generate FIR PDF"
          loadingTitle="Generating PDF..."
          isLoading={isGeneratingPDF}
          onPress={generatePDF}
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
  metaStrip: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#0D1B31',
    borderWidth: 1,
    borderColor: '#25466D',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 9,
    gap: 5,
  },
  metaItem: {
    color: '#F6A720',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  section: {
    margin: 20,
    marginTop: 0,
    marginBottom: 20,
    backgroundColor: '#0C1427',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#20385C',
    padding: 14,
  },
  sectionTitle: {
    fontSize: 21,
    fontWeight: '800',
    color: '#EAF3FF',
  },
  sectionDescription: {
    fontSize: 13,
    color: '#9FB4D1',
    lineHeight: 19,
    marginTop: 5,
    marginBottom: 12,
  },
});

export default FormToPDF;
