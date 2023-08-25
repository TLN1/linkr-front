import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  ScrollView,
  Pressable,
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { get } from "../axios";

interface Props {
  id: number;
  navigation: NativeStackNavigationProp<any, "Profile">;
}

const AboutTab = (
  website: string,
  industry: string,
  organizationSize: string
) => {
  return (
    <View>
      <View style={styles.aboutField}>
        <Text style={[styles.aboutLine, styles.aboutTitle]}>Website</Text>
        <Text style={[styles.aboutLine, styles.aboutValue]}>{website}</Text>
      </View>
      <View style={styles.aboutField}>
        <Text style={[styles.aboutLine, styles.aboutTitle]}>Industry</Text>
        <Text style={[styles.aboutLine, styles.aboutValue]}>{industry}</Text>
      </View>
      <View style={styles.aboutField}>
        <Text style={[styles.aboutLine, styles.aboutTitle]}>Company size</Text>
        <Text style={[styles.aboutLine, styles.aboutValue]}>
          {organizationSize}
        </Text>
      </View>
    </View>
  );
};

const JobAppliationsTab = () => {
  return (
    <View>
      <Text>Job applications</Text>
    </View>
  );
};

const CompanyView = ({ id, navigation }: Props) => {
  useEffect(() => {
    async function fetchCompanyData(id: number) {
      // Fetch data
      const { data } = await get(`/company/${id}`);

      // Update the options state
      setName(data?.name);
      setWebsite(data?.website);
      setIndustry(data?.industry);
      setOrganizationSize(data?.organization_size);
      setImage(`data:${data?.image_type};base64,${data?.image}`);
      setCoverImage(
        `data:${data?.cover_image_type};base64,${data?.cover_image}`
      );
    }

    if (id) fetchCompanyData(id);
  }, []);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [organizationSize, setOrganizationSize] = useState("");
  const [image, setImage] = useState("");
  const [coverImage, setCoverImage] = useState("");

  const [tabViewIndex, setTabViewIndex] = useState(0);
  const routes = [
    { key: "about", title: "About" },
    { key: "jobApplications", title: "Job Applications" },
  ];

  return (
    <View style={{ backgroundColor: "white" }}>
      <ScrollView>
        <View
          style={{
            padding: 10,
            width: "100%",
            backgroundColor: "#000",
            height: 150,
          }}
        >
          <Pressable>
            <Image
              source={{
                uri: coverImage,
              }}
              style={{ width: Dimensions.get("window").width, height: 150 }}
            ></Image>
            <View></View>
            <View></View>
          </Pressable>
        </View>
        <View
          style={{ alignItems: "flex-start", padding: 10, marginLeft: "5%" }}
        >
          <Image
            source={{
              uri: image,
            }}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: -70,
            }}
          ></Image>
        </View>
        <View style={{ padding: 10, marginLeft: "4%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>{name}</Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
            {industry}
          </Text>
        </View>
        <View style={styles.container}>
          <TabView
            navigationState={{ index: tabViewIndex, routes: routes }}
            renderScene={SceneMap({
              about: () => AboutTab(website, industry, organizationSize),
              jobApplications: JobAppliationsTab,
            })}
            onIndexChange={(index) => setTabViewIndex(index)}
            initialLayout={{ width: Dimensions.get("window").width }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                renderLabel={({ route, color }) => (
                  <Text style={{ color: "black", margin: 8 }}>
                    {route.title}
                  </Text>
                )}
                style={{ backgroundColor: "white" }}
                indicatorStyle={{ backgroundColor: "black" }}
              />
            )}
          ></TabView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: "white",
  },
  aboutField: {
    padding: 10,
  },
  aboutLine: {
    padding: 5,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutValue: {
    fontSize: 15,
    fontWeight: "bold",
    color: "grey",
  },
});

export default CompanyView;
