import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Dimensions
} from "react-native";
import { get, put } from "../axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

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
  navigation: NativeStackNavigationProp<any, "Profile">;
  // username: string
}
const UserProfile = ({ navigation }: Props) => {
  const [addingItem, setAddingItem] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);

  const [username, setUsername] = useState("tamo");

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await get(`/user/${username}`);
        const userData = response.data;

        console.log(userData);
        console.log(response.data?.username);

        setEducations(userData.education || []);
        setExperiences(response.data?.exprenience || []);
        setSkills(response.data?.skills || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const updateUser = async () => {

    const response = await get(`/user/${username}`);
    const userData = response.data;

    console.log(userData);
    console.log(response.data?.username);

    setEducations(userData.education || []);
    setExperiences(response.data?.exprenience || []);
    setSkills(response.data?.skills || []);
    setUsername(response.data?.username || "");
  };


const handleSaveExperience = async () => {
  setAddingItem("");

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

  setNewExperience({ name: "", description: "" }); // Clear the input fields

};

const handleSaveEducation = async () => {
  setAddingItem("");

  console.log(educations);

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
  setNewEducation({ name: "", description: "" }); // Clear the input fields

};

const handleSaveSkill = async () => {
  setAddingItem("");

  updateUser();

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
  setNewSkill({ name: "", description: "" });

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
            placeholder="Degree"
            value={newEducation.name}
            onChangeText={(name) =>
              setNewEducation((prevEducation) => ({
                ...prevEducation,
                name,
              }))
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Institution"
            value={newEducation.description}
            onChangeText={(description) =>
              setNewEducation((prevEducation) => ({
                ...prevEducation,
                description,
              }))
            }
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
              setAddingItem("")
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
            value={newSkill.name}
            onChangeText={(name) =>
              setNewSkill((prevSkill) => ({
                ...prevSkill,
                name,
              }))
            }
            style={styles.input}
          />

          <TextInput
            placeholder="Skill Description"
            value={newSkill.description}
            onChangeText={(description) =>
              setNewSkill((prevSkill) => ({
                ...prevSkill,
                description,
              }))
            }
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
            }
            }
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
            value={newExperience.name}
            onChangeText={(name) =>
              setNewExperience((prevExperience) => ({
                ...prevExperience,
                name,
              }))
            }
            style={styles.input}
          />
          <TextInput
            placeholder="Experience Company"
            value={newExperience.description}
            onChangeText={(description) =>
              setNewExperience((prevExperience) => ({
                ...prevExperience,
                description,
              }))
            }
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
    <View
      style={{ backgroundColor: "white" }}>
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
      <View style={{ alignItems: "flex-start", padding: 10, marginLeft: "5%" }}>
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
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{"username"}</Text>
      </View>

      <View style={{ padding: 32 }}>
        <FlatList
          data={sections}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              {item.title && renderSectionHeader({ section: item })}
              <FlatList
                data={item.data}
                keyExtractor={(innerItem, innerIndex) =>
                  innerIndex.toString()
                }
                renderItem={({ sectionItem }) => item.renderItem({ item: sectionItem })}
              />
            </View>
          )}
        />
      </View>
      {addingItem &&
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
      }
    </View>
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
    borderWidth: 3,
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
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "black",
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
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get("window").height,
  },
  dialogFrame: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    width: 250
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
