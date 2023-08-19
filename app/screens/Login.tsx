import { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
} from "react-native";
import { AuthContext } from "../context/Auth";
import Spinner from "react-native-loading-spinner-overlay";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import TlnButton from "../components/TlnButton";

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

  const submitOnPress = () => {
    console.log(username);
    console.log(password);

    if (register) {
      authContext.register(username, password);
    } else {
      authContext.login(username, password);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={authContext.isLoading} />
      <View style={styles.wrapper}>
        <Text>{label}</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Enter username"
        />

        <TextInput
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
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
// TODO: [NK] ADD REGISTER SCREEN, LOGIN ACTION
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
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    marginTop: 5,
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
