import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { STATUTE_REFERENCE_LIBRARY, type StatuteDeckBrief } from '../legalData/statuteLibrary';

const DEFAULT_TAB = STATUTE_REFERENCE_LIBRARY[0]?.code ?? '';

const normalize = (value: string): string => value.trim().toLowerCase();

const StatuteExplorerScreen: React.FC = () => {
  const [activeCode, setActiveCode] = useState<string>(DEFAULT_TAB);
  const [query, setQuery] = useState<string>('');

  const activeBrief = useMemo(
    () => STATUTE_REFERENCE_LIBRARY.find((entry) => entry.code === activeCode) ?? STATUTE_REFERENCE_LIBRARY[0],
    [activeCode]
  );

  const filteredSections = useMemo(() => {
    if (!activeBrief) {
      return [];
    }

    const normalizedQuery = normalize(query);
    if (!normalizedQuery) {
      return activeBrief.sections;
    }

    return activeBrief.sections.filter((item) => {
      const haystack = `${item.section} ${item.topic} ${item.note}`.toLowerCase();
      return haystack.includes(normalizedQuery);
    });
  }, [activeBrief, query]);

  if (!activeBrief) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>No statute decks configured.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <Text style={styles.heroEyebrow}>Reference Workspace</Text>
        <Text style={styles.heroTitle}>Statute Notebook</Text>
        <Text style={styles.heroSubtitle}>
          Curated quick-reference cards for drafting, investigation prep, and issue spotting.
        </Text>
      </View>

      <View style={styles.tabWrap}>
        {STATUTE_REFERENCE_LIBRARY.map((entry) => {
          const selected = entry.code === activeCode;
          return (
            <TouchableOpacity
              key={entry.code}
              style={[styles.tabButton, selected && styles.tabButtonActive]}
              onPress={() => setActiveCode(entry.code)}
            >
              <Text style={[styles.tabText, selected && styles.tabTextActive]}>{entry.code}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.metaCard}>
        <Text style={styles.metaTitle}>{activeBrief.title}</Text>
        <Text style={styles.metaText}>{activeBrief.objective}</Text>
        <Text style={styles.metaStamp}>{activeBrief.updated}</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search section, topic, or keyword"
        placeholderTextColor="#7D93AF"
        value={query}
        onChangeText={setQuery}
      />

      <View style={styles.resultHeader}>
        <Text style={styles.resultTitle}>Section Highlights</Text>
        <Text style={styles.resultCount}>{filteredSections.length} items</Text>
      </View>

      {filteredSections.length > 0 ? (
        filteredSections.map((item) => (
          <View key={`${activeBrief.code}-${item.section}`} style={styles.sectionCard}>
            <Text style={styles.sectionBadge}>Section {item.section}</Text>
            <Text style={styles.sectionTopic}>{item.topic}</Text>
            <Text style={styles.sectionNote}>{item.note}</Text>
          </View>
        ))
      ) : (
        <View style={styles.noMatchCard}>
          <Text style={styles.noMatchTitle}>No matches for this query.</Text>
          <Text style={styles.noMatchText}>Try a section number, topic keyword, or switch the statute deck.</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  content: {
    gap: 12,
    padding: 18,
    paddingBottom: 26,
  },
  hero: {
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#26486D',
    backgroundColor: '#0C1527',
    gap: 6,
    padding: 18,
  },
  heroEyebrow: {
    color: '#7DF9FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.9,
    textTransform: 'uppercase',
  },
  heroTitle: {
    color: '#EAF4FF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 33,
  },
  heroSubtitle: {
    color: '#A8C0DD',
    fontSize: 13,
    lineHeight: 19,
  },
  tabWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tabButton: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#2E4B71',
    backgroundColor: '#0E1A30',
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  tabButtonActive: {
    borderColor: '#7DF9FF',
    backgroundColor: '#7DF9FF20',
  },
  tabText: {
    color: '#A8C0DD',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: '#7DF9FF',
  },
  metaCard: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 4,
    padding: 14,
  },
  metaTitle: {
    color: '#EAF3FF',
    fontSize: 16,
    fontWeight: '800',
  },
  metaText: {
    color: '#B8CEE8',
    fontSize: 12,
    lineHeight: 18,
  },
  metaStamp: {
    color: '#7FA3C7',
    fontSize: 11,
    fontWeight: '600',
  },
  searchInput: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2B4B74',
    backgroundColor: '#0A162A',
    color: '#EAF3FF',
    fontSize: 14,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resultTitle: {
    color: '#EAF3FF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  resultCount: {
    color: '#F6A720',
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2E4B71',
    backgroundColor: '#0F1B31',
    gap: 4,
    padding: 12,
  },
  sectionBadge: {
    color: '#7DF9FF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.7,
    textTransform: 'uppercase',
  },
  sectionTopic: {
    color: '#EAF3FF',
    fontSize: 14,
    fontWeight: '700',
  },
  sectionNote: {
    color: '#A8C0DD',
    fontSize: 12,
    lineHeight: 18,
  },
  noMatchCard: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3A4F6D',
    backgroundColor: '#101B2F',
    gap: 5,
    padding: 14,
  },
  noMatchTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
  },
  noMatchText: {
    color: '#A8C0DD',
    fontSize: 12,
    lineHeight: 17,
  },
  emptyState: {
    flex: 1,
    backgroundColor: '#050A18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyTitle: {
    color: '#EAF3FF',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default StatuteExplorerScreen;


