import React, { useEffect, useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import OriginalDocumentsHeader from '../components/OriginalDocuments/OriginalDocumentsHeader';
import SearchBar from '../components/OriginalDocuments/SearchBar';
import PdfCard from '../components/OriginalDocuments/PdfCard';
import LoadingState from '../components/OriginalDocuments/LoadingState';

interface PdfItem {
  id: number;
  act_name: string;
  description: string;
}

const dummyPdfData: PdfItem[] = [
  { id: 1, act_name: 'Indian Penal Code (IPC) 1860', description: 'Criminal law provisions and punishments.' },
  { id: 2, act_name: 'Code of Criminal Procedure (CrPC) 1973', description: 'Criminal procedure and court process.' },
  { id: 3, act_name: 'Indian Evidence Act 1872', description: 'Admissibility and relevance of evidence.' },
  { id: 4, act_name: 'Motor Vehicles Act 1988', description: 'Road transport and traffic regulation.' },
  { id: 5, act_name: 'Negotiable Instruments Act 1881', description: 'Law related to cheques and instruments.' },
  { id: 6, act_name: 'Indian Contract Act 1872', description: 'Fundamentals of legal contracts.' },
  { id: 7, act_name: 'Companies Act 2013', description: 'Company formation and corporate governance.' },
  { id: 8, act_name: 'Income Tax Act 1961', description: 'Taxation principles and compliance.' },
  { id: 9, act_name: 'Constitution of India 1950', description: 'Foundational constitutional framework.' },
  { id: 10, act_name: 'Civil Procedure Code (CPC) 1908', description: 'Rules for civil litigation.' },
];

const OriginalDocuments: React.FC = () => {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [filteredPdfs, setFilteredPdfs] = useState<PdfItem[]>([]);
  const [pdfSearchQuery, setPdfSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setPdfs(dummyPdfData);
    setFilteredPdfs(dummyPdfData);
    setLoading(false);
  }, []);

  const handlePdfSearchChange = (query: string) => {
    setPdfSearchQuery(query);
    if (query.trim() === '') {
      setFilteredPdfs(pdfs);
      return;
    }
    const q = query.toLowerCase();
    setFilteredPdfs(
      pdfs.filter((pdf) => pdf.act_name.toLowerCase().includes(q) || pdf.description.toLowerCase().includes(q))
    );
  };

  const handleDownloadPdf = async (_pdfId: number) => {
    Alert.alert('Notice', 'Independent mode active. Direct backend document download is disabled.');
  };

  return (
    <View style={styles.container}>
      <OriginalDocumentsHeader
        title="Document Bank"
        subtitle="Locate legal references and static source material"
      />

      <View style={styles.metaBar}>
        <Text style={styles.metaText}>Available: {filteredPdfs.length}</Text>
        <Text style={styles.metaText}>Source: Local dataset</Text>
      </View>

      <SearchBar
        value={pdfSearchQuery}
        onChangeText={handlePdfSearchChange}
        placeholder="Search acts, code names, or topics..."
      />

      {loading ? (
        <LoadingState message="Loading documents..." />
      ) : (
        <FlatList
          data={filteredPdfs}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <PdfCard
              pdf={item}
              onDownload={handleDownloadPdf}
              isDownloading={false}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  metaBar: {
    marginHorizontal: 20,
    marginBottom: 10,
    backgroundColor: '#0D1B31',
    borderRadius: 11,
    borderWidth: 1,
    borderColor: '#25466D',
    paddingHorizontal: 10,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  metaText: {
    color: '#F6A720',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  listContainer: {
    padding: 20,
    paddingTop: 4,
    paddingBottom: 30,
  },
});

export default OriginalDocuments;
