import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { get, post, put } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Company {
  id: number;
  name: string;
  website: string;
  industry: string;
  organizationSize: string;
}

interface DropDownSchema {
  label: string;
  value: number;
}

interface Props {
  name: string;
  onCancel: any,
  navigation: NativeStackNavigationProp<any, "Profile">;
}

const JobApplicationSelector: React.FC = ({ name, onCancel, navigation }: Props) => {

  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyItems, setCompanyItems] = useState<DropDownSchema[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<DropDownSchema>()

  const [jobAppOpen, setJobAppOpen] = useState(false);
  const [jobAppItems, setJobAppItems] = useState<DropDownSchema[]>([]);
  const [selectedJobApp, setSelectedJobApp] = useState<DropDownSchema>()


  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await get(`/users/me`);
      const userData = response.data;

      console.log(userData?.companies);

      const results: DropDownSchema[] = [];
      userData?.companies.forEach((c: Company) => {
        results.push({
          label: c.name,
          value: c.id,
        });
      });
      setCompanyItems(results);
    };

    const fetchPresetActiveJobApplication = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        if (token) {
          const accessToken = JSON.parse(token).access_token;

        }
      } catch (error) {
        console.error("Error fetching preset job app:", error);
      }
    };

    fetchCompanies();
    fetchPresetActiveJobApplication()
  }, [jobAppItems]);

  const fetchCompanyJobApps = async () => {
    console.log(selectedCompany);
    if (selectedCompany) {
      const { data } = await get(`/company/${selectedCompany}`);
      const results: DropDownSchema[] = [];
      data?.applications.forEach((c: Company) => {
        results.push({
          label: c.name,
          value: c.id,
        });
      });
      setJobAppItems(results);
    }

  }

  const saveJobApp = async () => {
    console.log("SAVESAVESAVE");

  };

  const cancel = () => {
    onCancel()
  };

  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogFrame}>
        <Text>Select Company:</Text>


        <DropDownPicker
          style={styles.dropdownone}
          containerStyle={styles.dropdownContainerStyleOne}
          open={companyOpen}
          value={selectedCompany ? selectedCompany.value : null}
          items={companyItems}
          min={0}
          max={companyItems.length}
          setOpen={setCompanyOpen}
          setValue={setSelectedCompany}
          onSelectItem={fetchCompanyJobApps}
          placeholder="Select Company"
        />

        <Text>Select Job Application:</Text> 

        <DropDownPicker
          style={styles.dropdowntwo}
          containerStyle={styles.dropdownContainerStyleTwo}
          open={jobAppOpen}
          value={selectedJobApp ? selectedJobApp.value : null}
          items={jobAppItems}
          min={0}
          max={jobAppItems.length}
          setOpen={setJobAppOpen}
          setValue={setSelectedJobApp}
          placeholder="Select Job Location"
        />

        <Button title="Save" onPress={saveJobApp} color="black" />
        <View style={styles.buttonSeparator} />
        <Button title="Cancel" onPress={cancel} color="black" />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({

  dialogContainer: {
    backgroundColor: 'transparent',
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

export default JobApplicationSelector;
