import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  ViewStyle, 
  TextStyle, 
  TouchableOpacityProps 
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/Theme';

interface AppButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const AppButton: React.FC<AppButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  style, 
  textStyle,
  disabled,
  ...props 
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary': return [styles.button, styles.secondary];
      case 'outline': return [styles.button, styles.outline];
      case 'ghost': return [styles.button, styles.ghost];
      default: return [styles.button, styles.primary];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline': return [styles.text, styles.textOutline];
      case 'ghost': return [styles.text, styles.textGhost];
      default: return [styles.text];
    }
  };

  return (
    <TouchableOpacity 
      onPress={onPress} 
      style={[getButtonStyle(), style, (disabled || loading) && styles.disabled]}
      disabled={disabled || loading}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? Colors.primary : Colors.white} />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primary: {
    backgroundColor: Colors.primary,
  },
  secondary: {
    backgroundColor: Colors.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  text: {
    ...Typography.button,
    color: Colors.white,
  },
  textOutline: {
    color: Colors.primary,
  },
  textGhost: {
    color: Colors.primary,
  },
  disabled: {
    opacity: 0.5,
  },
});
