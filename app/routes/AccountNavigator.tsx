import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register } from "../screens/Login";

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
