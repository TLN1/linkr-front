import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, StyleSheet, Pressable, View } from "react-native";
import { Color } from "../Constants";

export const AccountHeader = () => {
  return (
    <View style={styles.accountHeaderContainer}>
      <Pressable>
        <Image
          style={styles.avatar}
          source={require("../assets/favicon.png")}
        />
      </Pressable>
      <Pressable style={styles.accountContainer}>
        <Image
          style={styles.avatar}
          source={require("../assets/favicon.png")}
        />
        <Text style={styles.username}>Username</Text>
      </Pressable>
    </View>
  );
};

type Props = {
  navigation: NativeStackNavigationProp<any, any>;
};

export const HomeButtonHeader = ({ navigation }: Props) => {
  return (
    <Pressable
      style={styles.homeButtonContainer}
      onPress={() => navigation.navigate("Home")}
    >
      <Image
        style={{ width: 50, height: 50 }}
        source={require("../assets/favicon.png")}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  accountHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginEnd: 10,
  },
  homeButtonContainer: {
    alignItems: "center",
    padding: 5,
  },
  accountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.BLACK,
    borderRadius: 10,
    padding: 8,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  username: {
    color: Color.BLACK,
    fontWeight: "bold",
  },
});
