import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface StudioHeaderProps {
  title: string;
  subtitle: string;
}

const StudioHeaderBanner: React.FC<StudioHeaderProps> = ({ title, subtitle }) => {
  return (
    <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconWrap}>
          <Ionicons name="document-text" size={26} color="#05111F" />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#26486D',
    paddingHorizontal: 18,
    paddingVertical: 24,
  },
  content: {
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
  title: {
    color: '#EAF4FF',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  subtitle: {
    color: '#A8C0DD',
    fontSize: 13,
    lineHeight: 19,
  },
});

export default StudioHeaderBanner;
