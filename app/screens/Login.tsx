import { useContext, useState } from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "../context/Auth";
import Spinner from "react-native-loading-spinner-overlay";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TlnButton from "../components/TlnButton";
// import WebSocketSingleton from "../WebSocketSingleton";
import { showErrorToast } from "../components/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";

interface NavigationProps {
  navigation: NativeStackNavigationProp<any, "Login">;
}

interface HelperProps extends NavigationProps {
  register: boolean;
}

export function Register({ navigation }: NavigationProps) {
  return <Helper navigation={navigation} register={true} />;
}

export function Login({ navigation }: NavigationProps) {
  return <Helper navigation={navigation} register={false} />;
}

function Helper({ navigation, register }: HelperProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const authContext = useContext(AuthContext);

  const label = register ? "Register" : "Login";
  const promptLabel = register ? "Login" : "Register";
  const prompt = register
    ? "Already have an account?"
    : "Don't have an account?";

  const promptOnPress = () => {
    if (register) {
      navigation.navigate("Login");
    } else {
      navigation.navigate("Register");
    }
  };

  const submitOnPress = async () => {
    if (!isUsernameValid || !isPasswordValid) {
      showErrorToast("Username or password is empty");
      return;
    }

    if (register) {
      await authContext.register(username, password);
    } else {
      await authContext.login(username, password);
    }

    setUsername("");
    setPassword("");

    // const loggedInUser = await AsyncStorage.getItem("username");
    // console.log(loggedInUser);

    // if (loggedInUser) {
    //   console.log(loggedInUser);
    //   // navigation.navigate("User Profile", { username: loggedInUser });
    // }

    // const websocketUrl = `ws://127.0.0.1:8000/register/ws/${username}`;
    // const ws = WebSocketSingleton.getWebSocket(username, websocketUrl);
    // ws.onopen = () => {
    //   console.log(`WebSocket connection opened for user ${username}`);
    // };
  }

  const onChangeInputText = (value: string, type: "username" | "password") => {
    const isValid = value !== "";

    if (type === "username") {
      setIsUsernameValid(isValid);
      setUsername(value);
    } else if (type === "password") {
      setIsPasswordValid(isValid);
      setPassword(value);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={authContext.isLoading} />
      <View style={styles.wrapper}>
        <Text style={styles.title}>{label}</Text>

        <TextInput
          style={[styles.input, !isUsernameValid ? { borderColor: "red" } : {}]}
          value={username}
          onChangeText={(text) => onChangeInputText(text, "username")}
          placeholder="Enter username"
        />

        <TextInput
          style={[styles.input, !isPasswordValid ? { borderColor: "red" } : {}]}
          value={password}
          onChangeText={(text) => onChangeInputText(text, "password")}
          placeholder="Enter password"
          secureTextEntry
        />

        <TlnButton
          style={styles.button}
          title={label}
          onPress={submitOnPress}
        />

        <View style={styles.registerPromptContainer}>
          <Text>{prompt}</Text>
          <Pressable onPress={promptOnPress}>
            <Text style={styles.link}>{promptLabel}</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
    display: "flex",
    rowGap: 9,
  },
  title: {
    marginBottom: 15,
    fontSize: 34,
    fontWeight: "bold",
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    marginTop: 5,
    fontSize: 20,
    paddingHorizontal: 14,
  },
  registerPromptContainer: {
    flexDirection: "row",
    columnGap: 3,
  },
  link: {
    color: "blue",
  },
  button: {
    marginTop: 20,
  },
});
