import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Download: React.FC = () => {
  const handleAndroidDownload = () => {
    Linking.openURL('https://drive.google.com/uc?export=download&id=1lPszpovE10_TFEdpZn9Ufbg13sfMSxAz');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      <LinearGradient colors={['#0A0F1D', '#17345E', '#0B4A6F']} style={styles.hero}>
        <Text style={styles.heroTag}>Install</Text>
        <Text style={styles.heroTitle}>Get LawAI Mobile</Text>
        <Text style={styles.heroSubtitle}>
          Download the latest Android package for full access to all legal workflow modules.
        </Text>
      </LinearGradient>

      <TouchableOpacity style={styles.primaryCard} onPress={handleAndroidDownload} activeOpacity={0.88}>
        <View style={styles.iconWrap}>
          <Ionicons name="logo-android" size={24} color="#05111F" />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.platformTitle}>Android Package</Text>
          <Text style={styles.platformSubtitle}>Direct APK delivery</Text>
        </View>
        <Ionicons name="download" size={20} color="#7DF9FF" />
      </TouchableOpacity>

      <View style={styles.secondaryCard}>
        <Text style={styles.secondaryTitle}>Release Notes</Text>
        <Text style={styles.secondaryItem}>- Complete interface redesign</Text>
        <Text style={styles.secondaryItem}>- Core legal modules preserved</Text>
        <Text style={styles.secondaryItem}>- Streamlined navigation structure</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050A18',
  },
  contentContainer: {
    padding: 18,
    paddingBottom: 26,
    gap: 14,
  },
  hero: {
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: '#26486D',
  },
  heroTag: {
    color: '#7DF9FF',
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    fontWeight: '800',
    marginBottom: 8,
  },
  heroTitle: {
    color: '#EAF4FF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  heroSubtitle: {
    color: '#A8C0DD',
    fontSize: 14,
    lineHeight: 20,
  },
  primaryCard: {
    backgroundColor: '#101D34',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#294569',
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 10,
    backgroundColor: '#7DF9FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textWrap: {
    flex: 1,
  },
  platformTitle: {
    color: '#E8F2FF',
    fontSize: 15,
    fontWeight: '700',
  },
  platformSubtitle: {
    color: '#9EB4D1',
    fontSize: 12,
    marginTop: 2,
  },
  secondaryCard: {
    backgroundColor: '#0D1B31',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#24466E',
    padding: 14,
    gap: 5,
  },
  secondaryTitle: {
    color: '#F6A720',
    fontSize: 13,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 3,
  },
  secondaryItem: {
    color: '#D5E6FD',
    fontSize: 13,
    lineHeight: 18,
  },
});

export default Download;
