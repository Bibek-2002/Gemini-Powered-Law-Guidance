import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TagListProps {
  tags?: string;
  editable?: boolean;
  onRemoveTag?: (index: number) => void;
}

const parseTags = (value: string): string[] => {
  return value
    .replace(/[\[\]']+/g, '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
};

const CaseTagChips: React.FC<TagListProps> = ({ tags, editable = false, onRemoveTag }) => {
  if (!tags) {
    return <Text style={styles.emptyText}>No tags available</Text>;
  }

  const tagItems = parseTags(tags);

  if (tagItems.length === 0) {
    return <Text style={styles.emptyText}>No tags available</Text>;
  }

  return (
    <View style={styles.container}>
      {tagItems.map((tag, index) => (
        <View key={`${tag}-${index}`} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
          {editable && onRemoveTag ? (
            <TouchableOpacity onPress={() => onRemoveTag(index)} style={styles.removeButton}>
              <Ionicons name="close" size={12} color="#EAF2FF" />
            </TouchableOpacity>
          ) : null}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1E5366',
    backgroundColor: '#0A2230',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 11,
    paddingVertical: 6,
  },
  tagText: {
    color: '#A7F5FF',
    fontSize: 13,
    fontWeight: '600',
  },
  removeButton: {
    marginLeft: 8,
    paddingHorizontal: 4,
  },
  emptyText: {
    color: '#93A8C5',
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default CaseTagChips;
