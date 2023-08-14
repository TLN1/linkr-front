import { View, Text, Button } from "react-native";
import { global } from "../styles/global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  navigation: NativeStackNavigationProp<any, "About">;
}

const About = ({ navigation }: Props) => {
  const popHandler = () => {
    navigation.pop();
  };

  const pressHandler = () => {
    navigation.push("About");
  };

  const pressLoginHandler = () => {
    navigation.push("Login");
  };

  const pressCreateCompanyHandler = () => {
    navigation.push("CreateCompany");
  };
  return (
    <View style={global.container}>
      <Text>About</Text>
      <Button title="go to Home POP" onPress={popHandler} />
      <Button title="About" onPress={pressHandler} />
      <Button title="Login" onPress={pressLoginHandler} />
      <Button title="CreateCompany" onPress={pressCreateCompanyHandler} />
    </View>
  );
};

export default About;
