import React, { useState } from "react";
import { View } from "react-native";

import ChatHeader from "../components/chat/ChatHeader";
import Messages from "../components/chat/Messages";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MessagesViewProps {
  navigation: NativeStackNavigationProp<any, "Chat">; 
}

const MessagesView = ({ navigation } : MessagesViewProps) => {
  const [username, setUsername] = useState<string>("username");

  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        username={username}
      />
      <Messages />
    </View>
  );
};

export default MessagesView;
