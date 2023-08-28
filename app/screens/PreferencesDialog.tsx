import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { get, post, put } from "../axios";


interface DropDownSchema {
    label: string;
    value: string;
}

enum Industry {
  SOFTWARE_ENGINEERING = "Software Engineering",
  // Add more industries here
}

enum JobLocation {
  ON_SITE = "on-site",
  REMOTE = "remote",
}

enum JobType {
  PART_TIME = "part-time",
  FULL_TIME = "full-time",
}

enum ExperienceLevel {
  INTERN = "intern",
  JUNIOR = "junior",
  MIDDLE = "middle",
  SENIOR = "senior",
  LEAD = "lead",
}

interface Preference {
  industry: Industry[];
  job_location: JobLocation[];
  job_type: JobType[];
  experience_level: ExperienceLevel[];
}

const PreferenceDialog: React.FC = () => {
  const [preferences, setPreferences] = useState<Preference>({
    industry: [],
    job_location: [],
    job_type: [],
    experience_level: [],
  });
  

  const [industryOpen, setIndustryOpen] = useState(false);
  const [industry, setIndustry] = useState<Industry[]>([]); // Make sure to match the type
  const [industryItems, setIndustryItems] = useState([]);

  const [jobLocationOpen, setJobLocationOpen] = useState(false);
  const [jobLocation, setJobLocation] = useState<JobLocation[]>([]); // Make sure to match the type
  const [jobLocationItems, setJobLocationItems] = useState([]);

  const [jobTypeOpen, setJobTypeOpen] = useState(false);
  const [jobType, setJobType] = useState<JobType[]>([]);
  const [jobTypeItems, setJobTypeItems] = useState([]);

  const [experienceLevelOpen, setExperienceLevelOpen] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel[]>([]);
  const [experienceLevelItems, setExperienceLevelItems] = useState([]);

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

    async function fetchJobLocationData() {
        // Fetch data
        const { data } = await get("/job_location");
        const results: DropDownSchema[] = [];
        // Store results in the results array
        data.forEach((i: string) => {
          results.push({
            label: i,
            value: i,
          });
        });
        // Update the options state
        setJobLocationItems(results);
      }

      async function fetchJobTypeData() {
        // Fetch data
        const { data } = await get("/job_type");
        const results: DropDownSchema[] = [];
        // Store results in the results array
        data.forEach((i: string) => {
          results.push({
            label: i,
            value: i,
          });
        });
        // Update the options state
        setJobTypeItems(results);
      }

      async function fetchExperienceLevelData() {
        // Fetch data
        const { data } = await get("/experience_level");
        const results: DropDownSchema[] = [];
        // Store results in the results array
        data.forEach((i: string) => {
          results.push({
            label: i,
            value: i,
          });
        });
        // Update the options state
        setExperienceLevelItems(results);
      }


    fetchIndustryData();
    fetchJobLocationData();
    fetchJobTypeData();
    fetchExperienceLevelData();

    }, []);

  const savePreferences = () => {
    // Logic to save preferences
    console.log('Saved preferences:', preferences);
    // You can send preferences to the server or store them locally
  };

  const cancel = () => {
   
  };

  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogFrame}>
      <Text>Select Industry:</Text>


      <DropDownPicker
        style={styles.dropdownone}
        containerStyle={styles.dropdownContainerStyleOne}
        open={industryOpen}
        value={industry}
        items={industryItems}
        setOpen={setIndustryOpen}
        setValue={setIndustry}
        placeholder="Select industry"
      />

      <Text>Select Job Location:</Text>

      <DropDownPicker
        style={styles.dropdowntwo}
        containerStyle={styles.dropdownContainerStyleTwo}
        open={jobLocationOpen}
        value={jobLocation}
        items={jobLocationItems}
        setOpen={setJobLocationOpen}
        setValue={setJobLocation}
        placeholder="Select Job Location"
      />
      
      <Text>Select Job Type:</Text>
      
      <DropDownPicker
        style={styles.dropdownone}
        containerStyle={styles.dropdownContainerStyleThree}
        open={jobTypeOpen}
        value={jobType}
        items={jobTypeItems}
        setOpen={setJobTypeOpen}
        setValue={setJobType}
        placeholder="Select Job Type"
      />
      
      <Text>Select Experience Level:</Text>
      
      <DropDownPicker
            style={styles.dropdownone}
            containerStyle={styles.dropdownContainerStyleFour}
            open={experienceLevelOpen}
            value={experienceLevel}
            items={experienceLevelItems}
            setOpen={setExperienceLevelOpen}
            setValue={setExperienceLevel}
            placeholder="Select Experience Level"
        />
        <Button title="Save" onPress={savePreferences} color="black" style={styles.saveButton} />
        <View style={styles.buttonSeparator} />
        <Button title="Cancel" onPress={cancel} color="black" style={styles.cancelButton} />
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({

    dialogContainer: {
        backgroundColor: 'transparent', // Set to transparent to make the frame visible
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      dialogFrame: {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 10,
        padding: 20,
        elevation: 5,
      },
    heading: {
      marginBottom: 7,
    },
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    wrapper: {
      width: "80%",
    },
    input: {
      marginTop: 10,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: "#bbb",
      borderRadius: 5,
      paddingHorizontal: 14,
    },
    dropdownone: {
      backgroundColor: "#fff",
      borderColor: "#bbb",
      shadowColor: "#000000",
    },
    dropdowntwo: {
      backgroundColor: "#fff",
      borderColor: "#bbb",
      marginBottom: 15,
      shadowColor: "#000000",
    },
    dropdownContainerStyleOne: {
      zIndex: 4,
      marginTop: 10,
      marginBottom: 10,
      borderColor: "#bbb",
      borderRadius: 5,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    dropdownContainerStyleTwo: {
      zIndex: 3,
      marginTop: 10,
      marginBottom: 10,
      borderColor: "#bbb",
      borderRadius: 5,
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
    },
    dropdownContainerStyleThree: {
        zIndex: 2,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#bbb",
        borderRadius: 5,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      },
      dropdownContainerStyleFour: {
        zIndex: 1,
        marginTop: 10,
        marginBottom: 10,
        borderColor: "#bbb",
        borderRadius: 5,
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      },
    saveButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 10,
      },
      cancelButton: {
        backgroundColor: 'black',
        borderRadius: 10,
        marginTop: 10,
      },
      buttonSeparator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
      },
  });
  
export default PreferenceDialog;
