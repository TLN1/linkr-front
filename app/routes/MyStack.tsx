import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import Login from "../screens/Login";
import { Image } from "react-native";
import {
  AuthProvider,
  getAuthToken,
} from "../context/Auth";
import Register from "../screens/Register";
import UserProfile from '../screens/UserProfile';
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const LogoTitle = () => {
  return (
    <Image
      style={{ width: 50, height: 50 }}
      source={require("../assets/favicon.png")}
    />
  );
};

const MyStack = () => {
  let token = getAuthToken();
  console.log(token);
  return (
    <AuthProvider>
      <Stack.Navigator>
        {token ? (
          <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
          <Stack.Screen
            name="UserProfile"
            component={UserProfile}
            options={{ title: "User Profile" }}
          />
          <Stack.Screen name="UserProfile" component={UserProfile} />
        </>
          
        ) : (
          <>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="UserProfile" component={UserProfile} />
          </>
        )}
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default MyStack;
