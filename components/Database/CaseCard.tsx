import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TagList from './TagList';
import StatusBadge from './StatusBadge';
import { CaseRecord } from '../../types/cases';

interface CaseCardProps {
  caseItem: CaseRecord;
  onShowDetails: (id: number) => void;
  onEdit: (id: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem, onShowDetails, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.copyWrap}>
          <Text style={styles.title} numberOfLines={2}>{caseItem.caseHeading}</Text>
          <Text style={styles.query} numberOfLines={2}>{caseItem.query}</Text>
        </View>
        <StatusBadge status={caseItem.status} />
      </View>

      <TagList tags={caseItem.tags} />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, styles.viewButton]} onPress={() => onShowDetails(caseItem.id)}>
          <Text style={styles.viewButtonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.editButton]} onPress={() => onEdit(caseItem.id)}>
          <Text style={styles.editButtonText}>Edit Record</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 10,
    marginBottom: 10,
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  copyWrap: {
    flex: 1,
    gap: 6,
  },
  title: {
    color: '#EAF3FF',
    fontSize: 15,
    fontWeight: '800',
    lineHeight: 20,
  },
  query: {
    color: '#A3B8D4',
    fontSize: 13,
    lineHeight: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
    minHeight: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButton: {
    borderWidth: 1,
    borderColor: '#1D5563',
    backgroundColor: '#0A2230',
  },
  editButton: {
    backgroundColor: '#7DF9FF',
  },
  viewButtonText: {
    color: '#A7F5FF',
    fontSize: 12,
    fontWeight: '700',
  },
  editButtonText: {
    color: '#05111F',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default CaseCard;
