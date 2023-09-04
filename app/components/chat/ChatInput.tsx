import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";

interface ChatInputProps {
  // websocket: WebSocket;
  // setWebsocket: any;
  setMessageText: any;
  sendMessage: any;
}

const ChatInput: React.FC<ChatInputProps> = ({
  setMessageText,
  sendMessage
}) => {

  const [message, setMessage] = useState<string>();

  useEffect(() => {
  }, []);

  
  return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            multiline
            placeholder={"..........."}
            style={styles.input}
            value={message}
            onChangeText={(text) => {
              setMessage(text);
            }}
          />
        </View>
        <TouchableOpacity 
        style={styles.sendButton} 
        onPress={() => {
          setMessageText(message);
          sendMessage();
          setMessage("");
        }
        }
        >
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    marginHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  inputView: {
    flexDirection: "row",
    backgroundColor: "white",
    flex: 3,
    marginRight: 10,
    paddingVertical: 10,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: "grey",
    flex: 3,
    fontSize: 15,
    height: 50,
    alignSelf: "center",
  },
  sendButton: {
    backgroundColor: "black",
    borderRadius: 50,
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ChatInput;
