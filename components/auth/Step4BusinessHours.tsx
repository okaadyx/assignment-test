import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DAYS, TIME_SLOTS } from '../../constants/SignupConstants';
import { Colors, Spacing } from '../../constants/Theme';
import { BusinessHours, Step4Props } from '../../types/UserTypes';
import { AppButton } from '../core';

export const Step4BusinessHours: React.FC<Step4Props> = ({
  nextStep,
  prevStep,
  businessHours,
  activeDay,
  setActiveDay,
  toggleTimeSlot,
  loading,
  error
}) => {
  const mapping: Record<string, keyof BusinessHours> = {
    'M': 'mon', 'T': 'tue', 'W': 'wed', 'Th': 'thu', 'F': 'fri', 'S': 'sat', 'Su': 'sun'
  };
  const activeKey = mapping[activeDay] as keyof BusinessHours;
  const activeDaySlots = businessHours[activeKey] || [];

  return (
    <View>
      <Text style={styles.title}>Business Hours</Text>
      <Text style={styles.description}>
        Choose the hours your farm is open for pickups. This will allow customers to order deliveries.
      </Text>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <View style={styles.daysWrapper}>
        {DAYS.map((day) => (
          <TouchableOpacity
            key={day}
            onPress={() => setActiveDay(day)}
            style={[
              styles.dayItem,
              activeDay === day && styles.dayItemSelected
            ]}
          >
            <Text style={[
              styles.dayItemText,
              activeDay === day && styles.dayItemTextSelected
            ]}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.hoursWrapper}>
        {TIME_SLOTS.map((slot) => (
          <TouchableOpacity
            key={slot}
            onPress={() => toggleTimeSlot(activeDay, slot)}
            style={[
              styles.hourChip,
              activeDaySlots.includes(slot) && styles.hourChipSelected
            ]}
          >
            <Text style={[
              styles.hourText,
              activeDaySlots.includes(slot) && styles.hourTextSelected
            ]}>{slot}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footerWithBack}>
        <TouchableOpacity onPress={prevStep} disabled={loading}>
          <Ionicons name="arrow-back" size={24} color={loading ? '#CCC' : Colors.text} />
        </TouchableOpacity>
        <AppButton
          title={loading ? "Registering..." : "Signup"}
          onPress={nextStep}
          style={styles.continueButtonStep}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
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
