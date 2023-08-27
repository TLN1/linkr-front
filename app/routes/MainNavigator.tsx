import React from "react";
import Home from "../screens/Home";
import { getAuthToken } from "../context/Auth";
import AuthProvider from "../context/Auth";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AccountNavigator from "./AccountNavigator";

import { StyleSheet } from "react-native";
import { Color } from "../Constants";
import UserProfile from "../screens/UserProfile";

const Tab = createMaterialBottomTabNavigator();

export default function MainNavigator() {
  let token = getAuthToken();
  console.log(token);
  return (
    <AuthProvider>
      <Tab.Navigator
        activeColor={Color.WHITE}
        inactiveColor={Color.GRAY}
        barStyle={styles.barStyle}
      >
        <Tab.Screen
          name="Home"
          options={{ tabBarIcon: "home" }}
          component={Home}
        />
        <Tab.Screen
          name="Account"
          options={{ tabBarIcon: "account" }}
          component={AccountNavigator}
        />
        <Tab.Screen
          name="User Profile"
          options={{ tabBarIcon: "User Profile" }}
          component={UserProfile}
        />
      </Tab.Navigator>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  barStyle: {
    backgroundColor: Color.BLACK,
  },
});
