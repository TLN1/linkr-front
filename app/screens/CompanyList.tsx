import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { get } from "../axios";
import { CompanyListItem } from "../components/CompanyListItem";

interface Props {
  route: any;
  navigation: NativeStackNavigationProp<any, "My companies">;
}

export const CompanyList = ({ route, navigation }: Props) => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await get(`/users/me`);
      const userData = response.data;
      setCompanies(userData?.companies);
    };

    fetchCompanies();
  }, []);

  return (
    <SafeAreaView>
      <View style={{ padding: 8 }}>
        <Ionicons.Button
          name="add"
          size={24}
          color="black"
          backgroundColor="white"
          onPress={() => {
            navigation.navigate("Set up company");
          }}
        >
          Set up company
        </Ionicons.Button>
      </View>
      <View style={{ width: "100%", height: "100%", padding: 8 }}>
        <FlatList
          data={companies}
          renderItem={(company) =>
            CompanyListItem(
              company,
              company?.item?.owner_username === route?.params?.username,
              navigation
            )
          }
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
