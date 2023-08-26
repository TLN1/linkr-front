import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import Login from "../screens/Login";
import { Image } from "react-native";
import AuthProvider, { getAuthToken } from "../context/Auth";
import Register from "../screens/Register";
import CreateCompany from "../screens/CreateCompany";
import CompanyView from "../screens/CompanyView";

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
        {token != null ? (
          <>
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerTitle: () => <LogoTitle /> }}
            />
            <Stack.Screen name="CreateCompany" component={CreateCompany} />
            <Stack.Screen name="UpdateCompany">
              {(props) => <CreateCompany {...props} id={16} />}
            </Stack.Screen>
            <Stack.Screen name="CompanyView">
              {(props) => <CompanyView {...props} id={16} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="CreateCompany" component={CreateCompany} />
            <Stack.Screen name="UpdateCompany">
              {(props) => <CreateCompany {...props} id={16} />}
            </Stack.Screen>
            <Stack.Screen name="CompanyView">
              {(props) => <CompanyView {...props} id={16} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </AuthProvider>
  );
};

export default MyStack;
