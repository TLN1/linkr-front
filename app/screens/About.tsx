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
  return (
    <View style={global.container}>
      <Text>About</Text>
      <Button title="go to Home POP" onPress={popHandler} />
    </View>
  );
};

export default About;
