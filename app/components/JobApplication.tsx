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

export const JobApplication = (
  jobTitle: string,
  jobExperienceLevel: string,
  type: string,
  location: string,
  jobDescription: string,
  neededSkills: string[]
) => {
  const [onSiteChecked, setOnSiteChecked] = useState(false);
  const [remoteChecked, setRemoteChecked] = useState(false);
  const [hybridChecked, setHybridChecked] = useState(false);
  const [jobLocation, setJobLocation] = useState(location);

  const [fullTimeChecked, setFullTimeChecked] = useState(false);
  const [partTimeChecked, setPartTimeChecked] = useState(false);
  const [jobType, setJobType] = useState(type);

  const [experienceLevel, setExperienceLevel] = useState(jobExperienceLevel);

  const [tagPickerState, setTagPickerState] = useState({
    tags: {
      tag: "",
      tagsArray: neededSkills ? neededSkills : [],
    },
  });

  const [description, setDescription] = useState(jobDescription);

  const [title, setTitle] = useState(jobTitle);
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
    if (location) {
      if (location === "on-site") {
        setOnSiteChecked(true);
      } else if (location === "remote") {
        setRemoteChecked(true);
      } else if (location === "hybrid") {
        setHybridChecked(true);
      }
    }

    if (type) {
      if (type === "part-time") {
        setPartTimeChecked(true);
      } else if (type === "full-time") {
        setFullTimeChecked(true);
      }
    }
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
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Enter position title"
            />

            <TextInput
              style={styles.input}
              value={experienceLevel}
              onChangeText={(text) => setExperienceLevel(text)}
              placeholder="Enter experience level"
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

            <Button title="Save" color="black" />
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
  dropdown: {
    backgroundColor: "#fff",
    borderColor: "#bbb",
    marginBottom: 15,
    shadowColor: "#000000",
  },
  dropdownContainerStyle: {
    // zIndex: 2,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#bbb",
    borderRadius: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
});

export default JobApplication;
