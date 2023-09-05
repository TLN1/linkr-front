import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ChatsListView from "../screens/ChatsListView";
import MessagesView from "../screens/MessageView";

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {

  const username = useSelector((state) => state.auth.username);
  console.log("CHAT NAVIGATOR " + username);
  

  return (
    username && <Stack.Navigator>
      <Stack.Screen
        name="My Chats"
        component={ChatsListView}
        initialParams={{username: username}}
      />
      <Stack.Screen
        name="Chat"
        component={MessagesView}
      />
    </Stack.Navigator>
    );
    
}