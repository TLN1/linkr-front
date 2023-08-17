import axios, { AxiosResponse } from "axios";
import { logout } from "./context/Auth";
import { BASE_URL, AUTH_HEADER } from "./Constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const axiosInstanse = axios.create({ baseURL: BASE_URL });

axiosInstanse.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const accessToken = JSON.parse(token).access_token;
      config.headers.Authorization = "Bearer " + accessToken;
    } 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

// TODO: UPDATE AFTER DECIDING ON ERROR HANDLING
const responseErrorInterceptor = async (error: any) => {
  console.log(error);

  if (error.response !== undefined) {
    if (error.response.status === 401) {
      // deleteAuthHeader();
      logout();
    }
  }

  return Promise.reject(error.response?.data);
};

axiosInstanse.interceptors.response.use(
  responseSuccessInterceptor,
  responseErrorInterceptor
);

export const { get, post, put, delete: del } = axiosInstanse;

export default axiosInstanse;
