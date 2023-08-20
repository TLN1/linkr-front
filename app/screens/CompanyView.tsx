import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
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

interface Company {
  name: string;
  website: string;
  industry: string;
  organizationSize: string;
}

interface Props {
  navigation: NativeStackNavigationProp<any, "Profile">;
}

const AboutTab = (company: Company) => {
  return (
    <View>
      <View style={styles.aboutField}>
        <Text style={[styles.aboutLine, styles.aboutTitle]}>Website</Text>
        <Text style={[styles.aboutLine, styles.aboutValue]}>
          {company.website}
        </Text>
      </View>
      <View style={styles.aboutField}>
        <Text style={[styles.aboutLine, styles.aboutTitle]}>Industry</Text>
        <Text style={[styles.aboutLine, styles.aboutValue]}>
          {company.industry}
        </Text>
      </View>
      <View style={styles.aboutField}>
        <Text style={[styles.aboutLine, styles.aboutTitle]}>Company size</Text>
        <Text style={[styles.aboutLine, styles.aboutValue]}>
          {company.organizationSize}
        </Text>
      </View>
    </View>
  );
};

const JobAppliationsTab = (company: Company) => {
  return (
    <View>
      <Text>Job applications</Text>
    </View>
  );
};

const CompanyView = ({ navigation }: Props) => {
  const company: Company = {
    name: "Company name",
    website: "website.web",
    industry: "Software Engineering",
    organizationSize: "small",
  };

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
              source={require("../assets/favicon.png")}
              style={{ width: 30, height: 30 }}
            ></Image>
            <View></View>
            <View></View>
          </Pressable>
        </View>
        <View
          style={{ alignItems: "flex-start", padding: 10, marginLeft: "5%" }}
        >
          <Image
            source={require("../assets/icon.png")}
            style={{
              width: 140,
              height: 140,
              borderRadius: 100,
              marginTop: -70,
            }}
          ></Image>
        </View>
        <View style={{ padding: 10, marginLeft: "4%" }}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {company.name}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "grey" }}>
            {company.industry}
          </Text>
        </View>
        <View style={styles.container}>
          <TabView
            navigationState={{ index: tabViewIndex, routes: routes }}
            renderScene={SceneMap({
              about: () => AboutTab(company),
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
