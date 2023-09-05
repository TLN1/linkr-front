import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./routes/MainNavigator";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <ToastProvider>
      <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
      </SafeAreaProvider>
    </ToastProvider>
  );
}
