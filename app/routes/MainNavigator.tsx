import HomeNavigator from "../screens/Home";
import AuthProvider from "../context/Auth";
import AccountNavigator from "./AccountNavigator";
import { getAuthToken } from "../context/Auth";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { StyleSheet } from "react-native";
import { Color } from "../Constants";
import UserProfile from "../screens/UserProfile";
import React from "react";
import MessagesView from "../screens/MessageView";
import ChatListView from "../screens/ChatsListView"
import ConversationsScreen from "../screens/ChatsListView";

const Tab = createMaterialBottomTabNavigator();


const dummyChats = [
  {
    chat_id: 1,
    username1: "Alice",
    username2: "Levan",
    message_list: [
      { user: "Alice", time: "10:00 AM", text: "Hi, Levan!" },
      { user: "Bob", time: "10:05 AM", text: "Hello, Alice!" },
    ],
  },
  {
    chat_id: 2,
    username1: "Eve",
    username2: "Nini",
    message_list: [
      { user: "Eve", time: "11:30 AM", text: "Hey, Nini!" },
      { user: "Charlie", time: "11:35 AM", text: "Hi, Eve!" },
    ],
  },
];

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
        <Tab.Screen name="Chat" component={MessagesView} />
        <Tab.Screen
          name="ChatList"
          component={ChatListView}
          initialParams={{ chats: dummyChats }} 
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
