import React, { useState, useRef, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { get, post, put } from "../../axios";

export interface MessageItem {
  sender: string;
  recipient: string;
  time: string;
  text: string;
}

interface ChatMessagesProps {
  me: string;
  messageList: MessageItem[];
}

const Messages = ({ me, messageList }: ChatMessagesProps) => {

  const scrollView = useRef<ScrollView | null>(null);
  console.log(me);
  
  return (
    <ScrollView
      style={{ backgroundColor: "white", flex: 1 }}
      ref={(ref) => (scrollView.current = ref)}
    >
      {messageList.map((message: MessageItem, index: number) => (

        //message component
        <View key={index} style={[message.sender !== me ? styles.messageContainer : styles.messageContainerMe]}>
          <View style={styles.messageView}>
            <Text style={[message.sender !== me ? styles.message : styles.messageMe]}>
              {message.text}
            </Text>
          </View>
          <View style={styles.timeView}>
            <Text style={[message.sender !== me ? styles.time : styles.timeMe]}>
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
    paddingTop: 10,
    paddingBottom: 24,
  },
  messageContainer: {
    alignSelf: "flex-start",
    backgroundColor: "#f0f0f0",
    borderTopLeftRadius: 0,
    flexDirection: "row",
    maxWidth: "80%",
    paddingHorizontal: 12,
    marginHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 24,
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