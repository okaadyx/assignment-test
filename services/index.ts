import axios, { AxiosInstance } from "axios";
import { UserApi } from "./user";
class Api {
  axiosClient: AxiosInstance;
  user: UserApi;
  constructor() {
    this.axiosClient = axios.create({
      baseURL: "https://sowlab.com/assignment/",
    });
    this.user = new UserApi(this.axiosClient);
  }
}

export const api = new Api();
