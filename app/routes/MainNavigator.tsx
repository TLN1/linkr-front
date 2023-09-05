import HomeNavigator from "../screens/Home";
import AuthProvider from "../context/Auth";
import AccountNavigator from "./AccountNavigator";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import { Color } from "../Constants";
import UserProfile from "../screens/UserProfile";
import React from "react";
import { useSelector } from "react-redux";
import CompanyNavigator from "./CompanyNavigator";
import MessagesView from "../screens/MessageView";
import ChatListView from "../screens/ChatsListView"
import ConversationsScreen from "../screens/ChatsListView";
import ChatNavigator from "./ChatNavigator";

const Tab = createMaterialBottomTabNavigator();

function MainNavigator() {

  const username = useSelector((state) => state.auth.username);

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
        {username ? (
          <Tab.Screen
            name="User Profile"
            options={{ tabBarIcon: "account", tabBarLabel: "Profile" }}
            component={UserProfile}
            initialParams={{ username: username }}
          />
        ) : (
          <Tab.Screen
            name="AccountNavigator"
            options={{ tabBarIcon: "account", tabBarLabel: "Account" }}
            component={AccountNavigator}
          />
        )}
        <Tab.Screen
          name="CompanyNavigator"
          options={{
            tabBarIcon: "office-building",
            tabBarLabel: "My companies",
          }}
          component={CompanyNavigator}
        />
        <Tab.Screen
          name="ChatNavigator"
          options={{
            tabBarIcon: "",
            tabBarLabel: "My Chats",
          }}
          component={ChatNavigator}
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

export default MainNavigator;
