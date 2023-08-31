import { useState, useRef } from "react";
import { View, StyleSheet, Text, KeyboardAvoidingView } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { RichText, Bold, Italic, OrderedList, UnorderedList, Link, Media } from "react-native-rte";


export const JobApplication = () => {
  const [jobLocationOpen, setJobLocationOpen] = useState(false);
  const [jobLocation, setJobLocation] = useState("");

  const [jobTypeOpen, setJobTypeOpen] = useState(false);
  const [jobType, setJobType] = useState("");

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

  const updateTagPickerState = (state: TagState) => {
    setTagPickerState({
      tags: state,
    });
  };

  const [skills, setSkills] = useState([]);

  const richText = useRef();

  const [descHTML, setDescHTML] = useState("");
  const [showDescError, setShowDescError] = useState(false);

  const richTextHandle = (descriptionText) => {
    if (descriptionText) {
      setShowDescError(false);
      setDescHTML(descriptionText);
    } else {
      setShowDescError(true);
      setDescHTML("");
    }
  };

  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogFrame}>
        <View style={{ padding: 10, marginLeft: "4%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Add job application
          </Text>
        </View>

        <DropDownPicker
          style={styles.dropdown}
          containerStyle={styles.dropdownContainerStyle}
          open={jobLocationOpen}
          value={jobLocation}
          items={[]}
          setOpen={setJobLocationOpen}
          setValue={setJobLocation}
          placeholder="Select job location"
          //   setItems={setIndustryItems}
        />
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
        <KeyboardAvoidingView style={{flex:1}} behavior={'padding'}>
          <RichText>
            <RichText.Editor />
            <RichText.Toolbar>
              <Bold />
              <Italic />
              <OrderedList />
              <UnorderedList />
              {/* <Link onPress={this.addLink.bind(this)} /> */}
              {/* <Media onPress={this.selectMedia.bind(this)} /> */}
            </RichText.Toolbar>
          </RichText>
          </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  dialogContainer: {
    backgroundColor: "transparent", // Set to transparent to make the frame visible
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    zIndex: 2,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#bbb",
    borderRadius: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
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
});

export default JobApplication;
