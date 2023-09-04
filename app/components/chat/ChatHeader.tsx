// import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ChatHeaderProps {
  username: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  username,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileView}>
        <TouchableOpacity style={styles.profileButton}>
            <Text style={styles.usernameLabel}>{username}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "black",
    paddingTop: 35,
    paddingBottom: 15,
  },
  profileView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    flex: 4,
  },
  usernameLabel: {
    color: "white",
    fontSize: 17,
  },
});

export default ChatHeader;
