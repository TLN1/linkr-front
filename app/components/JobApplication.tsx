import { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Checkbox from "expo-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
// import { RichText, Bold, Italic, OrderedList, UnorderedList, Link, Media } from "react-native-rte";
import TagInput from "react-native-tags-input";
import { get } from "../axios";

export const JobApplication = () => {
  const [onSiteChecked, setOnSiteChecked] = useState(false);
  const [remoteChecked, setRemoteChecked] = useState(false);
  const [hybridChecked, setHybridChecked] = useState(false);
  const [jobLocation, setJobLocation] = useState("");

  const [fullTimeChecked, setFullTimeChecked] = useState(false);
  const [partTimeChecked, setPartTimeChecked] = useState(false);
  const [jobType, setJobType] = useState("");

  const [industryOpen, setIndustryOpen] = useState(false);
  const [industry, setIndustry] = useState("");
  const [industryItems, setIndustryItems] = useState([]);

  const [experienceLevelOpen, setExperienceLevelOpen] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("");

  const [tagPickerState, setTagPickerState] = useState({
    tags: {
      tag: "",
      tagsArray: [],
    },
  });

  const [description, setDescription] = useState("");

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
  };

  const [skills, setSkills] = useState([]);

  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);
  const [title, setTitle] = useState("");

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  useEffect(() => {
    async function fetchIndustryData() {
      // Fetch data
      const { data } = await get("/industry");
      const results: DropDownSchema[] = [];
      // Store results in the results array
      data.forEach((i: string) => {
        results.push({
          label: i,
          value: i,
        });
      });
      // Update the options state
      setIndustryItems(results);
    }

    // Trigger the fetch
    fetchIndustryData();
  }, []);

  return (
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

          <DropDownPicker
            style={styles.dropdown}
            containerStyle={styles.dropdownContainerStyle}
            open={industryOpen}
            value={industry}
            items={industryItems}
            setOpen={setIndustryOpen}
            setValue={setIndustry}
            placeholder="Select job industry"
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
        </ScrollView>

        {/* <View style={styles.dropdownContainer}>
          <DropDownPicker
            style={styles.dropdown}
            containerStyle={styles.dropdownContainerStyle}
            open={jobTypeOpen}
            value={jobType}
            items={[]}
            setOpen={setJobTypeOpen}
            setValue={setJobType}
            placeholder="Select job type"
            //   setItems={setIndustryItems}
          />
        </View> */}
        {/* <View style={styles.dropdownContainer}>
          <DropDownPicker
            style={styles.dropdown}
            containerStyle={styles.dropdownContainerStyle}
            open={experienceLevelOpen}
            value={experienceLevel}
            items={[]}
            setOpen={setExperienceLevelOpen}
            setValue={setExperienceLevel}
            placeholder="Select experience level"
            //   setItems={setIndustryItems}
          />
        </View> */}
        {/* <View style={styles.richTextContainer}>
          <RichEditor
            ref={richText}
            onChange={richTextHandle}
            placeholder="Write your cool content here :)"
            androidHardwareAccelerationDisabled={true}
            style={styles.richTextEditorStyle}
            initialHeight={250}
          />
          <RichToolbar
            editor={richText}
            selectedIconTint="#873c1e"
            iconTint="#312921"
            actions={[
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.setStrikethrough,
              actions.setUnderline,
            ]}
            style={styles.richTextToolbarStyle}
          />
        </View> */}
        {/* <KeyboardAvoidingView style={{flex:1}} behavior={'padding'}>
          <RichText>
            <RichText.Editor />
            <RichText.Toolbar>
              <Bold />
              <Italic />
              <OrderedList />
              <UnorderedList />
              {/* <Link onPress={this.addLink.bind(this)} /> */}
        {/* <Media onPress={this.selectMedia.bind(this)} /> */}
        {/* </RichText.Toolbar>
          </RichText>
          </KeyboardAvoidingView> */}
        {/* {Platform.OS !== "web" && (
          <View style={styles.tagPickerContainer}>
            <TagInput
              updateState={updateTagPickerState}
              tags={tagPickerState.tags}
            />
          </View>
        )} */}
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  dialogContainer: {
    // backgroundColor: "transparent", // Set to transparent to make the frame visible
    // flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    padding: 10,
    marginTop: 800,
    height: (Dimensions.get("window").height * 2) / 3,
  },
  dialogFrame: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "transparent",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  dropdown: {
    // marginTop: 12,
    // marginBottom: 12,
    // position: "relative",
    // zIndex:1,
    // borderWidth: 0,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    // padding: 10,
    // border:10,
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
});

export default JobApplication;
