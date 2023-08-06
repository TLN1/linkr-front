import { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthContext } from "../context/Auth";
import Spinner from "react-native-loading-spinner-overlay";

interface Props {
  navigation: NativeStackNavigationProp<any, "Register">;
}

const Register = ({ navigation }: Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, register } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading} />
      <View style={styles.wrapper}>
        <Text>Register</Text>
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
          title="Register"
          onPress={() => {
            console.log(username);
            console.log(password);
            register(username, password);
          }}
        />

        <View style={{ flexDirection: "row", marginTop: 20 }}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Login</Text>
          </TouchableOpacity>
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

export default Register;
