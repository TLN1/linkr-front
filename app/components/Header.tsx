import { useNavigation, useNavigationState } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, Text, StyleSheet, Pressable } from "react-native";
import { Color } from "../Constants";

export const AccountHeader = () => {
  return (
    <Pressable style={styles.accountContainer}>
      <Image style={styles.avatar} source={require("../assets/favicon.png")} />
      <Text style={styles.username}>Username</Text>
    </Pressable>
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
  homeButtonContainer: {
    alignItems: "center",
    padding: 5,
  },
  accountContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    alignItems: "center",
    marginEnd: 10,
    backgroundColor: Color.BLACK,
    borderRadius: 10,
    padding: 8,
  },
  avatar: {
    width: 30,
    height: 30,
  },
  username: {
    marginStart: 5,
    color: Color.WHITE,
    fontWeight: "bold",
  },
});
