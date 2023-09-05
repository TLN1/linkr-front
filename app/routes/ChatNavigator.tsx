import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { useEffect } from "react";
import ChatsListView from "../screens/ChatsListView";
import MessagesView from "../screens/MessageView";

const Stack = createNativeStackNavigator();

export default function ChatNavigator() {

  const [username, setUsername] = useState();

  useEffect(() => {

    async function updateUserInfo() {
      const userInfo = await AsyncStorage.getItem("username");
      console.log(userInfo);
      setUsername(userInfo);
    }

    updateUserInfo();

  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="My Chats"
        component={ChatsListView}
      />
      <Stack.Screen
        name="Chat"
        component={MessagesView}
      />
    </Stack.Navigator>
  );
}