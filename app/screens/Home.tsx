import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwipeView from "./SwipeView";

const Stack = createNativeStackNavigator();

function Home() {
  return <SwipeView />;
}

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
