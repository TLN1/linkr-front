import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { AccountHeader, HomeButtonHeader } from "../components/Header";
import Login from "../screens/Login";
import { Image } from "react-native";
import { AuthProvider, getAuthToken } from "../context/Auth";
import Register from "../screens/Register";
import { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  let token = getAuthToken();
  console.log(token);
  return (
    <AuthProvider>
      <Stack.Navigator>
        {token ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerTitle: () => <LogoTitle /> }}
          />
        ) : (
          <>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default MyStack;

const homeScreenOptions: NativeStackNavigationOptions = {
  headerRight: () => <AccountHeader />,
  headerTitleAlign: "center",
};

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

function screenOptions({ navigation }: Props) {
  return {
    ...homeScreenOptions,
    headerTitle: () => <HomeButtonHeader navigation={navigation} />,
  };
}
