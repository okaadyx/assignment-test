import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '../core';
import { Colors, Spacing } from '../../constants/Theme';
import { Step3Props } from '../../types/SignupTypes';

export const Step3Verification: React.FC<Step3Props> = ({ 
  nextStep, 
  prevStep, 
  handleDocumentPick, 
  attachedFile, 
  removeFile 
}) => {
  return (
    <View>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.description}>
        Attached proof of Department of Agriculture registrations i.e. Florida Fresh, USDA Approved, USDA Organic
      </Text>
      
      <View style={styles.uploadRow}>
        <Text style={styles.uploadLabel}>Attach proof of registration</Text>
        <TouchableOpacity 
          style={styles.cameraIconContainer}
          onPress={handleDocumentPick}
        >
          <Ionicons name="camera" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {attachedFile && (
        <View style={styles.fileChip}>
          <Text style={styles.fileName}>{attachedFile.name}</Text>
          <TouchableOpacity onPress={removeFile}>
            <Ionicons name="close" size={16} color={Colors.textSecondary} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.footerWithBack}>
        <TouchableOpacity onPress={prevStep}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <AppButton title="Continue" onPress={nextStep} style={styles.continueButtonStep} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xl,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: Spacing.xl,
  },
  uploadRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  uploadLabel: {
    fontSize: 14,
    color: Colors.text,
  },
  cameraIconContainer: {
    backgroundColor: Colors.primary,
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fileChip: {
    flexDirection: 'row',
    backgroundColor: Colors.inputBackground,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: 8,
    marginTop: Spacing.xl,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  fileName: {
    fontSize: 14,
    color: Colors.text,
    textDecorationLine: 'underline',
  },
  footerWithBack: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.xxl,
  },
  continueButtonStep: {
    width: 200,
    borderRadius: 30,
    height: 50,
  },
});
