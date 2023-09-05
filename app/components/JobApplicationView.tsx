import { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { get } from "../axios";
import { Ionicons } from "@expo/vector-icons";
import Unorderedlist from "react-native-unordered-list";

export const JobApplicationView = (
  application_id: any,
  isVisible: any,
  setVisible: any
) => {
  const [title, setTitle] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState([]);
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function fetchApplication(application_id: number) {
      // Fetch data
      const { data } = await get(`/application/${application_id}`);
      if (data?.location) {
        const location = data?.location;
        setJobLocation(location);
      }

      if (data?.job_type) {
        const type = data?.job_type;
        setJobType(type);
      }

      setTitle(data?.title);
      setExperienceLevel(data?.experience_level);
      setDescription(data?.description);
      setSkills(data?.skills);
    }

    if (application_id) fetchApplication(application_id);
  }, [application_id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.dialogContainer}>
        <View style={styles.dialogFrame}>
          <ScrollView>
            <View
              style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{alignContent:'center', textAlignVertical: 'center',fontSize: 20, fontWeight: "bold" }}>{title}</Text>
              <Ionicons.Button
                name="close"
                size={24}
                color="black"
                backgroundColor="white"
                style={{
                  alignContent: "center",
                  justifyContent: "center",
                  flex: 1,
                  alignSelf: "center",
                  paddingEnd: 0,
                }}
                onPress={() => setVisible(false)}
              />
            </View>
            <Text style={{ fontSize: 20, padding: 8, color: 'grey', fontWeight:'bold' }}>Experience level:</Text>
            <Text style={{ fontSize: 15 , padding: 8, paddingTop: 0}}>{experienceLevel}</Text>

            <Text style={{ fontSize: 20, padding: 8, color: 'grey', fontWeight:'bold' }}>Job location:</Text>
            <Text style={{ fontSize: 15, padding: 8 }}>{jobLocation}</Text>

            <Text style={{ fontSize: 20, padding: 8, color: 'grey', fontWeight:'bold' }}>Job type:</Text>
            <Text style={{ fontSize: 15, padding: 8 }}>{jobType}</Text>

            <Text style={{ fontSize: 20, padding: 8, color: 'grey', fontWeight:'bold' }}>Skills:</Text>
            <View>
              {skills.map((skill) => (
                <View key={skill} style={{ padding: 5 }}>
                  <Unorderedlist bulletUnicode={0x2023}>
                    <Text style={{ fontSize: 15 }}>{skill}</Text>
                  </Unorderedlist>
                </View>
              ))}
            </View>
            <View>
              <Text style={{ fontSize: 20, padding: 8, color: 'grey', fontWeight:'bold' }}>Description:</Text>
              <Text style={{ fontSize: 15, padding: 8 }}>{description}</Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dialogContainer: {
    padding: 10,
    marginTop: 100,
    height: (Dimensions.get("window").height * 2) / 3,
  },
  dialogFrame: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 300,
  },
});
