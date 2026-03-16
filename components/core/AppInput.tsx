import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextInputProps,
  TouchableOpacity
} from 'react-native';
import { Colors, Typography, Spacing } from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';

interface AppInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  containerStyle?: ViewStyle;
  onForgotPress?: () => void;
}

export const AppInput: React.FC<AppInputProps> = ({ 
  label, 
  error, 
  icon, 
  containerStyle, 
  secureTextEntry,
  onForgotPress,
  value,
  ...props 
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isSecure = secureTextEntry && !isPasswordVisible;
  const showForgot = onForgotPress && !value;

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.inputContainer, error ? styles.inputError : null]}>
        {icon && (
          <Ionicons 
            name={icon} 
            size={20} 
            color={Colors.textSecondary} 
            style={styles.icon} 
          />
        )}
        <TextInput 
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry={isSecure}
          value={value}
          {...props}
        />
        {secureTextEntry && (
          <View style={styles.rightArea}>
            {showForgot ? (
              <TouchableOpacity onPress={onForgotPress}>
                <Text style={styles.forgotText}>Forgot?</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity 
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                style={styles.eyeIcon}
              >
                <Ionicons 
                  name={isPasswordVisible ? "eye-off-outline" : "eye-outline"} 
                  size={20} 
                  color={Colors.textSecondary} 
                />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    ...Typography.caption,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    height: 48,
  },
  inputError: {
    borderWidth: 1,
    borderColor: Colors.error,
  },
  icon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    ...Typography.body,
    fontSize: 14,
    color: Colors.text,
  },
  rightArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  eyeIcon: {
    paddingLeft: Spacing.sm,
  },
  errorText: {
    ...Typography.caption,
    color: Colors.error,
    marginTop: Spacing.xs,
    marginLeft: Spacing.sm,
  },
});
