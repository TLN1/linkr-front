import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import axios from "../axios";

interface Props {
  navigation: NativeStackNavigationProp<any, "CreateCompany">;
}

interface DropDownSchema {
  label: string;
  value: string;
}

const CreateCompany = ({ navigation }: Props) => {
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  const [industry, setInsdustry] = useState("");
  const [industryOpen, setIndustryOpen] = useState(false);
  const [industryItems, setIndustryItems] = useState([]);

  const [organizationSize, setOrganizationSize] = useState("");
  const [organizationSizeOpen, setOrganizationSizeOpen] = useState(false);
  const [organizationSizeItems, setOrganizationSizeItems] = useState([]);

  useEffect(() => {
    async function fetchIndustryData() {
      // Fetch data
      const { data } = await axios.get("/industry");
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
      const { data } = await axios.get("/organization-size");
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
        <Text>Create company</Text>
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
        //   style={styles.dropdown} // FIXME: margins
          open={industryOpen}
          value={industry}
          items={industryItems}
          setOpen={setIndustryOpen}
          setValue={setInsdustry}
          //   setItems={setIndustryItems}
        />

        <DropDownPicker
        //   style={styles.dropdown}
          open={organizationSizeOpen}
          value={organizationSize}
          items={organizationSizeItems}
          setOpen={setOrganizationSizeOpen}
          setValue={setOrganizationSize}
          //   setItems={setIndustryItems}
        />

        <Button
          title="Setup company"
          onPress={() => {
            console.log(name);
            console.log(website);
            console.log(industry);
            // register(username, password);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  wrapper: {
    width: "80%",
  },
  input: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 5,
    paddingHorizontal: 14,
  },
  dropdown: {
    margin: "10px",
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
  },
});

export default CreateCompany;
