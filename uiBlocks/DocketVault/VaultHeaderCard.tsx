import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface DatabaseHeaderProps {
  title?: string;
  count?: number;
}

const VaultHeaderCard: React.FC<DatabaseHeaderProps> = ({ title = 'Case Database', count = 0 }) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.iconWrap}>
          <Ionicons name="archive" size={19} color="#05111F" />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>Saved records: {count}</Text>
        </View>
      </View>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Offline Ready</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#294569',
    backgroundColor: '#101D34',
    gap: 10,
    padding: 14,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 11,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#EAF4FF',
    fontSize: 21,
    fontWeight: '800',
  },
  subtitle: {
    color: '#A8C0DD',
    fontSize: 12,
    marginTop: 1,
  },
  badge: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1E5366',
    backgroundColor: '#0A2230',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    color: '#7DF9FF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },
});

export default VaultHeaderCard;
