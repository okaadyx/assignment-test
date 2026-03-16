import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { SignupFormData, SignupStep, AttachedFile } from '../types/SignupTypes';

export const useSignupForm = () => {
  const [step, setStep] = useState<SignupStep>(1);
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    rePassword: '',
    businessName: '',
    informalName: '',
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  });
  
  const [selectedDays, setSelectedDays] = useState<string[]>(['M', 'T', 'W', 'Th', 'F']);
  const [selectedHours, setSelectedHours] = useState<string>('8:00am - 10:00am');
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);

  const router = useRouter();

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 5) as SignupStep);
  
  const prevStep = () => {
    if (step === 1) router.back();
    else setStep((s) => Math.max(s - 1, 1) as SignupStep);
  };

  const toggleDay = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleDocumentPick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'image/*'],
      });
      
      if (!result.canceled) {
        setAttachedFile({
          name: result.assets[0].name,
          uri: result.assets[0].uri
        });
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const removeFile = () => setAttachedFile(null);

  return {
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
    router,
  };
};
