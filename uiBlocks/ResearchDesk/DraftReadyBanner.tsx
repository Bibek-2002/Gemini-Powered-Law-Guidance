import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CasePopupProps {
  visible: boolean;
  onPress: () => void;
}

const DraftReadyBanner: React.FC<CasePopupProps> = ({ visible, onPress }) => {
  if (!visible) {
    return null;
  }

  return (
    <TouchableOpacity style={styles.popup} onPress={onPress} activeOpacity={0.9}>
      <Ionicons name="bookmark" size={18} color="#FFFFFF" />
      <Text style={styles.text}>New case ready. Tap to review before saving.</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  popup: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 92,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#1E3A8A',
    backgroundColor: '#0F172A',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 11,
  },
  text: {
    flex: 1,
    color: '#E2E8F0',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 17,
  },
});

export default DraftReadyBanner;
