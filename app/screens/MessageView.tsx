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
  navigation: NativeStackNavigationProp<any, "Chat">;
}

const MessagesView = ({ navigation }: MessagesViewProps) => {
  const [me, setMe] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [message, setMessage] = useState<string>("");
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function getSocket() {
      AsyncStorage.getItem("userInfo").then((userInfo) => {
        const userInfoParsed = JSON.parse(userInfo);
        console.log(userInfoParsed);

        setMe(userInfoParsed.username);

        if (userInfoParsed.username === "tamo") {
          setUsername("nini");
        } else if (userInfoParsed.username === "nini") {
          setUsername("tamo");
        }
        console.log(username);
      });

      if (me) {
        await get(`/chat/${username}`).then((response) => {
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
    console.log(username);
    if (wsRef.current !== null) wsRef.current.send(JSON.stringify({ "user": username, "time": "12:00", "text": message }));
  };


  return (
    <View style={{ flex: 1 }}>
      <ChatHeader
        username={username}
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
