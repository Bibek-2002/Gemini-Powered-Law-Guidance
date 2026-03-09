import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface TagListProps {
  tags?: string;
  editable?: boolean;
  onRemoveTag?: (index: number) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, editable = false, onRemoveTag }) => {
  if (!tags) {
    return <Text style={styles.noTagsText}>No tags available</Text>;
  }

  const tagsArray = tags
    .replace(/[\[\]']+/g, '')
    .split(',')
    .map((tag) => tag.trim())
    .filter((tag) => tag.length > 0);

  return (
    <View style={styles.tagContainer}>
      {tagsArray.map((tag, index) => (
        <View key={index} style={styles.tagItem}>
          <Text style={styles.tagText}>{tag}</Text>
          {editable && onRemoveTag && (
            <TouchableOpacity onPress={() => onRemoveTag(index)} style={styles.removeButton}>
              <Ionicons name="close" size={12} color="#EAF2FF" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tagItem: {
    backgroundColor: '#0A2230',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1E5366',
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
  noTagsText: {
    color: '#93A8C5',
    fontSize: 13,
    fontStyle: 'italic',
  },
});

export default TagList;
