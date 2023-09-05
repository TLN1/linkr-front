import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { del } from "../axios";
import React from "react";

interface Company {
  id: number;
  name: string;
  website: string;
  industry: string;
  organizationSize: string;
}

export function CompanyListItem(
  company: any,
  myCompany: boolean,
  navigation: any
) {
  return (
    <View>
      <Pressable
        onPress={() => {
          navigation.navigate("Company", { id: company?.item?.id });
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingEnd: 0,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {company?.item?.name}
            </Text>
            <Text style={{ padding: 5, fontSize: 15, color: "grey" }}>
              {company?.item?.industry}
            </Text>
          </View>
          {myCompany && (
            <View style={{ padding: 5 }}>
              <Feather.Button
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  flex: 1,
                  alignSelf: "center",
                  paddingEnd: 0,
                }}
                name="edit-3"
                backgroundColor="white"
                color="black"
                onPress={() => {
                  navigation.navigate("Update company data", {
                    id: company?.item?.id,
                  });
                }}
              />
              <Feather.Button
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  flex: 1,
                  alignSelf: "center",
                  paddingEnd: 0,
                }}
                name="delete"
                backgroundColor="white"
                color="black"
                onPress={async () => {
                  await del(`/company/${company?.item?.id}`)
                    .then((res) => {
                      console.log("deleted");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
              />
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
}
