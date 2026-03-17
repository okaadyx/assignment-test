import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import {
  ForgotPasswordRequest,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../../types/UserTypes";

export class UserApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async signup(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await this.client.post<RegisterResponse>(
        "/user/register",
        data,
      );
      const result = response.data;
      return result;
    } catch (error: any) {
      return {
        success: "false",
        message:
          error.response?.data?.message || "Server error while registering.",
      };
    }
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.client.post<LoginResponse>(
        "/user/login",
        data,
      );
      const result = response.data;

      if (result.token) {
        await SecureStore.setItemAsync("token", result.token);
      }
      return result;
    } catch (error: any) {
      return {
        success: "false",
        message:
          error.response?.data?.message || "Server error while logging in.",
      };
    }
  }

  async verifyOtp(data: VerifyOtpRequest): Promise<VerifyOtpResponse> {
    try {
      const response = await this.client.post<VerifyOtpResponse>(
        "/user/verify-otp",
        data,
      );
      return response.data;
    } catch (error: any) {
      return {
        success: "false",
        message:
          error.response?.data?.message ||
          "Unable to verify OTP, please try again.",
      };
    }
  }

  async resetPassword(
    data: ResetPasswordRequest,
  ): Promise<ResetPasswordResponse> {
    try {
      const response = await this.client.post<ResetPasswordResponse>(
        "/user/reset-password",
        data,
      );
      return response.data;
    } catch (error: any) {
      return {
        success: "false",
        message:
          error.response?.data?.message ||
          "Your password reset request failed, please try again.",
      };
    }
  }

  async forgotPassword(data: ForgotPasswordRequest): Promise<RegisterResponse> {
    try {
      const response = await this.client.post<RegisterResponse>(
        "/user/forgot-password",
        data,
      );
      return response.data;
    } catch (error: any) {
      return {
        success: "false",
        message: error.response?.data?.message || "Failed to send reset code.",
      };
    }
  }
  async logout(): Promise<void> {
    try {
      await SecureStore.deleteItemAsync("token");
    } catch (error: any) {
      console.error("Error during logout:", error);
    }
  }
}
