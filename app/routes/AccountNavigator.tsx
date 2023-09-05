import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Login, Register } from "../screens/Login";
import React, { useEffect, useState } from "react";
import UserProfile from "../screens/UserProfile";

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="User Profile" component={UserProfile} />
    </Stack.Navigator>
  );
}
