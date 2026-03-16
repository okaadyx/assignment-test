import { Ionicons } from '@expo/vector-icons';

export type SignupStep = 1 | 2 | 3 | 4 | 5;

export interface SignupFormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  rePassword: string;
  businessName: string;
  informalName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export interface AttachedFile {
  name: string;
  uri: string;
}

export interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
}

export interface Step4Props extends StepProps {
  selectedDays: string[];
  toggleDay: (day: string) => void;
  selectedHours: string;
  setSelectedHours: (hours: string) => void;
}

export interface Step3Props extends StepProps {
  handleDocumentPick: () => void;
  attachedFile: AttachedFile | null;
  removeFile: () => void;
}
