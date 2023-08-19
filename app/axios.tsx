import axios, { AxiosResponse } from "axios";
import { getAuthToken, logout } from "./context/Auth";
import { BASE_URL, AUTH_HEADER } from "./Constants";

const axiosInstanse = axios.create({ baseURL: BASE_URL });

export const setAuthHeader = () => {
  axiosInstanse.defaults.headers.common[AUTH_HEADER] =
    `Bearer ` + getAuthToken();
};

export const deleteAuthHeader = () => {
  delete axiosInstanse.defaults.headers.common[AUTH_HEADER];
};

const responseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

// TODO: UPDATE AFTER DECIDING ON ERROR HANDLING
const responseErrorInterceptor = async (error: any) => {
  console.log(error);

  if (error.response !== undefined) {
    if (error.response.status === 401) {
      deleteAuthHeader();
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
