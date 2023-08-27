import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./routes/MainNavigator";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  return (
    <RootSiblingParent>
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </RootSiblingParent>
  );
}
