import { View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { del } from "../axios";
import { showSuccessToast } from "./toast";
import React from "react";

interface Application {
  id: number;
  title: string;
  location: string;
  job_type: string;
  experienceLevel: string;
  skills: string[];
  description: string;
}

export function JobApplicationListItem(
  application: any,
  setApplicationId: any,
  setModalVisible: any,
  setUpdateApplicationId: any,
  setUpdateModalVisible: any,
  myCompany: any,
  refresh: any,
  setRefresh: any
) {

  return (
    <View>
      <Pressable
        onPress={() => {
          setApplicationId(application?.item?.id);
          setModalVisible(true);
        }}
      >
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingEnd: 0,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              {application?.item?.title}
            </Text>
            <Text style={{ fontSize: 15, color: "grey" }}>
              {application?.item?.location}
            </Text>
          </View>
          {myCompany && (
            <View style={{ padding: 5 }}>
              <Feather.Button
                name="edit-3"
                backgroundColor="white"
                color="black"
                onPress={() => {
                  setUpdateApplicationId(application?.item?.id);
                  setUpdateModalVisible(true);
                }}
              />
              <Feather.Button
                name="delete"
                backgroundColor="white"
                color="black"
                onPress={async () => {
                  await del(`/application/${application?.item?.id}`)
                    .then((res) => {
                      console.log("deleted");
                      setRefresh(!refresh);
                      showSuccessToast("Job application deleted");
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
