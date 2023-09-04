import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  SectionList,
  Button,
} from "react-native";
import { get, put } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-virtualized-view";
import { AuthContext } from "../context/Auth";

interface Education {
  name: string;
  description: string;
}

interface Skill {
  name: string;
  description: string;
}

interface Experience {
  name: string;
  description: string;
}

interface Props {
  route: any;
  navigation: NativeStackNavigationProp<any, "Profile">;
}
const UserProfile = ({ route, navigation }: Props) => {
  const [addingItem, setAddingItem] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const [username, setUsername] = useState(route?.params?.username);

  const [expreniences, setExperiences] = useState<Experience[]>([]);

  const [newExperience, setNewExperience] = useState<Experience>({
    name: "",
    description: "",
  });

  const [educations, setEducations] = useState<Education[]>([]);

  const [newEducation, setNewEducation] = useState<Education>({
    name: "",
    description: "",
  });

  const [skills, setSkills] = useState<Skill[]>([]);

  const [newSkill, setNewSkill] = useState<Skill>({
    name: "",
    description: "",
  });

  const [currName, setCurrName] = useState<string>("");
  const [currDescription, setCurrDescription] = useState<string>("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async (userName) => {
      try {
        console.log(userName);
        const response = await get(`/user/${userName}`);
        const userData = response.data;

        console.log(userData);
        console.log(response.data?.username);

        setEducations(userData.education || []);
        setExperiences(response.data?.exprenience || []);
        setSkills(response.data?.skills || []);

        const loggedInUser = await AsyncStorage.getItem("username");
        setMyUser(loggedInUser === userName);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) fetchUserData(username);
  }, [username]);

  const [myUser, setMyUser] = useState(false);

  const updateUser = async () => {
    console.log("ERGEFVKDNSJVBSDJCSLDNCLJDSBCBSDLCS");
    const response = await get(`/user/${username}`);
    const userData = response.data;

    console.log("RECEIVE USER DATA ");
    console.log(userData);

    console.log(response.data?.username);

    setEducations(userData.education || []);
    setExperiences(userData.experience || []);
    setSkills(userData.skills || []);
    setUsername(userData.username || "");
    console.log("EXPPPP : " + expreniences);
  };

  const handleSaveExperience = async () => {
    setAddingItem("");
    newExperience.name = currName;
    newExperience.description = currDescription;
    setNewExperience(newExperience);

    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const accessToken = JSON.parse(token).access_token;

      await put(
        "/user/update",
        {
          username: username,
          education: educations,
          skills: skills,
          experience: [...expreniences, newExperience],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    updateUser();

    setNewExperience({ name: "", description: "" });
    setCurrName("");
    setCurrDescription("");
    setDialogVisible(false);
  };

  const handleSaveEducation = async () => {
    setAddingItem("");
    newEducation.name = currName;
    newEducation.description = currDescription;
    setNewEducation(newEducation);
    console.log(newEducation);

    console.log(currName);

    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const accessToken = JSON.parse(token).access_token;

      await put(
        "/user/update",
        {
          username: username,
          education: [...educations, newEducation],
          skills: skills,
          experience: expreniences,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }
    updateUser();

    setNewEducation({ name: "", description: "" });
    setCurrName("");
    setCurrDescription("");
    setDialogVisible(false);
  };

  const handleSaveSkill = async () => {
    setAddingItem("");
    newSkill.name = currName;
    newSkill.description = currDescription;
    setNewSkill(newSkill);

    const token = await AsyncStorage.getItem("authToken");
    if (token) {
      const accessToken = JSON.parse(token).access_token;

      await put(
        "/user/update",
        {
          username: username,
          education: educations,
          skills: [...skills, newSkill],
          experience: expreniences,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    updateUser();

    setNewSkill({ name: "", description: "" });
    setCurrName("");
    setCurrDescription("");
    setDialogVisible(false);
  };

  const renderEducationItem = ({ item }: { item: Education }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Institution</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item?.name}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Degree</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>
        {item?.description}
      </Text>
    </View>
  );

  const renderSkillsItem = ({ item }: { item: Skill }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Name</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item?.name}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>description</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>
        {item?.description}
      </Text>
    </View>
  );

  const renderExperienceItem = ({ item }: { item: Experience }) => (
    <View style={styles.aboutField}>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Title</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>{item?.name}</Text>
      <Text style={[styles.aboutLine, styles.aboutTitle]}>Company</Text>
      <Text style={[styles.aboutLine, styles.aboutValue]}>
        {item?.description}
      </Text>
    </View>
  );

  const sections: {
    title: string;
    data: (Education | Skill | Experience)[];
    renderItem: ({
      item,
    }: {
      item: Education | Skill | Experience;
    }) => JSX.Element;
  }[] = [
    {
      title: "Education",
      data: educations,
      renderItem: renderEducationItem as ({
        item,
      }: {
        item: Education | Skill | Experience;
      }) => JSX.Element,
    },
    {
      title: "Skill",
      data: skills,
      renderItem: renderSkillsItem as ({
        item,
      }: {
        item: Education | Skill | Experience;
      }) => JSX.Element,
    },
    {
      title: "Experience",
      data: expreniences,
      renderItem: renderExperienceItem as ({
        item,
      }: {
        item: Education | Skill | Experience;
      }) => JSX.Element,
    },
  ];

  const renderSectionHeader = ({
    section: { title },
  }: {
    section: { title: string };
  }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Pressable
        style={styles.addButton}
        onPress={() => {
          if (title === "Experience") {
            setAddingItem("Experience");
          } else if (title === "Education") {
            setAddingItem("Education");
          } else if (title === "Skill") {
            setAddingItem("Skill");
          }
          setDialogVisible(true);
        }}
      >
        <Text style={styles.addButtonLabel}>Add</Text>
      </Pressable>
    </View>
  );

  const AddItemDialog = () => {
    if (addingItem === "Education") {
      return (
        <View style={styles.dialogContainer}>
          <View style={styles.dialogFrame}>
            <TextInput
              placeholder="Name"
              value={currName}
              onChangeText={(name) => {
                setCurrName(name);
                console.log(currName);
              }}
              style={styles.input}
            />
            <TextInput
              placeholder="Description"
              value={currDescription}
              onChangeText={(description) => setCurrDescription(description)}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveEducation}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setAddingItem("");
                setDialogVisible(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (addingItem === "Skill") {
      return (
        <View style={styles.dialogContainer}>
          <View style={styles.dialogFrame}>
            <TextInput
              placeholder="Skill Name"
              value={currName}
              onChangeText={(name) => setCurrName(name)}
              style={styles.input}
            />

            <TextInput
              placeholder="Skill Description"
              value={currDescription}
              onChangeText={(description) => setCurrDescription(description)}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveSkill}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setAddingItem("");
                setDialogVisible(false);
                setCurrName("");
                setCurrDescription("");
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (addingItem === "Experience") {
      return (
        <View style={styles.dialogContainer}>
          <View style={styles.dialogFrame}>
            <TextInput
              placeholder="Experience Name"
              value={currName}
              onChangeText={(name) => setCurrName(name)}
              style={styles.input}
            />
            <TextInput
              placeholder="Experience Description"
              value={currDescription}
              onChangeText={(description) => setCurrDescription(description)}
              style={styles.input}
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveExperience}
            >
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => {
                setAddingItem("");
                setDialogVisible(false);
              }}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: "white" }}>
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
              source={require("../assets/icon.png")}
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
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>{username}</Text>
        </View>
        <View style={{ flexDirection: "row", marginLeft: "4%" }}></View>

        {/* SectionList for Education, Skills, and Experience */}
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => index.toString()}
          renderSectionHeader={({ section }) => (
            <>{renderSectionHeader({ section })}</>
          )}
          renderItem={({ item, section }) => (
            <>
              {section.data.map((sectionItem) => (
                <>{section.renderItem({ item: sectionItem })}</>
              ))}
            </>
          )}
        />
        <Button
          title="Logout"
          color="red"
          onPress={() => {
            authContext.logout();
          }}
        />
      </ScrollView>

      <Modal
        visible={dialogVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDialogVisible(false)}
      >
        <View style={styles.modalContainer}>
          <AddItemDialog />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  aboutField: {
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
    borderRadius: 20,
    marginBottom: 20,
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
  container: {
    marginTop: 15,
    borderRadius: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  addButton: {
    height: 20,
    width: 40,
    position: "absolute",
    alignItems: "center",
    top: 10,
    right: 10,
    backgroundColor: "#5a5a5a",
    borderRadius: 5,
  },
  addButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
  },
  dialogContainer: {
    backgroundColor: "transparent",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height,
  },
  dialogFrame: {
    backgroundColor: "white",
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 250,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    maxHeight: Dimensions.get("window").height,
  },
});

export default UserProfile;
