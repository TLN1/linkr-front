import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { get, post, put } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";
import { setApplicationId } from "../actions/PresetActions";

interface Company {
  id: number;
  name: string;
  website: string;
  industry: string;
  organizationSize: string;
}

interface Application {
  id: number;
  title: string;
  location: string;
  job_type: string;
  experience_level: string;
  skills: string[];
  description: string;
  company_id: number;
  views: number;
}

interface DropDownSchema {
  label: string;
  value: number;
}

interface Props {
  setAppId: any;
  name: string;
  onCancel: any;
  navigation: NativeStackNavigationProp<any, "Profile">;
}

const JobApplicationSelector = ({
  name,
  onCancel,
  navigation,
  setAppId,
}: Props) => {
  const [companyOpen, setCompanyOpen] = useState(false);
  const [companyItems, setCompanyItems] = useState<DropDownSchema[]>([]);
  const companyIdByName: { [key: string]: number } = {};

  const [jobAppOpen, setJobAppOpen] = useState(false);
  const [jobAppItems, setJobAppItems] = useState<DropDownSchema[]>([]);
  const [selectedJobApp, setSelectedJobApp] = useState<number | null>(null);

  const [companyId, setCompanyId] = useState(null);

  const dispatch = useDispatch();

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
        companyIdByName[c.name] = c.id;
      });
      setCompanyItems(results);
    };

    fetchCompanies();
    fetchCompanyJobApps();
    // if (selectedJobApp) saveJobApp();
  }, [companyId]);

  const fetchCompanyJobApps = async () => {
    if (companyId) {
      const { data } = await get(`/company/${companyId}`);
      const results: DropDownSchema[] = [];
      data?.applications.forEach((a: Application) => {
        results.push({
          label: a.title,
          value: a.id,
        });
      });
      setJobAppItems(results);
    }
  };

  const saveJobApp = async () => {
    console.log("SAVESAVESAVE");
    console.log(selectedJobApp);
    dispatch(setApplicationId(selectedJobApp));
    onCancel();
  };

  const cancel = () => {
    onCancel();
  };

  return (
    <View style={styles.dialogContainer}>
      <View style={styles.dialogFrame}>
        <Text>Select Company:</Text>

        <DropDownPicker
          style={styles.dropdownone}
          containerStyle={styles.dropdownContainerStyleOne}
          open={companyOpen}
          value={companyId}
          items={companyItems}
          min={0}
          max={companyItems.length}
          setOpen={setCompanyOpen}
          setValue={setCompanyId}
          placeholder="Select Company"
          dropDownContainerStyle={styles.dropdownListContainerStyle}
        />

        <Text>Select Job Application:</Text>

        <DropDownPicker
          style={styles.dropdowntwo}
          containerStyle={styles.dropdownContainerStyleTwo}
          open={jobAppOpen}
          value={selectedJobApp}
          items={jobAppItems}
          min={0}
          max={jobAppItems.length}
          setOpen={setJobAppOpen}
          setValue={setSelectedJobApp}
          placeholder="Select Job Location"
          dropDownContainerStyle={styles.dropdownListContainerStyle}
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
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  dialogFrame: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
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
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "black",
    borderRadius: 10,
    marginTop: 10,
  },
  buttonSeparator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 10,
  },
  dropdownListContainerStyle: {
    borderColor: "#bbb",
  },
});

export default JobApplicationSelector;
