import React, { useState, useEffect, useRef } from "react";
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
  route: any,
  navigation: NativeStackNavigationProp<any, "Chat">;
}

const MessagesView = ({ route, navigation }: MessagesViewProps) => {
  // const [me, setMe] = useState<string>("");
  // const [recipient, setRecipient] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function getSocket() {
      console.log("MESSAGE VIEW USERNAME ME");

      console.log("MESSAGE VIEW USERNAME RECIPIENT");
      console.log(route?.params?.recipient);
      if (route?.params?.username) {
        await get(`/chat/${route?.params?.recipient}`).then((response) => {
          const messageList = response.data.message_list;
          setMessages([]);
          messageList.map((message: any) => (
            setMessages((prevMessages: any) => [...prevMessages, {
              recipient: message.recipient_username,
              sender: message.sender_username,
              time: message.time,
              text: message.text
            }])
          ));
        });

        const websocketUrl = `ws://127.0.0.1:8000/register/ws/${route?.params?.username}`;
        wsRef.current = WebSocketSingleton.getWebSocket(route?.params?.username, websocketUrl);

        wsRef.current.onmessage = (e) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(e.data)]);
        };
      }

    }
    
    getSocket();
  }, [message]);


  const sendMessage = (messageText: string) => {
    console.log("send message :" + messageText);
    console.log(route?.params?.recipient);
    if (wsRef.current !== null) {
      console.log("before eocket send:" + messageText);
      wsRef.current.send(JSON.stringify({ "user": route?.params?.recipient, "time": "12:00", "text": messageText }));
    }
    // setMessage("");
  };


  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        username={route?.params?.recipient}
      />
      <Messages
        me={route?.params?.username}
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
