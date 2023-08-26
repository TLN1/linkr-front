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

  const pressCreateCompanyHandler = () => {
    navigation.push("CreateCompany");
  };

  const pressCompanyViewHandler = () => {
    navigation.push("CompanyView");
  };

  const pressCompanyUpdateHandler = () => {
    navigation.push("UpdateCompany");
  };

  return (
    <View style={global.container}>
      <Text>Home</Text>
      <Button title="About" onPress={pressHandler} />
      <Button title="Login" onPress={pressLoginHandler} />
      <Button title="Logout" onPress={logout} />
      <Button title="CreateCompany" onPress={pressCreateCompanyHandler} />
      <Button title="CompanyView" onPress={pressCompanyViewHandler} />
      <Button title="UpdateCompany" onPress={pressCompanyUpdateHandler} />
    </View>
  );
};

export default Home;
