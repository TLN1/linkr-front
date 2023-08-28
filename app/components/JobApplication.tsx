import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export const JobApplication = () => {

  const [jobLocationOpen, setJobLocationOpen] = useState(false);
  const [jobLocation, setJobLocation] = useState("");

  const [jobTypeOpen, setJobTypeOpen] = useState(false);
  const [jobType, setJobType] = useState("");

  const [experienceLevelOpen, setExperienceLevelOpen] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState("");

  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogFrame}>

        <View style={{ padding: 10, marginLeft: "4%" }}>
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            Add job application
          </Text>
        </View>

        <DropDownPicker
          //   style={styles.dropdownone}
          //   containerStyle={styles.dropdownContainerStyleOne}
          open={jobLocationOpen}
          value={jobLocation}
          items={[]}
          setOpen={setJobLocationOpen}
          setValue={setJobLocation}
          placeholder="Select job location"
          //   setItems={setIndustryItems}
        />
        <DropDownPicker
          //   style={styles.dropdownone}
          //   containerStyle={styles.dropdownContainerStyleOne}
          open={jobTypeOpen}
          value={jobType}
          items={[]}
          setOpen={setJobTypeOpen}
          setValue={setJobType}
          placeholder="Select job type"
          //   setItems={setIndustryItems}
        />

        <DropDownPicker
          //   style={styles.dropdownone}
          //   containerStyle={styles.dropdownContainerStyleOne}
          open={experienceLevelOpen}
          value={experienceLevel}
          items={[]}
          setOpen={setExperienceLevelOpen}
          setValue={setExperienceLevel}
          placeholder="Select experience level"
          //   setItems={setIndustryItems}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default JobApplication;
