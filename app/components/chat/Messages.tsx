import React, { useState, useRef, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { get, post, put } from "../../axios";

export interface MessageItem {
  user: string,
  time: string;
  text: string;
}

interface ChatMessagesProps {
  me: string,
  messageList: MessageItem[];
}

const Messages: React.FC<ChatMessagesProps> = ({ me, messageList }) => {

  const [user, setUSer] = useState<String>(me);
  const scrollView = useRef<ScrollView | null>(null);

  useEffect(() => {
    setUSer(me);
    console.log(messageList);
  }, [messageList])

  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
    >
      {messageList.map((message: any, index: number) => (

        //message component
        <View key={index} style={[message.user !== user ? styles.messageContainer : styles.messageContainerMe]}>
          <View style={styles.messageView}>
            <Text style={[message.user !== user ? styles.message : styles.messageMe]}>
              {message.text}
            </Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[message.user !== user ? styles.time : styles.timeMe]}>
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