import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StatusBadge from './StatusBadge';
import TagList from './TagList';

interface CaseItem {
  id: number;
  caseHeading: string;
  query: string;
  applicableArticle?: string;
  description: string;
  status: string;
  tags?: string;
}

interface CaseCardProps {
  caseItem: CaseItem;
  onShowDetails: (id: number) => void;
  onEdit: (id: number) => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseItem, onShowDetails, onEdit }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.titleWrap}>
          <Text style={styles.title} numberOfLines={2}>
            {caseItem.caseHeading}
          </Text>
          <Text style={styles.query} numberOfLines={2}>
            {caseItem.query}
          </Text>
        </View>
        <StatusBadge status={caseItem.status} />
      </View>

      <TagList tags={caseItem.tags} />

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.action, styles.viewAction]} onPress={() => onShowDetails(caseItem.id)}>
          <Text style={styles.viewText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.action, styles.editAction]} onPress={() => onEdit(caseItem.id)}>
          <Text style={styles.editText}>Edit Record</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#101D34',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 12,
    marginBottom: 10,
    gap: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 10,
  },
  titleWrap: {
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
  action: {
    flex: 1,
    minHeight: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewAction: {
    backgroundColor: '#0A2230',
    borderWidth: 1,
    borderColor: '#1D5563',
  },
  editAction: {
    backgroundColor: '#7DF9FF',
  },
  viewText: {
    color: '#A7F5FF',
    fontSize: 12,
    fontWeight: '700',
  },
  editText: {
    color: '#05111F',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default CaseCard;
