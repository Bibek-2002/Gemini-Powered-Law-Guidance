import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface FIRHeaderProps {
  title: string;
  subtitle: string;
}

const FIRHeader: React.FC<FIRHeaderProps> = ({ title, subtitle }) => {
  return (
    <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.header}>
      <View style={styles.headerContent}>
        <View style={styles.iconWrap}>
          <Ionicons name="document-text" size={26} color="#05111F" />
        </View>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>{subtitle}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 24,
    paddingHorizontal: 18,
    borderRadius: 24,
    marginHorizontal: 20,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#26486D',
  },
  headerContent: {
    alignItems: 'flex-start',
    gap: 7,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#EAF4FF',
    lineHeight: 34,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#A8C0DD',
    lineHeight: 19,
  },
});

export default FIRHeader;
