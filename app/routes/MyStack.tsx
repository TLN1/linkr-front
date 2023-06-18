import {
  NativeStackNavigationOptions,
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import Home from "../screens/Home";
import About from "../screens/About";
import { AccountHeader, HomeButtonHeader } from "../components/Header";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={homeScreenOptions} />
      <Stack.Screen name="About" component={About} options={screenOptions} />
    </Stack.Navigator>
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
