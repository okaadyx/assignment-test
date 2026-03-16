import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppInput, AppButton } from '../core';
import { StateModal } from '../modal';
import { Colors, Spacing } from '../../constants/Theme';
import { StepProps } from '../../types/SignupTypes';

export const Step2FarmInfo: React.FC<StepProps> = ({ formData, updateFormData, nextStep, prevStep, error }) => {
  const [showStateModal, setShowStateModal] = useState(false);

  return (
    <View>
      <Text style={styles.title}>Farm Info</Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <AppInput 
        icon="business-outline"
        placeholder="Business Name"
        value={formData.businessName}
        onChangeText={(t) => updateFormData({ businessName: t })}
      />
      <AppInput 
        icon="leaf-outline"
        placeholder="Informal Name"
        value={formData.informalName}
        onChangeText={(t) => updateFormData({ informalName: t })}
      />
      <AppInput 
        icon="home-outline"
        placeholder="Street Address"
        value={formData.streetAddress}
        onChangeText={(t) => updateFormData({ streetAddress: t })}
      />
      <AppInput 
        icon="location-outline"
        placeholder="City"
        value={formData.city}
        onChangeText={(t) => updateFormData({ city: t })}
      />
      <View style={styles.row}>
        <TouchableOpacity 
          style={styles.stateDropdown} 
          onPress={() => setShowStateModal(true)}
        >
          <Text style={[styles.stateText, !formData.state && { color: '#999' }]}>
            {formData.state || 'State'}
          </Text>
          <Ionicons name="caret-down" size={12} color={Colors.text} />
        </TouchableOpacity>
        <View style={{ flex: 1.5 }}>
          <TextInput 
            placeholder="Enter Zipcode"
            style={styles.zipInput}
            placeholderTextColor="#999"
            value={formData.zip}
            keyboardType="numeric"
            onChangeText={(t) => updateFormData({ zip: t })}
          />
        </View>
      </View>

      <View style={styles.footerWithBack}>
        <TouchableOpacity onPress={prevStep}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <AppButton title="Continue" onPress={nextStep} style={styles.continueButtonStep} />
      </View>

      <StateModal
        visible={showStateModal}
        onClose={() => setShowStateModal(false)}
        selectedState={formData.state}
        onSelect={(state) => {
          updateFormData({ state });
          setShowStateModal(false);
        }}
      />
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
  row: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: Spacing.sm,
  },
  stateDropdown: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
  },
  stateText: {
    fontSize: 14,
    color: Colors.text,
  },
  zipInput: {
    height: 48,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    color: Colors.text,
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
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
});
