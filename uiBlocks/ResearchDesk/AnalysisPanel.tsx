import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ResponsePayload {
  acts?: Record<string, string>;
  description?: string;
}

interface QueryResponseProps {
  response: ResponsePayload | string;
  isLoading: boolean;
  error: string;
}

const AnalysisPanel: React.FC<QueryResponseProps> = ({ response, isLoading, error }) => {
  const [expandedAct, setExpandedAct] = useState<string | null>(null);

  const renderPayload = (payload: ResponsePayload | string): React.ReactElement => {
    if (typeof payload === 'string') {
      return <Text style={styles.plainText}>{payload}</Text>;
    }

    const acts = payload.acts ?? {};
    const actEntries = Object.entries(acts);

    if (actEntries.length === 0 && !payload.description) {
      return <Text style={styles.plainText}>No response data available.</Text>;
    }

    return (
      <View style={styles.stack}>
        {actEntries.map(([actName, actReason]) => {
          const isExpanded = expandedAct === actName;
          return (
            <View key={actName} style={styles.item}>
              <TouchableOpacity style={styles.itemHeader} onPress={() => setExpandedAct(isExpanded ? null : actName)}>
                <Text style={styles.itemTitle}>{actName}</Text>
                <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color="#9FB4D1" />
              </TouchableOpacity>
              {isExpanded ? <Text style={styles.itemBody}>{actReason}</Text> : null}
            </View>
          );
        })}

        {payload.description ? (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Summary</Text>
            <Text style={styles.summaryText}>{payload.description}</Text>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Analysis Output</Text>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#7DF9FF" />
          <Text style={styles.loaderText}>Analyzing query...</Text>
        </View>
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        renderPayload(response)
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 10,
    padding: 12,
  },
  label: {
    color: '#A8C0DD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
  plainText: {
    color: '#CFE0F6',
    fontSize: 14,
    lineHeight: 20,
  },
  stack: {
    gap: 8,
  },
  item: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B4B74',
    backgroundColor: '#0A162A',
  },
  itemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    paddingHorizontal: 11,
    paddingVertical: 10,
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
  summaryCard: {
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
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  loaderText: {
    color: '#9FB4D1',
    fontSize: 13,
  },
  errorText: {
    color: '#FCA5A5',
    fontSize: 13,
    lineHeight: 19,
  },
});

export default AnalysisPanel;
