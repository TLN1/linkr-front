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
  const jobAppId = useSelector((state) => state.preset.jobApplicationId);
  const switchState = useSelector((state) => state.preset.switchState);

  // useEffect(() => {}, [switchState]);
  console.log(switchState);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SwipeView
        mode={switchState ? "profile" : "application"}
        application_id={jobAppId}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
