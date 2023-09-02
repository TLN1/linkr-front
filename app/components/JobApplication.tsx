import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Button,
} from "react-native";
import Checkbox from "expo-checkbox";
import TagInput from "react-native-tags-input";
import { get } from "../axios";
import DropDownPicker from "react-native-dropdown-picker";

export const JobApplication = (
  company_id: number,
  application_id: number | null,
  action: (
    id: number,
    title: string,
    experienceLevel: string,
    type: string,
    location: string,
    skills: string[],
    description: string
  ) => void
) => {
  const [onSiteChecked, setOnSiteChecked] = useState(false);
  const [remoteChecked, setRemoteChecked] = useState(false);
  const [hybridChecked, setHybridChecked] = useState(false);
  const [jobLocation, setJobLocation] = useState("");

  const [fullTimeChecked, setFullTimeChecked] = useState(false);
  const [partTimeChecked, setPartTimeChecked] = useState(false);
  const [jobType, setJobType] = useState("");

  const [experienceLevel, setExperienceLevel] = useState("");
  const [experienceLevelOpen, setExperienceLevelOpen] = useState(false);
  const [experienceLevels, setExperienceLevels] = useState([]);

  const [tagPickerState, setTagPickerState] = useState({
    tags: {
      tag: "",
      tagsArray: [],
    },
  });

  const [description, setDescription] = useState("");

  const [title, setTitle] = useState("");
  interface TagState {
    tag: string;
    tagsArray: string[];
  }

  interface DropDownSchema {
    label: string;
    value: string;
  }

  const updateTagPickerState = (state: TagState) => {
    setTagPickerState({
      tags: state,
    });
    console.log(tagPickerState);
  };

  const [skills, setSkills] = useState([]);

  useEffect(() => {
    async function fetchExperienceLevels() {
      // Fetch data
      const { data } = await get("/experience-level");
      const results: DropDownSchema[] = [];
      // Store results in the results array
      data.forEach((i: string) => {
        results.push({
          label: i,
          value: i,
        });
      });
      // Update the options state
      setExperienceLevels(results);
    }

    async function fetchApplication(application_id: number) {
      // Fetch data
      const { data } = await get(`/application/${application_id}`);
      if (data?.location) {
        const location = data?.location;
        setJobLocation(location);
        if (location === "on-site") {
          setOnSiteChecked(true);
        } else if (location === "remote") {
          setRemoteChecked(true);
        } else if (location === "hybrid") {
          setHybridChecked(true);
        }
      }

      if (data?.job_type) {
        const type = data?.job_type;
        setJobType(type);
        console.log("AKASFJSA");
        console.log(type);
        if (type === "part-time") {
          setPartTimeChecked(true);
        } else if (type === "full-time") {
          setFullTimeChecked(true);
        }
      }

      setTitle(data?.title);
      setExperienceLevel(data?.experience_level);
      updateTagPickerState({
        tag: "",
        tagsArray: data?.skills ? data?.skills : [],
      });
      setDescription(data?.description);
    }

    fetchExperienceLevels();
    if (application_id) fetchApplication(application_id);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.dialogContainer}>
        <View style={styles.dialogFrame}>
          <View style={{ padding: 10, marginLeft: "4%" }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>
              Add job application
            </Text>
          </View>

          <ScrollView>
            <Text style={{ fontSize: 15, padding: 8 }}>Job title:</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Enter position title"
            />

            <Text style={{ fontSize: 15, padding: 8 }}>Experience level:</Text>
            <DropDownPicker
              style={styles.dropdown}
              containerStyle={styles.dropdownContainerStyle}
              open={experienceLevelOpen}
              value={experienceLevel}
              items={experienceLevels}
              listMode="SCROLLVIEW"
              setOpen={setExperienceLevelOpen}
              setValue={setExperienceLevel}
              placeholder="Select experience level"
              dropDownContainerStyle={styles.dropdownListContainerStyle}
              //   setItems={setIndustryItems}
            />

            <Text style={{ fontSize: 15, padding: 8 }}>Job location:</Text>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={onSiteChecked}
                color={onSiteChecked ? "black" : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setJobLocation("on-site");
                    setOnSiteChecked(true);
                    setRemoteChecked(false);
                    setHybridChecked(false);
                  }
                }}
              />
              <Text style={styles.paragraph}>On-site</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={remoteChecked}
                color={remoteChecked ? "black" : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setJobLocation("remote");
                    setOnSiteChecked(false);
                    setRemoteChecked(true);
                    setHybridChecked(false);
                  }
                }}
              />
              <Text style={styles.paragraph}>Remote</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={hybridChecked}
                color={hybridChecked ? "black" : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setJobLocation("hybrid");
                    setOnSiteChecked(false);
                    setRemoteChecked(false);
                    setHybridChecked(true);
                  }
                }}
              />
              <Text style={styles.paragraph}>Hybrid</Text>
            </View>

            <Text style={{ fontSize: 15, padding: 8 }}>Job type:</Text>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={partTimeChecked}
                color={partTimeChecked ? "black" : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setJobType("part-time");
                    setPartTimeChecked(true);
                    setFullTimeChecked(false);
                  }
                }}
              />
              <Text style={styles.paragraph}>Part-time</Text>
            </View>
            <View style={styles.section}>
              <Checkbox
                style={styles.checkbox}
                value={fullTimeChecked}
                color={fullTimeChecked ? "black" : undefined}
                onValueChange={(value) => {
                  if (value) {
                    setJobType("full-time");
                    setPartTimeChecked(false);
                    setFullTimeChecked(true);
                  }
                }}
              />
              <Text style={styles.paragraph}>Full-time</Text>
            </View>
            <Text style={{ fontSize: 15, padding: 8 }}>Skills:</Text>
            <View style={styles.tagPickerContainer}>
              <TagInput
                inputContainerStyle={styles.tagPickerInput}
                updateState={updateTagPickerState}
                tags={tagPickerState.tags}
              />
            </View>

            <View>
              <Text style={{ fontSize: 15, padding: 8 }}>Description:</Text>
              <TextInput
                multiline
                style={styles.descriptionInput}
                onChangeText={setDescription}
                value={description}
                placeholder="Write description"
                // keyboardType="text"
              />
            </View>

            <Button
              title="Save"
              color="black"
              onPress={() => {
                console.log(company_id);
                console.log(title);
                console.log(experienceLevel);
                console.log(jobType);
                console.log(jobLocation);
                console.log(description);
                console.log(tagPickerState.tags.tagsArray);

                action(
                  application_id ? application_id : company_id,
                  title,
                  experienceLevel,
                  jobType,
                  jobLocation,
                  tagPickerState.tags.tagsArray,
                  description
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export const styles = StyleSheet.create({
  viewer: {
    borderColor: "green",
    borderWidth: 1,
    padding: 5,
  },
  editor: {
    borderColor: "blue",
    borderWidth: 1,
    padding: 5,
    fontSize: 18,
  },
  toolbar: {
    borderColor: "red",
    borderWidth: 1,
  },
  link: {
    color: "green",
  },
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
  tagPickerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tagPickerInput: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
  },
  richTextContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyle: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyle: {
    backgroundColor: "#c6c3b3",
    borderColor: "#c6c3b3",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
    backgroundColor: "white",
    padding: 10,
    margin: 8,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    backgroundColor: "white",
    maxHeight: 300,
    padding: 10,
    margin: 8,
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
  paragraph: {
    fontSize: 15,
  },
  containeroe: {
    flex: 1,
    height: "100%",
    backgroundColor: "#ccaf9b",
    padding: 20,
    alignItems: "center",
  },

  headerStyleoe: {
    fontSize: 20,
    fontWeight: "600",
    color: "#312921",
    marginBottom: 10,
  },

  htmlBoxStyleoe: {
    height: 200,
    width: 330,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
  },

  richTextContaineroe: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    marginBottom: 10,
  },

  richTextEditorStyleoe: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderWidth: 1,
    borderColor: "#ccaf9b",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    fontSize: 20,
  },

  richTextToolbarStyleoe: {
    backgroundColor: "#c6c3b3",
    borderColor: "#c6c3b3",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
  },

  errorTextStyleoe: {
    color: "#FF0000",
    marginBottom: 10,
  },
  dropdown: {
    padding: 10,
    margin: 8,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    shadowColor: "#000000",
  },
  dropdownContainerStyle: {
    zIndex: 2,
    borderColor: "#bbb",
    borderEndColor: "#bbb",
    borderTopColor: "#bbb",
    borderRightColor: "#bbb",
    borderLeftColor: "#bbb",
    borderStartColor: "#bbb",
    borderBottomColor: "#bbb",
    borderRadius: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  dropdownListContainerStyle: {
    borderColor: "#bbb",
    margin: 10,
  },
});

export default JobApplication;
