import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./routes/MainNavigator";
import { ToastProvider } from "react-native-toast-notifications";
import { SafeAreaProvider } from "react-native-safe-area-context";
import configureStore from "./context/ReduxStore";
import { Provider } from "react-redux";

const store = configureStore();

export default function App() {
  return (
    <Provider store={store}>
      <ToastProvider>
        <SafeAreaProvider>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaProvider>
      </ToastProvider>
    </Provider>
  );
}
