import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./routes/MainNavigator";
import {
  SafeAreaProvider,
} from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
