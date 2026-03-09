import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ResponseData {
  acts?: Record<string, string>;
  description?: string;
  [key: string]: any;
}

interface QueryResponseProps {
  response: ResponseData | string;
  isLoading: boolean;
  error: string;
}

const QueryResponse: React.FC<QueryResponseProps> = ({ response, isLoading, error }) => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const renderResponse = (data: ResponseData | string): React.ReactElement => {
    if (typeof data === 'string') {
      return <Text style={styles.text}>{data}</Text>;
    }

    if (data.acts && Object.keys(data.acts).length > 0) {
      return (
        <View style={styles.stack}>
          {Object.entries(data.acts).map(([act, description]) => (
            <View key={act} style={styles.item}>
              <TouchableOpacity
                style={styles.itemHeader}
                onPress={() => setActiveSection(activeSection === act ? null : act)}
              >
                <Text style={styles.itemTitle}>{act}</Text>
                <Ionicons
                  name={activeSection === act ? 'chevron-up' : 'chevron-down'}
                  size={18}
                  color="#9FB4D1"
                />
              </TouchableOpacity>
              {activeSection === act && <Text style={styles.itemBody}>{description}</Text>}
            </View>
          ))}
          {data.description ? (
            <View style={styles.summary}>
              <Text style={styles.summaryTitle}>Summary</Text>
              <Text style={styles.summaryText}>{data.description}</Text>
            </View>
          ) : null}
        </View>
      );
    }

    return <Text style={styles.text}>No response data available.</Text>;
  };

  return (
    <View style={styles.box}>
      <Text style={styles.label}>Analysis Output</Text>
      {isLoading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="large" color="#7DF9FF" />
          <Text style={styles.loaderText}>Analyzing query...</Text>
        </View>
      ) : error ? (
        <Text style={styles.error}>{error}</Text>
      ) : (
        renderResponse(response)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 12,
    gap: 10,
  },
  label: {
    color: '#A8C0DD',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  text: {
    color: '#CFE0F6',
    fontSize: 14,
    lineHeight: 20,
  },
  stack: {
    gap: 8,
  },
  item: {
    borderRadius: 12,
    backgroundColor: '#0A162A',
    borderWidth: 1,
    borderColor: '#2B4B74',
  },
  itemHeader: {
    paddingHorizontal: 11,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  itemTitle: {
    flex: 1,
    color: '#EAF2FF',
    fontSize: 13,
    fontWeight: '700',
  },
  itemBody: {
    color: '#A3B8D4',
    fontSize: 13,
    lineHeight: 19,
    paddingHorizontal: 11,
    paddingBottom: 10,
  },
  summary: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1D5563',
    backgroundColor: '#0A232D',
    padding: 11,
  },
  summaryTitle: {
    color: '#7DF9FF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  summaryText: {
    color: '#C3F2FF',
    fontSize: 13,
    lineHeight: 19,
  },
  loaderWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  loaderText: {
    color: '#9FB4D1',
    fontSize: 13,
  },
  error: {
    color: '#FCA5A5',
    fontSize: 13,
    lineHeight: 19,
  },
});

export default QueryResponse;
