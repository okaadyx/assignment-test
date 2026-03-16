import { useState } from 'react';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { SignupFormData, SignupStep, AttachedFile, RegisterRequest, BusinessHours } from '../types/SignupTypes';
import { api } from '../services';

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
  
  const [activeDay, setActiveDay] = useState<string>('M');
  const [businessHours, setBusinessHours] = useState<BusinessHours>({
    mon: [],
    tue: [],
    wed: [],
    thu: [],
    fri: [],
    sat: [],
    sun: [],
  });
  
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  const updateFormData = (data: Partial<SignupFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
    setError(null);
  };

  const validateStep = () => {
    setError(null);
    switch (step) {
      case 1:
        if (!formData.fullName || !formData.email || !formData.phone || !formData.password || !formData.rePassword) {
          setError('All fields are required.');
          return false;
        }
        if (formData.password !== formData.rePassword) {
          setError('Passwords do not match.');
          return false;
        }
        if (formData.password.length < 8) {
          setError('Password must be at least 8 characters.');
          return false;
        }
        return true;
      case 2:
        if (!formData.businessName || !formData.informalName || !formData.streetAddress || !formData.city || !formData.state || !formData.zip) {
          setError('All fields are required.');
          return false;
        }
        return true;
      case 3:
        if (!attachedFile) {
          setError('Registration proof is required.');
          return false;
        }
        return true;
      case 4:
        const hasHours = Object.values(businessHours).some(slots => slots && slots.length > 0);
        if (!hasHours) {
          setError('Please select at least one time slot for any day.');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => Math.min(s + 1, 5) as SignupStep);
    }
  };
  
  const prevStep = () => {
    if (step === 1) router.back();
    else setStep((s) => Math.max(s - 1, 1) as SignupStep);
  };

  const toggleTimeSlot = (day: string, slot: string) => {
    const mapping: Record<string, keyof BusinessHours> = {
      'M': 'mon',
      'T': 'tue',
      'W': 'wed',
      'Th': 'thu',
      'F': 'fri',
      'S': 'sat',
      'Su': 'sun'
    };
    const key = mapping[day];
    if (!key) return;

    setBusinessHours(prev => {
      const currentSlots = prev[key] || [];
      const newSlots = currentSlots.includes(slot)
        ? currentSlots.filter(s => s !== slot)
        : [...currentSlots, slot];
      return { ...prev, [key]: newSlots };
    });
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

  const submitSignup = async () => {
    if (!validateStep()) return;

    setLoading(true);
    setError(null);
    try {
      const payload: RegisterRequest = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: "farmer",
        business_name: formData.businessName,
        informal_name: formData.informalName,
        address: formData.streetAddress,
        city: formData.city,
        state: formData.state,
        zip_code: parseInt(formData.zip, 10),
        registration_proof: attachedFile?.name || "my_proof.pdf",
        business_hours: businessHours,
        device_token: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx",
        type: "email",
        social_id: "0imfnc8mVLWwsAawjYr4Rx-Af50DDqtlx" // Matching the example
      };

      console.log('Submitting signup with payload:', JSON.stringify(payload, null, 2));

      const response = await api.user.signup(payload);
      if (String(response.success) === "true") {
        setStep(5);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    formData,
    updateFormData,
    nextStep,
    prevStep,
    businessHours,
    activeDay,
    setActiveDay,
    toggleTimeSlot,
    attachedFile,
    handleDocumentPick,
    removeFile,
    submitSignup,
    loading,
    error,
    router,
  };
};
