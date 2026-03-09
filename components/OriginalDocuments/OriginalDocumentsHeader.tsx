import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OriginalDocumentsHeaderProps {
  title: string;
  subtitle: string;
  iconName?: keyof typeof Ionicons.glyphMap;
}

const OriginalDocumentsHeader: React.FC<OriginalDocumentsHeaderProps> = ({
  title,
  subtitle,
  iconName = 'folder-open',
}) => {
  return (
    <View style={styles.wrap}>
      <View style={styles.icon}>
        <Ionicons name={iconName} size={18} color="#05111F" />
      </View>
      <View style={styles.textWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    marginHorizontal: 20,
    marginTop: 18,
    marginBottom: 10,
    backgroundColor: '#101D34',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A4468',
    padding: 14,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  icon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: '#EAF4FF',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitle: {
    color: '#A8C0DD',
    fontSize: 12,
    lineHeight: 17,
    marginTop: 2,
  },
});

export default OriginalDocumentsHeader;
