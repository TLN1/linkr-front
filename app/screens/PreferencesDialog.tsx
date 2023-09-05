import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { get, post, put } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';


interface DropDownSchema {
    label: string;
    value: string;
}

interface Props {
  name: string;
  onSavePreferences: any,
  onCancel: any,
  navigation: NativeStackNavigationProp<any, "Profile">;
}

const PreferenceDialog: React.FC = ({ name, onSavePreferences, onCancel, navigation }: Props) => {

  const [username, setUsername] = useState(name);

  const [industryOpen, setIndustryOpen] = useState(false);
  const [industryItems, setIndustryItems] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  const [jobLocationOpen, setJobLocationOpen] = useState(false);
  const [jobLocation, setJobLocation] = useState([]); // Make sure to match the type
  const [jobLocationItems, setJobLocationItems] = useState([]);
  const [selectedJobLocations, setSelectedJobLocations] = useState<string[]>([]);

  const [jobTypeOpen, setJobTypeOpen] = useState(false);
  const [jobType, setJobType] = useState([]);
  const [jobTypeItems, setJobTypeItems] = useState([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const [experienceLevelOpen, setExperienceLevelOpen] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState([]);
  const [experienceLevelItems, setExperienceLevelItems] = useState([]);
  const [selectedExperienceLevels, setSelectedExpereinceLevels] = useState<string[]>([]);

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

      const fetchPresetPreferences = async () => {
        try {
          const token = await AsyncStorage.getItem("authToken");
          if (token) {
            const accessToken = JSON.parse(token).access_token;
            
    
            const response = await get(`/user/${username}`);
            console.log(response.data.preference);
            setSelectedIndustries(response.data.preference.industry);
            setSelectedJobLocations(response.data.preference.job_location);
            setSelectedJobTypes(response.data.job_type);
            setSelectedExpereinceLevels(response.data.experience_level);
          }
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      };

    fetchIndustryData();
    fetchJobLocationData();
    fetchJobTypeData();
    fetchExperienceLevelData();
    fetchPresetPreferences();

    }, []);

  const savePreferences = async () => {
    onSavePreferences(selectedIndustries, selectedJobLocations, selectedJobTypes, selectedExperienceLevels);
  };

  const cancel = () => {
   onCancel();
  };

  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogFrame}>
      <Text>Select Industry:</Text>


      <DropDownPicker
        style={styles.dropdownone}
        containerStyle={styles.dropdownContainerStyleOne}
        open={industryOpen}
        value={selectedIndustries}
        items={industryItems}
        multiple={true} 
        min={0} 
        max={industryItems.length} 
        setOpen={setIndustryOpen} 
        setValue={setSelectedIndustries}
        placeholder="Select industries"
      />

      <Text>Select Job Location:</Text>

      <DropDownPicker
        style={styles.dropdowntwo}
        containerStyle={styles.dropdownContainerStyleTwo}
        open={jobLocationOpen}
        value={selectedJobLocations}
        items={jobLocationItems}
        multiple={true} 
        min={0} 
        max={jobLocationItems.length} 
        setOpen={setJobLocationOpen}
        setValue={setSelectedJobLocations}
        placeholder="Select Job Location"
      />
      
      <Text>Select Job Type:</Text>
      
      <DropDownPicker
        style={styles.dropdownone}
        containerStyle={styles.dropdownContainerStyleThree}
        open={jobTypeOpen}
        value={selectedJobTypes}
        items={jobTypeItems}
        multiple={true} 
        min={0} 
        max={jobTypeItems.length} 
        setOpen={setJobTypeOpen}
        setValue={setSelectedJobTypes}
        placeholder="Select Job Type"
      />
      
      <Text>Select Experience Level:</Text>
      
      <DropDownPicker
        style={styles.dropdownone}
        containerStyle={styles.dropdownContainerStyleFour}
        open={experienceLevelOpen}
        value={selectedExperienceLevels}
        items={experienceLevelItems}
        multiple={true} 
        min={0} 
        max={experienceLevelItems.length} 
        setOpen={setExperienceLevelOpen}
        setValue={setSelectedExpereinceLevels}
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
