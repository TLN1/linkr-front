import React, { useState, useEffect } from "react";
import { View } from "react-native";

import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import Messages from "../components/chat/Messages";
import { MessageItem } from "../components/chat/Messages";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WebSocketSingleton from "../WebSocketSingleton";
import { get, post, put } from "../axios";


interface MessagesViewProps {
  navigation: NativeStackNavigationProp<any, "Chat">;
}

const MessagesView = ({ navigation }: MessagesViewProps) => {
  const [me, setMe] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  // const [websocket, setWebsocket] = useState<WebSocket>();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function getSocket() {
      const userInfo = await AsyncStorage.getItem("userInfo");
      const userInfoParsed = JSON.parse(userInfo);
      console.log(userInfoParsed);

      setMe(userInfoParsed.username);

      if (userInfoParsed.username === "tamo") {
        setUsername("nini");
      } else if (userInfoParsed.username === "nini") {
        setUsername("tamo");
      }
      await get(`/chat/${username}`).then((response) => {
        console.log(response.data.message_list);
        const messageList = response.data.message_list;
        setMessages([]);
        messageList.map((message: any) => (
          setMessages((prevMessages) => [...prevMessages, {
            user: message.sender_username,
            time: message.time,
            text: message.text
          }])
        ));
      });

      const websocketUrl = `ws://127.0.0.1:8000/register/ws/${userInfoParsed.username}`;
      const ws = WebSocketSingleton.getWebSocket(userInfoParsed.username, websocketUrl);

      // setWebsocket(ws);

      ws.onmessage = (e) => {
        setMessages((prevMessages) => [...prevMessages, JSON.parse(e.data)]);
        console.log(messages);
      };

    }

    getSocket();
  }, [message]);

  const websocketUrl = `ws://127.0.0.1:8000/register/ws/${me}`;
  const ws = WebSocketSingleton.getWebSocket(me, websocketUrl);
  
  const sendMessage = () => {
    console.log("send");

    ws.send(JSON.stringify({ "user": username, "time": "12:00", "text": message }));
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
        setMessageText={setMessage}
        sendMessage={sendMessage}
      />
    </View>
  );
};

export default MessagesView;
