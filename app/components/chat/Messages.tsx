import React, { useState, useRef } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";

interface MessageItem {
  user: number;
  time: string;
  text: string;
}

const Messages: React.FC = () => {
  
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      user: 0,
      time: "17:00",
      text: "zd",
    },
    {
      user: 1,
      time: "18:05",
      text: "zd zd",
    },
  ]);

  const user = useRef(0);
  const scrollView = useRef<ScrollView | null>(null);

  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
    >
      {messages.map((message, index) => (

        //message component
        <View style={[message.user !== user.current ? styles.messageContainer : styles.messageContainerMe]}>
          <View style={styles.messageView}>
            <Text style={[message.user !== user.current ? styles.message : styles.messageMe]}>
              {message.text}
            </Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[message.user !== user.current ? styles.time : styles.timeMe]}>
              {message.time}
            </Text>
          </View>
        </View>
        
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainerMe: {
    backgroundColor: "black",
    maxWidth: "80%",
    alignSelf: "flex-end",
    flexDirection: "row",
    borderRadius: 15,
    paddingHorizontal: 12,
    marginHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 12,
  },
  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 0,
    flexDirection: "row",
    maxWidth: "80%",
    paddingHorizontal: 12,
    marginHorizontal: 12,
    paddingTop: 5,
    paddingBottom: 12,
  },
  messageView: {
    backgroundColor: "transparent",
    maxWidth: "80%",
  },
  timeView: {
    backgroundColor: "transparent",
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  messageMe: {
    color: "white",
    alignSelf: "flex-start",
    fontSize: 15,
  },
  message: {
    color: "#000",
    alignSelf: "flex-start",
    fontSize: 15,
  },
  timeMe: {
    color: "lightgray",
    alignSelf: "flex-end",
    fontSize: 10,
  },
  time: {
    color: "darkgray",
    alignSelf: "flex-end",
    fontSize: 10,
  },
});


export default Messages;