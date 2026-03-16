import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing } from '../../constants/Theme';

interface SocialLinkProps {
  type: 'google' | 'apple' | 'facebook';
  onPress: () => void;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ type, onPress }) => {
  const getIcon = () => {
    switch (type) {
      case 'google': return 'logo-google';
      case 'apple': return 'logo-apple';
      case 'facebook': return 'logo-facebook';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'google': return Colors.google;
      case 'apple': return Colors.apple;
      case 'facebook': return Colors.facebook;
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name={getIcon()} size={24} color={getIconColor()} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Spacing.sm,
  },
});
