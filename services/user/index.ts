import { AxiosInstance } from "axios";
import * as SecureStore from "expo-secure-store";
import { RegisterRequest, RegisterResponse } from "../../types/SignupTypes";

export class UserApi {
  client: AxiosInstance;
  constructor(client: AxiosInstance) {
    this.client = client;
  }
  async signup(data: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await this.client.post<RegisterResponse>("/user/register", data);
      const result = response.data;
      
      if (result.success === "true" && result.token) {
        await SecureStore.setItemAsync("token", result.token);
      }
      return result;
    } catch (error: any) {
      return {
        success: "false",
        message: error.response?.data?.message || "Server error while registering.",
      };
    }
  }
}
