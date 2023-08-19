import Home from "../screens/Home";
import About from "../screens/About";
import { AuthProvider, getAuthToken } from "../context/Auth";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountNavigator from "./AccountNavigator";

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {
  let token = getAuthToken();
  console.log(token);
  return (
    <AuthProvider>
      <Tab.Navigator>
        {token !== null ? (
          <Tab.Screen name="Home" component={Home} />
        ) : (
          <>
            <Tab.Screen name="About" component={About} />
            <Tab.Screen name="Account" component={AccountNavigator} />
          </>
        )}
      </Tab.Navigator>
    </AuthProvider>
  );
}
