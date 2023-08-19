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

interface Props {
  navigation: NativeStackNavigationProp<any, "Login">;
}

const Login = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={authContext.isLoading} />
      <View style={styles.wrapper}>
        <Text>Login</Text>
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

        <Button
          title="Login"
          onPress={() => {
            console.log(username);
            console.log(password);
            authContext.login(username, password);
          }}
        />

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>Register</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};
// TODO: [NK] ADD REGISTER SCREEN, LOGIN ACTION
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  link: {
    color: "blue",
  },
});

export default Login;
