import React from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { BASE_URL } from "../Constants";
import { post } from "../axios";
import { useDispatch } from "react-redux";
import {
  clearUserInfo,
  setUserToken,
  setUsername,
} from "../actions/AuthActions";

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  register: async (username, password) => {},
  login: async (username, password) => {},
  logout: async () => {},
});

export interface AuthContextType {
  isLoading: boolean;
  register: (username: string, password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface AuthToken {
  access_token: string;
  token_type: string;
}

export interface Account {
  id: number;
  username: string;
  password: string;
  companies: number[];
}

export const getAuthToken = () => {
  const [token, setToken] = useState(null);
  AsyncStorage.getItem("authToken").then((token) => {
    if (token != null) setToken(JSON.parse(token).access_token);
  });
  return token;
};

const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState({} as Account);
  const [authToken, setAuthToken] = useState<AuthToken>({} as AuthToken);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const register = async (username: string, password: string) => {
    setIsLoading(true);

    await post(
      `${BASE_URL}/register`,
      axios.toFormData({
        username: username,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then(async (res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        await login(username, password);
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false));
  };

  const login = async (username: string, password: string) => {
    setIsLoading(true);

    await post(
      `${BASE_URL}/token`,
      axios.toFormData({
        username: username,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    )
      .then((res) => {
        let authToken = res.data;
        setAuthToken(authToken);

        AsyncStorage.setItem("authToken", JSON.stringify(authToken));
        console.log(authToken);

        AsyncStorage.setItem("username", username);
        console.log(username);

        dispatch(setUserToken(JSON.stringify(authToken)));
        dispatch(setUsername(username));
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false));
  };

  const logout = async () => {
    await AsyncStorage.removeItem("authToken");
    await AsyncStorage.removeItem("userInfo");
    await AsyncStorage.removeItem("username");
    dispatch(clearUserInfo());
  };  

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        register,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
