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
  Modal,
  Button,
} from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { get, post, put } from "../axios";
import JobApplication from "../components/JobApplication";

interface Props {
  id: number;
  navigation: NativeStackNavigationProp<any, "Coompany">;
}

const AboutTab = (
  website: string,
  industry: string,
  organizationSize: string
) => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

const displayJobApplicationModal = (
  isVisible: boolean,
  setIsVisible: any,
  companyId: number,
  applicationId: number | null,
  action: (
    id: number,
    title: string,
    experienceLevel: string,
    type: string,
    location: string,
    skills: string[],
    description: string
  ) => void
) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <View>
        <View style={styles.modalContent}>
          {JobApplication(companyId, applicationId, action)}
        </View>
      </View>
    </Modal>
  );
};

const saveJobApp = async (
  companyId: number,
  title: string,
  experienceLevel: string,
  type: string,
  location: string,
  skills: string[],
  description: string
) => {
  await post("/application", {
    title: title,
    experience_level: experienceLevel,
    job_type: type,
    location: location,
    skills: skills,
    description: description,
    company_id: companyId,
  }).then((res) => {
    console.log(res);
    // navigate
  });
};

const updateJobApp = async (
  applicationId: number,
  title: string,
  experienceLevel: string,
  type: string,
  location: string,
  skills: string[],
  description: string
) => {
  await put(`/application/${applicationId}/update`, {
    id: applicationId,
    title: title,
    experience_level: experienceLevel,
    job_type: type,
    location: location,
    skills: skills,
    description: description,
  }).then((res) => {
    console.log(res);
    // navigate
  });
};

const JobAppliationsTab = (
  isAddVisible: boolean,
  setIsAddVisible: any,
  isUpdateVisible: boolean,
  setIsUpdateVisible: any
) => {
  return (
    <ScrollView>
      <Text>Job applications</Text>
      <Button title="update" onPress={() => setIsUpdateVisible(true)} />
      <Button title="create" onPress={() => setIsAddVisible(true)} />
    </ScrollView>
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
      setImage(data?.image_uri);
      setCoverImage(data?.cover_image_uri);
    }

    if (id) fetchCompanyData(id);
  }, []);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [industry, setIndustry] = useState("");
  const [organizationSize, setOrganizationSize] = useState("");
  const [image, setImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false);

  const [tabViewIndex, setTabViewIndex] = useState(0);
  const routes = [
    { key: "about", title: "About" },
    { key: "jobApplications", title: "Job Applications" },
  ];

  const [updateApplicationId, setApplicationId] = useState<number | null>(null);

  return (
    <View style={{ backgroundColor: "white" }}>
      {displayJobApplicationModal(
        addModalVisible,
        setAddModalVisible,
        id,
        updateApplicationId,
        saveJobApp
      )}
      {displayJobApplicationModal(
        updateModalVisible,
        setUpdateModalVisible,
        id,
        1,
        updateJobApp
      )}
      <View
        style={{
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
      <View style={{ alignItems: "flex-start", padding: 10, marginLeft: "5%" }}>
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
      <View style={styles.tabViewContainer}>
        <TabView
          navigationState={{ index: tabViewIndex, routes: routes }}
          renderScene={SceneMap({
            about: () => AboutTab(website, industry, organizationSize),
            jobApplications: () =>
              JobAppliationsTab(
                addModalVisible,
                setAddModalVisible,
                updateModalVisible,
                setUpdateModalVisible
              ),
          })}
          onIndexChange={(index) => setTabViewIndex(index)}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              renderLabel={({ route, color }) => (
                <Text style={{ color: "black", margin: 8 }}>{route.title}</Text>
              )}
              style={{ backgroundColor: "white" }}
              indicatorStyle={{ backgroundColor: "black" }}
            />
          )}
        ></TabView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: "white",
  },
  tabViewContainer: {
    height: Dimensions.get("window").height,
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
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: Dimensions.get("window").height,
  },
});

export default CompanyView;
