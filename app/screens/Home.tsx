import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SwipeView from "./SwipeView";

const Stack = createNativeStackNavigator();

function Home() {
  return <SwipeView mode="profile" application_id={1} />;
}

export default function HomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
