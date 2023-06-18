import { View, Text, Button } from "react-native";
import { global } from "../styles/global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface Props {
  navigation: NativeStackNavigationProp<any, "About">;
}

const Home = ({ navigation }: Props) => {
  const pressHandler = () => {
    navigation.push("About");
  };
  return (
    <View style={global.container}>
      <Text>Home</Text>
      <Button title="About" onPress={pressHandler} />
    </View>
  );
};

export default Home;
