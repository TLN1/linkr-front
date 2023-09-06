import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { get, post, put } from "../axios";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { showErrorToast } from "../components/toast";
import { ScrollView } from "react-native";

interface Props {
  navigation: NativeStackNavigationProp<any, "CreateCompany">;
  route: any;
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

const CreateCompany = ({ route, navigation }: Props) => {
  const [id, setId] = useState(route?.params?.id);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(false);
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      var filename = result.assets[0].fileName?.toLocaleLowerCase();
      if (filename) {
        var extension = filename?.substring(filename.lastIndexOf(".") + 1);
        if (
          extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png"
        ) {
          let type =
            extension === "jpg" || extension === "jpeg"
              ? "image/jpeg"
              : "image/png";
          setImage(`data:${type};base64,${result.assets[0].base64}`);
        }
      } else {
        setImage(result.assets[0].uri);
      }
    }
  };

  const pickCoverImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      // aspect: [1, 1],
      quality: 1,
    });

    // console.log(result);
    if (!result.canceled) {
      // console.log(result.assets[0]);
      var filename = result.assets[0].fileName?.toLocaleLowerCase();
      if (filename) {
        var extension = filename?.substring(filename.lastIndexOf(".") + 1);
        if (
          extension === "jpg" ||
          extension === "jpeg" ||
          extension === "png"
        ) {
          let type =
            extension === "jpg" || extension === "jpeg"
              ? "image/jpeg"
              : "image/png";
          setCoverImage(`data:${type};base64,${result.assets[0].base64}`);
        }
      } else {
        setCoverImage(result.assets[0].uri);
      }
    }
  };

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");

  const [industry, setIndustry] = useState("");
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

    async function fetchCompanyData(id: number) {
      // Fetch data
      const { data } = await get(`/company/${id}`);

      // Update the options state
      setName(data?.name);
      setWebsite(data?.website);
      setIndustry(data?.industry);
      setOrganizationSize(data?.organization_size);
      setImage(data?.image_uri);
      setCoverImage(data?.cover_image_uri);
    }

    // Trigger the fetch
    fetchIndustryData();
    fetchOrganizationSizeData();
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();

    if (id) fetchCompanyData(id);
  }, [id]);

  return (
    <View
      style={{
        backgroundColor: "white",
        height: Dimensions.get("window").height,
      }}
    >
      <ScrollView>
        <View>
          <View
            style={{
              width: "100%",
              backgroundColor: "#000",
              height: 150,
            }}
          >
            <Pressable onPress={pickCoverImage}>
              <Image
                source={
                  coverImage
                    ? coverImage.length > 0
                      ? { uri: coverImage }
                      : require("../assets/empty_cover.jpeg")
                    : require("../assets/empty_cover.jpeg")
                }
                style={{ width: Dimensions.get("window").width, height: 150 }}
              ></Image>
            </Pressable>
          </View>
          <Pressable onPress={pickImage}>
            <View
              style={{
                alignItems: "flex-start",
                padding: 10,
                marginLeft: "5%",
              }}
            >
              <Image
                source={
                  image
                    ? image.length > 0
                      ? { uri: image }
                      : require("../assets/empty.jpeg")
                    : require("../assets/empty.jpeg")
                }
                style={{
                  width: 140,
                  height: 140,
                  borderRadius: 100,
                  marginTop: -70,
                }}
              ></Image>
            </View>
          </Pressable>
        </View>
        <View
          style={{
            padding: 20,
            marginHorizontal: 10,
          }}
        >
          <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 15, padding: 8 }}>Company name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={(text) => setName(text)}
              placeholder="Enter name"
            />
          </View>

          <View style={{ padding: 8 }}>
            <Text style={{ fontSize: 15, padding: 8 }}>Website:</Text>
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={(text) => setWebsite(text)}
              placeholder="Enter website"
            />
          </View>

          <Text style={{ fontSize: 15, padding: 8 }}>Industry:</Text>
          <DropDownPicker
            style={styles.dropdownone}
            containerStyle={styles.dropdownContainerStyleOne}
            open={industryOpen}
            value={industry}
            items={industryItems}
            setOpen={setIndustryOpen}
            setValue={setIndustry}
            listMode="SCROLLVIEW"
            placeholder="Select industry"
            dropDownContainerStyle={styles.dropdownListContainerStyle}
            //   setItems={setIndustryItems}
          />

          <Text style={{ fontSize: 15, padding: 8 }}>Organization size:</Text>

          <DropDownPicker
            style={styles.dropdowntwo}
            containerStyle={styles.dropdownContainerStyleTwo}
            listChildContainerStyle={styles.dropdowntwo}
            open={organizationSizeOpen}
            value={organizationSize}
            items={organizationSizeItems}
            setOpen={setOrganizationSizeOpen}
            setValue={setOrganizationSize}
            listMode="SCROLLVIEW"
            placeholder="Select Organization Size"
            dropDownContainerStyle={styles.dropdownListContainerStyle}
            //   setItems={setIndustryItems}
          />

          <View style={{ padding: 10 }}>
            <Button
              title="Setup company"
              color={"black"}
              onPress={async () => {
                if (id) {
                  if (name && name.length > 0) {
                    await put(`/company/${id}`, {
                      name: name,
                      website: website,
                      industry: industry,
                      organization_size: organizationSize,
                      image_uri: image,
                      cover_image_uri: coverImage,
                    })
                      .then((res) => {
                        console.log(res);
                        navigation.navigate("Company", { id: res.data?.id });
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  } else {
                    showErrorToast("Company name cannot be empty");
                  }
                } else {
                  if (name && name.length > 0) {
                    await post("/company", {
                      name: name,
                      website: website,
                      industry: industry,
                      organization_size: organizationSize,
                      image_uri: image,
                      cover_image_uri: coverImage,
                    })
                      .then((res) => {
                        console.log(res.data?.id);
                        navigation.navigate("Company", { id: res.data?.id });
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  } else {
                    showErrorToast("Company name cannot be empty");
                  }
                }
              }}
            />
          </View>
        </View>
      </ScrollView>
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
    zIndex: 2,
    paddingHorizontal: 8,
    borderColor: "#bbb",
    borderRadius: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  dropdownContainerStyleTwo: {
    zIndex: 1,
    paddingHorizontal: 8,
    borderColor: "#bbb",
    borderRadius: 5,
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtom: {
    borderRadius: 5,
  },
  dropdownListContainerStyle: {
    borderColor: "#bbb",
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
});

export default CreateCompany;
