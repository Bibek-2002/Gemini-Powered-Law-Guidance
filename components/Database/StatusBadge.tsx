import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface StatusBadgeProps {
  status: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const normalized = status.toLowerCase();

  const getStatusColor = (value: string) => {
    if (value === 'assigned') return '#84CC16';
    if (value === 'closed') return '#F87171';
    if (value === 'under-investigation' || value === 'under investigation') return '#F6A720';
    return '#7C94B6';
  };

  const getStatusText = (value: string) => {
    if (value === 'under-investigation' || value === 'under investigation') return 'Under Investigation';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  return (
    <View style={[styles.badge, { backgroundColor: getStatusColor(normalized) }]}>
      <Text style={styles.badgeText}>{getStatusText(normalized)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  badgeText: {
    color: '#05111F',
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
});

export default StatusBadge;
