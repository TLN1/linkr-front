import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import { BASE_URL } from "../Constants";
import { post } from "../axios";

export const AuthContext = createContext<AuthContextType>({
  isLoading: false,
  register: (username, password) => {},
  login: (username, password) => {},
  logout: () => {},
});

export interface AuthContextType {
  isLoading: boolean;
  register: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
  logout: () => void;
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
    console.log(token);
    if (token != null) setToken(JSON.parse(token).access_token);
  });
  return token;
};

function logout() {
  AsyncStorage.removeItem("authToken");
  AsyncStorage.removeItem("userInfo");
}

const AuthProvider = ({ children }: any) => {
  const [userInfo, setUserInfo] = useState({} as Account);
  const [authToken, setAuthToken] = useState<AuthToken>({} as AuthToken);
  const [isLoading, setIsLoading] = useState(false);

  const register = (username: string, password: string) => {
    setIsLoading(true);

    post(
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
      .then((res) => {
        let userInfo = res.data;
        setUserInfo(userInfo);
        AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));

        login(username, password);
        setIsLoading(false);
        console.log(userInfo);
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false));
  };

  const login = (username: string, password: string) => {
    setIsLoading(true);

    post(
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
      })
      .catch((e) => {})
      .finally(() => setIsLoading(false));
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
