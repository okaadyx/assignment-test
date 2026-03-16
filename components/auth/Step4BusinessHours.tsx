import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppButton } from '../core';
import { Colors, Spacing } from '../../constants/Theme';
import { Step4Props } from '../../types/SignupTypes';
import { DAYS, TIME_SLOTS } from '../../constants/SignupConstants';

export const Step4BusinessHours: React.FC<Step4Props> = ({ 
  nextStep, 
  prevStep, 
  selectedDays, 
  toggleDay, 
  selectedHours, 
  setSelectedHours 
}) => {
  return (
    <View>
      <Text style={styles.title}>Business Hours</Text>
      <Text style={styles.description}>
        Choose the hours your farm is open for pickups. This will allow customers to order deliveries.
      </Text>
      
      <View style={styles.daysWrapper}>
        {DAYS.map((day) => (
          <TouchableOpacity 
            key={day} 
            onPress={() => toggleDay(day)}
            style={[
              styles.dayItem, 
              selectedDays.includes(day) && styles.dayItemSelected
            ]}
          >
            <Text style={[
              styles.dayItemText,
              selectedDays.includes(day) && styles.dayItemTextSelected
            ]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.hoursWrapper}>
        {TIME_SLOTS.map((slot) => (
          <TouchableOpacity 
            key={slot} 
            onPress={() => setSelectedHours(slot)}
            style={[
              styles.hourChip,
              selectedHours === slot && styles.hourChipSelected
            ]}
          >
            <Text style={[
              styles.hourText,
              selectedHours === slot && styles.hourTextSelected
            ]}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerWithBack}>
        <TouchableOpacity onPress={prevStep}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
        <AppButton title="Signup" onPress={nextStep} style={styles.continueButtonStep} />
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
  daysWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  dayItem: {
    width: 40,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayItemSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayItemText: {
    fontSize: 14,
    color: '#999',
  },
  dayItemTextSelected: {
    color: Colors.white,
  },
  hoursWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  hourChip: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.inputBackground,
    borderRadius: 8,
    minWidth: '45%',
    alignItems: 'center',
  },
  hourChipSelected: {
    backgroundColor: Colors.accent,
  },
  hourText: {
    fontSize: 13,
    color: Colors.text,
  },
  hourTextSelected: {
    fontWeight: '500',
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
  },
});
