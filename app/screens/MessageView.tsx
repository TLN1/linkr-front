import React, { useState, useEffect } from "react";
import { View } from "react-native";

import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import Messages from "../components/chat/Messages";
import { MessageItem } from "../components/chat/Messages";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebSocketSingleton from "../WebSocketSingleton";


interface MessagesViewProps {
  navigation: NativeStackNavigationProp<any, "Chat">;
}

const MessagesView = ({ navigation }: MessagesViewProps) => {
  const [me, setMe] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [websocket, setWebsocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function getSocket() {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const userInfoParsed = JSON.parse(userInfo);
      setMe(userInfoParsed.username);
      if(userInfoParsed.username === "tamo"){
        setUsername("nini");
      } else if (userInfoParsed.username === "nini"){
        setUsername("tamo");
      }
      const websocketUrl = `ws://127.0.0.1:8000/register/ws/${userInfoParsed.username}`;
      const ws = WebSocketSingleton.getWebSocket(userInfoParsed.username, websocketUrl);
      setWebsocket(ws);
      ws.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        setMessages([...messages, message]);
        console.log(messages);
      });
    }
    getSocket();
  }, [message, messages]);


  const sendMessage = () => {
    
    websocket.send(JSON.stringify({"user": username, "time": "12:00", "text": message }));
    // websocket.onmessage = (e) => { const message = JSON.parse(e.data); setMessages([...messages, message]);
  };


  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        username={username}
      />
      <Messages 
        me={me}
        username={username}
        messageList={messages}
      />
      <ChatInput
        me={me}
        username={username}
        websocket={websocket}
        setMessageText={setMessage}
        setWebsocket={setWebsocket}
        sendMessage={sendMessage}
      />
    </View>
  );
};

export default MessagesView;
