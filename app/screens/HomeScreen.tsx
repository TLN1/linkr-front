import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React = require("react");
import { Button, Dimensions, Modal, Pressable, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PreferenceDialog from "./PreferencesDialog";
import { get, put } from "../axios";
import { useSelector } from "react-redux";

interface Props {
    navigation: NativeStackNavigationProp<any, "Homescreen">;
}

const HomeScreen = ({ navigation }: Props) => {
    const username = useSelector((state) => state.auth.username);

    const [isPreferenceModalVisible, setIsPreferenceModalVisible] = React.useState(false);

    const savePreferences = async (selectedIndustries: any, selectedJobLocations: any,
        selectedJobTypes: any, selectedExperienceLevels: any) => {
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
                        experience_level: selectedExperienceLevels
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
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ height: 50, backgroundColor: "black" }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    {username && (
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Button title="Preferences" onPress={() => setIsPreferenceModalVisible(true)} />
                            <Switch value={false} onValueChange={(value) => console.log("Switch Toggled:", value)} />
                        </View>
                    )}
                </View>
            </View>
            <View style={{ flex: 1 }}>
            </View>
            <Modal
                visible={isPreferenceModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsPreferenceModalVisible(false)}
            >
                <View style={{
                    flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)",
                    width: "100%", maxHeight: Dimensions.get("window").height,
                }}>
                    <PreferenceDialog name={username} onSavePreferences={savePreferences} onCancel={cancelPreferences} />
                </View>
            </Modal>
        </SafeAreaView >
    );
}

export default HomeScreen;