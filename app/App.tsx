import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./routes/MainNavigator";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <ToastProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </ToastProvider>
  );
}
