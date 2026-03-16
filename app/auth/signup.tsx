import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing } from '../../constants/Theme';

import {
  SignupHeader,
  Step1Welcome,
  Step2FarmInfo,
  Step3Verification,
  Step4BusinessHours,
  Step5Confirmation
} from '../../components';
import { useSignupForm } from '../../hooks';

export default function SignupScreen() {
  const {
    step,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    selectedDays,
    toggleDay,
    selectedHours,
    setSelectedHours,
    attachedFile,
    handleDocumentPick,
    removeFile,
  } = useSignupForm();

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1Welcome
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />;
      case 2:
        return <Step2FarmInfo
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />;
      case 3:
        return <Step3Verification
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          attachedFile={attachedFile}
          handleDocumentPick={handleDocumentPick}
          removeFile={removeFile}
        />;
      case 4:
        return <Step4BusinessHours
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          prevStep={prevStep}
          selectedDays={selectedDays}
          toggleDay={toggleDay}
          selectedHours={selectedHours}
          setSelectedHours={setSelectedHours}
        />;
      case 5:
        return <Step5Confirmation />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <SignupHeader step={step} />
          {renderStep()}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
});

