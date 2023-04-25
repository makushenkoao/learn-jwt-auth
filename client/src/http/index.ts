import axios from "axios";
import { IAuthResponse } from "../models/IAuthResponse";

export const BASE_URL = "http://localhost:8080/api";

export const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (e) => {
    const originalRequest = e.config;
    if (e.response.status === 401 && e.config && !e.config._isRetry) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<IAuthResponse>(`${BASE_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("Пользователь не авторизован");
      }
    }
    throw e;
  }
);
