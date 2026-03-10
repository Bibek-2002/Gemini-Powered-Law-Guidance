import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusBadgeProps {
  status: string;
}

const getStatusColor = (value: string): string => {
  if (value === 'assigned') {
    return '#84CC16';
  }
  if (value === 'closed') {
    return '#F87171';
  }
  if (value === 'under-investigation' || value === 'under investigation') {
    return '#F6A720';
  }
  return '#7C94B6';
};

const getStatusLabel = (value: string): string => {
  if (value === 'under-investigation' || value === 'under investigation') {
    return 'Under Investigation';
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor(normalized) }]}> 
      <Text style={styles.badgeText}>{getStatusLabel(normalized)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingVertical: 4,
    paddingHorizontal: 10,
  },
  badgeText: {
    color: '#05111F',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default StatusBadge;
