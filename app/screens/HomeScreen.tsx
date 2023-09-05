import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import {
  Button,
  Dimensions,
  Modal,
  Pressable,
  Switch,
  View,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferenceDialog from "./PreferencesDialog";
import JobApplicationSelector from "./JobApplicationSelector";

import { get, put } from "../axios";
import { useSelector } from "react-redux";
import { set } from "react-native-reanimated";
import { useEffect, useState } from "react";
import SwipeView from "./SwipeView";

interface Props {
  navigation: NativeStackNavigationProp<any, "Homescreen">;
}

const HomeScreen = ({ navigation }: Props) => {
  const username = useSelector((state) => state.auth.username);

  const [isPreferenceModalVisible, setIsPreferenceModalVisible] =
    React.useState(false);
  const [isJobSelectorVisible, setIsJobSelectorVisible] = React.useState(false);
  const [buttonType, setButtonType] = React.useState("for user");
  const [switchState, setSwitchState] = React.useState(false);

  const jobAppId = useSelector((state) => state.preset.jobApplicationId);

  const savePreferences = async (
    selectedIndustries: any,
    selectedJobLocations: any,
    selectedJobTypes: any,
    selectedExperienceLevels: any
  ) => {
    try {
      const token = await AsyncStorage.getItem("authToken");
      if (token) {
        const accessToken = JSON.parse(token).access_token;

        await put(
          "/preferences/update",
          {
            industry: selectedIndustries,
            job_location: selectedJobLocations,
            job_type: selectedJobTypes,
            experience_level: selectedExperienceLevels,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
      }
    } catch (error) {
      console.error("Error updating education:", error);
    }
    setIsPreferenceModalVisible(false);
  };

  const cancelPreferences = () => {
    setIsPreferenceModalVisible(false);
    setIsJobSelectorVisible(false);
  };

  useEffect(() => {}, [buttonType]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SwipeView
        mode={switchState ? "profile" : "application"}
        application_id={jobAppId}
      />
      <View style={{ height: 50, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {username && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {buttonType === "for user" && (
                <Button
                  title="Job seeker"
                  onPress={() => setIsPreferenceModalVisible(true)}
                />
              )}
              {buttonType === "for company" && (
                <Button
                  title="Recruiter"
                  onPress={() => setIsJobSelectorVisible(true)}
                />
              )}
              <Switch
                value={switchState}
                onValueChange={(value) => {
                  if (buttonType === "for user") {
                    setButtonType("for company");
                    setSwitchState(true);
                  } else if (buttonType === "for company") {
                    setButtonType("for user");
                    setSwitchState(false);
                  }
                }}
              />
            </View>
          )}
        </View>
      </View>
      <View style={{ flex: 1 }}></View>
      <Modal
        visible={isPreferenceModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsPreferenceModalVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            maxHeight: Dimensions.get("window").height,
          }}
        >
          <PreferenceDialog
            name={username}
            onSavePreferences={savePreferences}
            onCancel={cancelPreferences}
          />
        </View>
      </Modal>
      <Modal
        visible={isJobSelectorVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsJobSelectorVisible(false)}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            width: "100%",
            maxHeight: Dimensions.get("window").height,
          }}
        >
          <JobApplicationSelector
            name={username}
            onCancel={cancelPreferences}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;
