import React from "react";
import { View, Text, Button } from "react-native";
import { global } from "../styles/global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { logout } from "../context/Auth";

interface Props {
  navigation: NativeStackNavigationProp<any, "About">;
}

const Home = ({ navigation }: Props) => {
  const pressHandler = () => {
    navigation.push("About");
  };

  const pressLoginHandler = () => {
    navigation.push("Login");
  };

  return (
    <View style={global.container}>
      <Text>Home</Text>
      <Button title="About" onPress={pressHandler} />
      <Button title="Login" onPress={pressLoginHandler} />
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Home;
