
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

export interface BusinessHours {
  mon?: string[];
  tue?: string[];
  wed?: string[];
  thu?: string[];
  fri?: string[];
  sat?: string[];
  sun?: string[];
}

export interface RegisterRequest {
  full_name: string;
  email: string;
  phone: string;
  password?: string;
  role: string;
  business_name: string;
  informal_name: string;
  address: string;
  city: string;
  state: string;
  zip_code: number;
  registration_proof: string;
  business_hours: BusinessHours;
  device_token: string;
  type: string;
  social_id?: string;
}

export interface RegisterResponse {
  success: string;
  message: string;
  token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: string;
  device_token: string;
  type: string;
  social_id?: string;
}

export interface LoginResponse {
  success: string;
  message: string;
  token?: string;
}

export interface VerifyOtpRequest {
  otp: string;
}

export interface VerifyOtpResponse {
  success: string;
  message: string;
  token?: string;
}

export interface ResetPasswordRequest {
  token: string;
  password: string;
  cpassword: string;
}

export interface ResetPasswordResponse {
  success: string;
  message: string;
  is_verified?: string;
}

export interface ForgotPasswordRequest {
  phone: string;
}

export interface StepProps {
  formData: SignupFormData;
  updateFormData: (data: Partial<SignupFormData>) => void;
  nextStep: () => void;
  prevStep: () => void;
  loading?: boolean;
  error?: string | null;
}

export interface Step4Props extends StepProps {
  businessHours: BusinessHours;
  activeDay: string;
  setActiveDay: (day: string) => void;
  toggleTimeSlot: (day: string, slot: string) => void;
}

export interface Step3Props extends StepProps {
  handleDocumentPick: () => void;
  attachedFile: AttachedFile | null;
  removeFile: () => void;
}
