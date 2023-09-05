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
  const [me, setMe] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function getSocket() {
      const userInfo = await AsyncStorage.getItem("username");
      console.log(userinfo);

      setMe(userInfo);
      setRecipient(route?.data?.recipient);
      console.log(recipient);
      if (me) {
        await get(`/chat/${recipient}`).then((response) => {
          console.log(response.data.message_list);
          const messageList = response.data.message_list;
          setMessages([]);
          messageList.map((message: any) => (
            setMessages((prevMessages: any) => [...prevMessages, {
              user: message.sender_username,
              time: message.time,
              text: message.text
            }])
          ));
        });

        console.log(me);
        const websocketUrl = `ws://127.0.0.1:8000/register/ws/${me}`;
        wsRef.current = WebSocketSingleton.getWebSocket(me, websocketUrl);

        wsRef.current.onmessage = (e) => {
          setMessages((prevMessages) => [...prevMessages, JSON.parse(e.data)]);
          console.log(messages);
        };
      }

    }
    
    getSocket();
  }, [message]);


  const sendMessage = () => {
    console.log("send");
    console.log(recipient);
    if (wsRef.current !== null) wsRef.current.send(JSON.stringify({ "user": recipient, "time": "12:00", "text": message }));
    // setMessage("");
  };


  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        username={recipient}
      />
      <Messages
        me={me}
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
