import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { get, post } from "../axios";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: NativeStackNavigationProp<any, "CreateCompany">;
  company?: Company;
}

interface DropDownSchema {
  label: string;
  value: string;
}

interface Company {
  name: string;
  website: string;
  industry: string;
  organizationSize: string;
}

const CreateCompany = ({ navigation, company }: Props) => {
  const [name, setName] = useState(company?.name);
  const [website, setWebsite] = useState(company?.website);

  const [industry, setInsdustry] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [industryItems, setIndustryItems] = useState([]);

  const [organizationSize, setOrganizationSize] = useState("");
  const [organizationSizeOpen, setOrganizationSizeOpen] = useState(false);
  const [organizationSizeItems, setOrganizationSizeItems] = useState([]);

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

    async function fetchOrganizationSizeData() {
      // Fetch data
      const { data } = await get("/organization-size");
      const results: DropDownSchema[] = [];
      // Store results in the results array
      data.forEach((i: string) => {
        results.push({
          label: i,
          value: i,
        });
      });
      // Update the options state
      setOrganizationSizeItems(results);
    }

    // Trigger the fetch
    fetchIndustryData();
    fetchOrganizationSizeData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.heading}>Set up company</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter name"
        />

        <TextInput
          style={styles.input}
          value={website}
          onChangeText={(text) => setWebsite(text)}
          placeholder="Enter website"
        />

        <DropDownPicker
          style={styles.dropdownone}
          containerStyle={styles.dropdownContainerStyleOne}
          open={industryOpen}
          value={industry}
          items={industryItems}
          setOpen={setIndustryOpen}
          setValue={setInsdustry}
          placeholder="Select industry"
          //   setItems={setIndustryItems}
        />

        <DropDownPicker
          style={styles.dropdowntwo}
          containerStyle={styles.dropdownContainerStyleTwo}
          listChildContainerStyle={styles.dropdowntwo}
          open={organizationSizeOpen}
          value={organizationSize}
          items={organizationSizeItems}
          setOpen={setOrganizationSizeOpen}
          setValue={setOrganizationSize}
          placeholder="Select Organization Size"
          //   setItems={setIndustryItems}
        />

        <Button
          title="Setup company"
          color={"#009485"}
          onPress={async () => {
            console.log(name);
            console.log(website);
            console.log(industry);
            var tokenObj = await AsyncStorage.getItem("authToken");
            if (tokenObj != null) {
              var token = JSON.parse(tokenObj).access_token;
              await axios
                .post("http://127.0.0.1:8000/company", null, {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer  ${token}`,
                  },
                  params: {
                    name: name,
                    website: website,
                    industry: industry,
                    organization_size: organizationSize,
                  },
                })
                .then((res) => {
                  console.log(res);
                });
            }
            // register(username, password);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    // marginTop: 12,
    // marginBottom: 12,
    // position: "absolute",
    // position: "relative",
    // zIndex:2,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    width: "100%",
    shadowColor: "#000000",
  },
  dropdowntwo: {
    // marginTop: 12,
    // marginBottom: 12,
    // position: "relative",
    // zIndex:1,
    // borderWidth: 0,
    backgroundColor: "#fff",
    borderColor: "#bbb",
    width: "100%",
    // padding: 10,
    // border:10,
    marginBottom: 15,
    shadowColor: "#000000",
  },
  dropdownContainerStyleOne: {
    zIndex: 2,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#bbb",
    borderRadius: 5,
  },
  dropdownContainerStyleTwo: {
    zIndex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderColor: "#bbb",
    borderRadius: 5,
  },
  submitButtom: {
    borderRadius: 5,
  },
});

export default CreateCompany;
