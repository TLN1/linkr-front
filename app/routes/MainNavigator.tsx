import HomeNavigator from "../screens/Home";
import AuthProvider from "../context/Auth";
import AccountNavigator from "./AccountNavigator";
import { getAuthToken } from "../context/Auth";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import { Color } from "../Constants";
import UserProfile from "../screens/UserProfile";
import React from "react";

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
          name="HomeNavigator"
          options={{ tabBarIcon: "home", tabBarLabel: "Home" }}
          component={HomeNavigator}
        />
        <Tab.Screen
          name="AccountNavigator"
          options={{ tabBarIcon: "account", tabBarLabel: "Account" }}
          component={AccountNavigator}
        />
        <Tab.Screen
          name="User Profile"
          options={{ tabBarIcon: "account", tabBarLabel: "Profile" }}
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
